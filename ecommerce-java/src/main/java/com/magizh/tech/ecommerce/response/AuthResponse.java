package com.magizh.tech.ecommerce.response;

import com.magizh.tech.ecommerce.enums.USER_ROLE;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class AuthResponse {

    private String jwt;
    private String message;
    private USER_ROLE role;
}
