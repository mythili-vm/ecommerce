package com.magizh.tech.ecommerce.config;

import com.magizh.tech.ecommerce.constants.JwtConstants;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.security.Keys;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.stereotype.Component;

import javax.crypto.SecretKey;
import java.util.Collection;
import java.util.Date;
import java.util.HashSet;
import java.util.Set;

@Component
public class JwtProvider {
    SecretKey key = Keys.hmacShaKeyFor(JwtConstants.SECRET_KEY.getBytes());

    public String generateToken(Authentication auth) {
        Collection<? extends GrantedAuthority> authorities = auth.getAuthorities();
        String roles = populateAuthorities(authorities);

        return Jwts.builder().issuedAt(new Date())  // ✅ Correct method name
                .expiration(new Date(System.currentTimeMillis() + 867400000L))  // ✅ Corrected expiration
                .claim("email", auth.getName()).claim("authorities", roles).signWith(key, Jwts.SIG.HS256)  // ✅ Requires both key & algorithm
                .compact();
    }

    private String populateAuthorities(Collection<? extends GrantedAuthority> authorities) {
        Set<String> auth = new HashSet<>();

        for (GrantedAuthority authority : authorities) {
            auth.add(authority.getAuthority());
        }
        return String.join(",", auth);
    }

    public String getEmailFromJwtToken(String jwt) {
        jwt = jwt.substring(7);
        SecretKey key = Keys.hmacShaKeyFor(JwtConstants.SECRET_KEY.getBytes());
        Claims claims = Jwts.parser().verifyWith(key).build().parseSignedClaims(jwt).getPayload();
        return String.valueOf(claims.get("email"));
    }
}
