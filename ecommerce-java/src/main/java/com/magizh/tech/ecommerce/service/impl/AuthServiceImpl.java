package com.magizh.tech.ecommerce.service.impl;

import com.magizh.tech.ecommerce.config.JwtProvider;
import com.magizh.tech.ecommerce.entity.Cart;
import com.magizh.tech.ecommerce.entity.Seller;
import com.magizh.tech.ecommerce.entity.User;
import com.magizh.tech.ecommerce.entity.VerificationCode;
import com.magizh.tech.ecommerce.enums.USER_ROLE;
import com.magizh.tech.ecommerce.model.LoginRequest;
import com.magizh.tech.ecommerce.repos.CartRepository;
import com.magizh.tech.ecommerce.repos.SellerRepository;
import com.magizh.tech.ecommerce.repos.UserRepository;
import com.magizh.tech.ecommerce.repos.VerificationCodeRepository;
import com.magizh.tech.ecommerce.request.SignupRequest;
import com.magizh.tech.ecommerce.response.AuthResponse;
import com.magizh.tech.ecommerce.service.AuthService;
import com.magizh.tech.ecommerce.utils.OtpUtil;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Collection;
import java.util.List;
import java.util.Objects;

import static java.util.Objects.isNull;

@Service
@RequiredArgsConstructor
public class AuthServiceImpl implements AuthService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final CartRepository cartRepository;
    private final JwtProvider jwtProvider;
    private final VerificationCodeRepository verificationCodeRepository;
    private final EmailService emailService;
    private final CustomUserServiceImpl customUserService;
    private final SellerRepository sellerRepository;


    @Override
    public String createUser(SignupRequest request) throws Exception {

        VerificationCode verificationCode = verificationCodeRepository.findByEmail(request.getEmail());
        if (isNull(verificationCode) || !verificationCode.getOtp().equals(request.getOtp())) {
            throw new Exception("wrong otp...");
        }

        User user = userRepository.findByEmail(request.getEmail());
        if (isNull(user)) {
            user =new User();
            user.setEmail(request.getEmail());
            user.setFullName(request.getFullName());
            user.setRole(USER_ROLE.ROLE_CUSTOMER);
            user.setMobile("9942135070");
            user.setPassword(passwordEncoder.encode(request.getOtp()));
            User savedUser = userRepository.saveAndFlush(user);
            Cart cart = new Cart();
            cart.setUser(user);
            cartRepository.save(cart);
        }
        List<GrantedAuthority> authorities = new ArrayList<>();
        authorities.add(new SimpleGrantedAuthority(USER_ROLE.ROLE_CUSTOMER.toString()));
        Authentication authentication = new UsernamePasswordAuthenticationToken(request.getEmail(), null, authorities);
        SecurityContextHolder.getContext().setAuthentication(authentication);

        return jwtProvider.generateToken(authentication);
    }

    @Override
    public void sentLoginOtp(String email, USER_ROLE role) throws Exception {
        String SIGNING_PREFIX = "signin_";

        if (email.startsWith(SIGNING_PREFIX)){
            email = email.substring(SIGNING_PREFIX.length());
            if(role.equals(USER_ROLE.ROLE_SELLER)){
                Seller seller=sellerRepository.findByEmail(email);
                if (isNull(seller)) {
                    throw new Exception("seller not exist with provided email");
                }

            }else {
                User user = userRepository.findByEmail(email);
                if (isNull(user)) {
                    throw new Exception("user not exist with provided email");
                }
            }
        }




        VerificationCode isExist = verificationCodeRepository.findByEmail(email);
        if (!isNull(isExist)) {
            verificationCodeRepository.delete(isExist);
        }

        String otp = OtpUtil.generateOtp();
        VerificationCode verificationCode = new VerificationCode();
        verificationCode.setOtp(otp);
        verificationCode.setEmail(email);
        verificationCodeRepository.save(verificationCode);

        String subject = "Magizh Bazaar login/signup otp";
        String text = "your  login/signup otp is -" + otp;
        emailService.sendVerificationOtpEmail(email, otp, subject, text);

    }

    @Override
    public AuthResponse signIn(LoginRequest req) {
        String userName = req.getEmail();
        String otp = req.getOtp();
        Authentication authentication = authenticate(userName, otp);

        String token = jwtProvider.generateToken(authentication);
        AuthResponse authResponse = new AuthResponse();
        authResponse.setJwt(token);
        authResponse.setMessage("Login Success!");
        Collection<? extends GrantedAuthority> authorities = authentication.getAuthorities();
        String roleName = authorities.isEmpty() ? null : authorities.iterator().next().getAuthority();
        authResponse.setRole(USER_ROLE.valueOf(roleName));
        return authResponse;
    }

    private Authentication authenticate(String userName, String otp) {
        UserDetails user = customUserService.loadUserByUsername(userName);
        if (isNull(user)) {
            throw new BadCredentialsException("Invalid username");
        }

        VerificationCode verificationCode = verificationCodeRepository.findByEmail(user.getUsername());
        if (isNull(verificationCode) || !verificationCode.getOtp().equals(otp)) {
            throw new BadCredentialsException("wrong otp");
        }

        return new UsernamePasswordAuthenticationToken(user, null, user.getAuthorities());
    }
}
