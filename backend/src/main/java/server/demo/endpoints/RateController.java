package server.demo.endpoints;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import server.demo.models.Product;
import server.demo.models.ProductRating;
import server.demo.models.User;
import server.demo.repositories.ProductRatingRepository;
import server.demo.repositories.ProductRepository;
import server.demo.repositories.UserRepository;
import server.demo.services.JwtTokenService;
import server.demo.services.RateService;

@CrossOrigin
@RestController
@RequestMapping("/api/v1")
public class RateController {

    @Autowired
    private JwtTokenService jwtTokenService;

    @Autowired
    private UserRepository userRepo;

    @Autowired
    private RateService rateServices;

    @Autowired
    private ProductRepository productRepo;

    @Autowired
    private ProductRatingRepository productRatingRepo;

    @PostMapping("/rate")
    ResponseEntity<?> addRate(
            @RequestBody RateService.RateDTO rateDTO,
            @RequestHeader("Authorization") String token) {

        String productId = rateDTO.getProductId();
        double rate = rateDTO.getRate();

        if (!jwtTokenService.validateJwtToken(token)) {
            return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);
        }

        String username = jwtTokenService.getSubjectFromJwtToken(token);
        User user = userRepo.findByUsername(username);

        if (user == null) {
            return new ResponseEntity<>(HttpStatus.I_AM_A_TEAPOT);
        }

        Product product = productRepo.findByProductId(productId)
                .orElse(null);
        if (product == null) {
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }

        rateServices.addNewRate(user, product, rate);

        return new ResponseEntity<>(HttpStatus.OK);
    }

    @GetMapping("/rate")
    ResponseEntity<?> readRate(
            @RequestParam(value = "productId", required = true) String productId,
            @RequestHeader("Authorization") String token) {

        if (!jwtTokenService.validateJwtToken(token)) {
            return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);
        }

        String username = jwtTokenService.getSubjectFromJwtToken(token);
        User user = userRepo.findByUsername(username);

        if (user == null) {
            return new ResponseEntity<>(HttpStatus.I_AM_A_TEAPOT);
        }

        Product product = productRepo
                .findByProductId(productId)
                .orElse(null);
        if (product == null) {
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }

        ProductRating pRating = productRatingRepo.findByUserIdAndProductId(
                user.getId(),
                product.getId());
        if (pRating == null) {
            return new ResponseEntity<>((Double) 0., HttpStatus.OK);
        }
        System.out.println(pRating.getUserRating());
        return new ResponseEntity<>(pRating.getUserRating(), HttpStatus.OK);
    }

}
