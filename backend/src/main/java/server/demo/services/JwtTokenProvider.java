package server.demo.services;

import io.jsonwebtoken.Jwts;
import server.demo.models.User;
import server.demo.utils.GetKey;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import java.util.Date;

@Service
public class JwtTokenProvider {

    @Value("${app.jwtSecret}")
    private String jwtSecret;

    @Value("${app.jwtExpirationMs}")
    private int jwtExpirationMs;

    public String generateJwtToken(User user) {

        return Jwts.builder()
                .subject(user.getUsername())
                // .header()
                // .keyId(jwtSecret)
                .issuedAt(new Date())
                .expiration(new Date((new Date()).getTime() + jwtExpirationMs))
                .signWith(GetKey.getKey())
                .compact();
    }

    // other methods...
}
