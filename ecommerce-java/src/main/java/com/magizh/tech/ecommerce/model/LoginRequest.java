package com.magizh.tech.ecommerce.model;

import lombok.Data;

@Data
public class LoginRequest {

    private String email;
    private String otp;
}
