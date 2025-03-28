package com.magizh.tech.ecommerce.request;

import com.magizh.tech.ecommerce.enums.USER_ROLE;
import lombok.Data;

@Data
public class LoginOtpRequest {
    private String email;
    private String otp;
    private USER_ROLE role;
}
