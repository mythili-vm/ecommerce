package com.magizh.tech.ecommerce.controller;

import com.magizh.tech.ecommerce.entity.VerificationCode;
import com.magizh.tech.ecommerce.enums.USER_ROLE;
import com.magizh.tech.ecommerce.model.LoginRequest;
import com.magizh.tech.ecommerce.request.LoginOtpRequest;
import com.magizh.tech.ecommerce.request.SignupRequest;
import com.magizh.tech.ecommerce.response.ApiResponse;
import com.magizh.tech.ecommerce.response.AuthResponse;
import com.magizh.tech.ecommerce.service.AuthService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/auth")
@RequiredArgsConstructor
public class AuthController {

    private final AuthService authService;

    @PostMapping("/signup")
    public ResponseEntity<AuthResponse> createUserHandler(@RequestBody SignupRequest request) throws Exception {
        String jwt = authService.createUser(request);
        return ResponseEntity.ok(new AuthResponse(jwt, "register success", USER_ROLE.ROLE_CUSTOMER));
    }

    @PostMapping("/sent/login-signup-otp")
    public ResponseEntity<ApiResponse> sentOtpHandler(@RequestBody LoginOtpRequest request) throws Exception {
        authService.sentLoginOtp(request.getEmail(), request.getRole());
        return ResponseEntity.ok(new ApiResponse("otp sent successfully"));
    }

    @PostMapping("/sign-in")
    public ResponseEntity<AuthResponse> loginHandler(@RequestBody LoginRequest request) throws Exception {
        AuthResponse authResponse = authService.signIn(request);
        return ResponseEntity.ok(authResponse);
    }
}
