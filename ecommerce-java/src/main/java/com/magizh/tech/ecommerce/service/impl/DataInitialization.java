package com.magizh.tech.ecommerce.service.impl;

import com.magizh.tech.ecommerce.entity.User;
import com.magizh.tech.ecommerce.enums.USER_ROLE;
import com.magizh.tech.ecommerce.repos.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

import static java.util.Objects.isNull;

@Component
@RequiredArgsConstructor
public class DataInitialization implements CommandLineRunner {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    @Override
    public void run(String... args) throws Exception {
        initializeAdminUser();
    }

    private void initializeAdminUser() {
        String adminUsername="mail2mylu@gmail.com";
        if(isNull(userRepository.findByEmail(adminUsername))){
            User adminUser=new User();
            adminUser.setPassword(passwordEncoder.encode("M@g1zh@n@2022"));
            adminUser.setFullName("Mythili Muthusamy");
            adminUser.setEmail(adminUsername);
            adminUser.setRole(USER_ROLE.ROLE_ADMIN);
            User admin=userRepository.saveAndFlush(adminUser);
        }
    }
}
