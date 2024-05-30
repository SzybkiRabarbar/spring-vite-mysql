package server.demo.utils;

import io.jsonwebtoken.security.Keys;

import java.nio.charset.StandardCharsets;
import java.security.Key;

public class GetKey {

    static String secret = "secret";

    static byte[] keyBytes = secret.getBytes(StandardCharsets.UTF_8);
    static Key key = Keys.hmacShaKeyFor(keyBytes);

    public static Key getKey() {
        return key;
    }

}
