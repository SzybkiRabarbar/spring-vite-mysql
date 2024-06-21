package server.demo.endpoints;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import server.demo.models.User;
import server.demo.services.JwtTokenService;
import server.demo.services.UserService;

@RestController
@RequestMapping("/api/v1")
public class UserController {

    @Autowired
    private UserService userService;

    @Autowired
    private JwtTokenService jwtTokenProvider;

    // Endpoint to add new user
    @PostMapping("/users")
    public ResponseEntity<?> addUser(@RequestBody UserCredentials userCreds) {
        System.out.println("-addUser-");
        if (userService.existsByUsername(userCreds.getUsername())) {
            System.out.println("User exists!");
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
        userService.createUser(userCreds.username, userCreds.password);
        return new ResponseEntity<>(HttpStatus.CREATED);
    }

    // Endpoint to authenticate user and return JWT
    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody UserCredentials userCreds) {
        System.out.println("-login-");
        User user = userService.authenticate(userCreds.getUsername(),
                userCreds.getPassword());

        if (user == null) {
            return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);
        }

        String jwt = jwtTokenProvider.generateJwtToken(user);
        return ResponseEntity.ok(jwt);
    }

    static class UserCredentials {
        private String username;
        private String password;

        public String getUsername() {
            return username;
        }
        public void setUsername(String username) {
            this.username = username;
        }
        public String getPassword() {
            return password;
        }
        public void setPassword(String password) {
            this.password = password;
        }
    }
}
