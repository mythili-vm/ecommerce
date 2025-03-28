package com.magizh.tech.ecommerce.service;

import com.magizh.tech.ecommerce.enums.USER_ROLE;
import com.magizh.tech.ecommerce.model.LoginRequest;
import com.magizh.tech.ecommerce.request.SignupRequest;
import com.magizh.tech.ecommerce.response.AuthResponse;

public interface AuthService {

    String createUser(SignupRequest request) throws Exception;

    void sentLoginOtp(String email, USER_ROLE role) throws Exception;

    AuthResponse signIn(LoginRequest req);
}
