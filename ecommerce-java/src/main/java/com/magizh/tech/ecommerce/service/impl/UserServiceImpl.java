package com.magizh.tech.ecommerce.service.impl;

import com.magizh.tech.ecommerce.config.JwtProvider;
import com.magizh.tech.ecommerce.entity.User;
import com.magizh.tech.ecommerce.repos.UserRepository;
import com.magizh.tech.ecommerce.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import static java.util.Objects.isNull;


@Service
@RequiredArgsConstructor
public class UserServiceImpl implements UserService {

    private final JwtProvider jwtProvider;
    private final UserRepository userRepository;
    @Override
    public User findUserByEmail(String email) throws Exception {
        User user= userRepository.findByEmail(email);
        if(isNull(user))
            throw new Exception("User not found with email -"+email);
        return user;
    }

    @Override
    public User findUserByJwtToken(String token) throws Exception {
        String email=jwtProvider.getEmailFromJwtToken(token);
        return findUserByEmail(email);
    }
}
