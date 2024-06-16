package server.demo.services;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jws;
import io.jsonwebtoken.JwtParser;
import io.jsonwebtoken.Jwts;
import server.demo.models.User;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import io.jsonwebtoken.security.Keys;

import java.nio.charset.StandardCharsets;
import java.security.Key;

import java.util.Date;

import javax.crypto.SecretKey;

@Service
public class JwtTokenProvider {

    @Value("${app.jwtSecret}")
    private String jwtSecret;

    @Value("${app.jwtExpirationMs}")
    private int jwtExpirationMs;

    public Key getKey() {
        byte[] keyBytes = jwtSecret.getBytes(StandardCharsets.UTF_8);
        return Keys.hmacShaKeyFor(keyBytes);
    }

    public String generateJwtToken(User user) {

        return Jwts.builder()
                .subject(user.getUsername())
                .issuedAt(new Date())
                .expiration(new Date((new Date()).getTime() + jwtExpirationMs))
                .signWith(this.getKey())
                .compact();
    }

    public boolean validateJwtToken(String token) {

        JwtParser jwtParser = Jwts.parser()
                .verifyWith((SecretKey) this.getKey()).build();

        if (token.startsWith("Bearer ")) {
            token = token.substring(7);
        }

        try {
            jwtParser.parse(token);
            return true;
        } catch (Exception e) {
            System.out.println(
                    "An error occurred while validating the JWT token: "
                            + e.getMessage());
        }

        return false;
    }

    public String getSubjectFromJwtToken(String token) {
        JwtParser jwtParser = Jwts.parser()
                .verifyWith((SecretKey) this.getKey()).build();

        if (token.startsWith("Bearer ")) {
            token = token.substring(7);
        }

        try {
            Jws<Claims> claimsJws = jwtParser.parseSignedClaims(token);
            return claimsJws.getPayload().getSubject();
        } catch (Exception e) {
            System.out.println(
                    "An error occurred while validating the JWT token: "
                            + e.getMessage());
        }

        return null;
    }

}
