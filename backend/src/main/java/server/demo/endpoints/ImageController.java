package server.demo.endpoints;

import java.time.LocalTime;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import server.demo.models.User;
import server.demo.repositories.UserRepository;
import server.demo.services.ImageDataService;
import server.demo.services.JwtTokenService;
import server.demo.utils.StringsUtils;

@RestController
@RequestMapping("/api/v1")
public class ImageController {

    @Autowired
    private JwtTokenService jwtTokenService;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private ImageDataService imageDataService;

    private static Path UPLOADED_FOLDER = Paths
            .get(System.getProperty("user.dir"), "uploaded-images");

    @PostMapping("/image")
    public ResponseEntity<?> uploadFile(
            @RequestParam("file") MultipartFile uploadfile,
            @RequestHeader("Authorization") String token) {
        if (!jwtTokenService.validateJwtToken(token)) {
            return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);
        }

        String username = jwtTokenService.getSubjectFromJwtToken(token);
        User user = userRepository.findByUsername(username);

        if (user == null) {
            return new ResponseEntity<>(HttpStatus.I_AM_A_TEAPOT);
        }

        if (uploadfile.isEmpty()) {
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }

        String fileName;
        try {
            fileName = saveUploadedFiles(uploadfile, user);
        } catch (IOException e) {
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }

        imageDataService.createImageData(user, fileName);

        System.out.println("New added file: " + fileName);

        return new ResponseEntity<>("Successfully uploaded - " +
                uploadfile.getOriginalFilename(), new HttpHeaders(),
                HttpStatus.OK);

    }

    private String saveUploadedFiles(MultipartFile file, User user)
            throws IOException {

        byte[] bytes = file.getBytes();
        String fileName = ("IMG_"
                + StringsUtils.normalizeText(
                        user.getUsername() + LocalTime.now().toString())
                + StringsUtils.getFileExtension(file.getOriginalFilename()));
        Path filePath = UPLOADED_FOLDER.resolve(fileName);
        Files.write(filePath, bytes);
        return fileName;
    }
}