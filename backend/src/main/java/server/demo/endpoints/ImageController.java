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
import server.demo.services.JwtTokenProvider;
import server.demo.utils.StringsUtils;

@RestController
@RequestMapping("/api/v1")
public class ImageController {

    @Autowired
    private JwtTokenProvider jwtTokenProvider;

    @Autowired
    private UserRepository userRepository;

    private static Path UPLOADED_FOLDER = Paths
            .get(System.getProperty("user.dir"), "uploaded-images");

    @PostMapping("/image")
    public ResponseEntity<?> uploadFile(
            @RequestParam("file") MultipartFile uploadfile,
            @RequestHeader("Authorization") String token) {
        if (!jwtTokenProvider.validateJwtToken(token)) {
            return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);
        }

        String username = jwtTokenProvider.getSubjectFromJwtToken(token);
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

        System.out.println("New added file: " + fileName);

        return new ResponseEntity<>("Successfully uploaded - " +
                uploadfile.getOriginalFilename(), new HttpHeaders(),
                HttpStatus.OK);

    }

    private String saveUploadedFiles(MultipartFile file, User user)
            throws IOException {

        byte[] bytes = file.getBytes();
        String fileName = StringsUtils.normalizeText("I"
                + LocalTime.now().toString()
                + user.getUsername()
                + file.getOriginalFilename())
                + StringsUtils.getFileExtension(file.getOriginalFilename());
        Path filePath = UPLOADED_FOLDER.resolve(fileName);
        Files.write(filePath, bytes);
        return fileName;
    }
}