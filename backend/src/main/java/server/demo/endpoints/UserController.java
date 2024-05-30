package server.demo.endpoints;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import server.demo.models.User;
import server.demo.services.JwtTokenProvider;
import server.demo.services.UserService;

@RestController
@RequestMapping("/api/v1")
public class UserController {

    @Autowired
    private UserService userService;

    @Autowired
    private JwtTokenProvider jwtTokenProvider;

    // Endpoint to add new user
    @PostMapping("/users")
    public ResponseEntity<?> addUser(@RequestBody User user) {
        if (userService.existsByUsername(user.getUsername())) {
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
        // Password encryption is handled by the UserService
        userService.save(user);
        return new ResponseEntity<>(HttpStatus.CREATED);
    }

    // Endpoint to authenticate user and return JWT
    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody User user) {
        user = userService.authenticate(user.getUsername(),
                user.getPassword());

        if (user == null) {
            return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);
        }

        String jwt = jwtTokenProvider.generateJwtToken(user);
        return ResponseEntity.ok(jwt);
    }
}
