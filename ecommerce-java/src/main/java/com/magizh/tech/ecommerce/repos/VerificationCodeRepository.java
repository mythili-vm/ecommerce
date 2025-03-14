package com.magizh.tech.ecommerce.repos;

import com.magizh.tech.ecommerce.entity.VerificationCode;
import org.springframework.data.jpa.repository.JpaRepository;

public interface VerificationCodeRepository extends JpaRepository<VerificationCode, Long> {

    VerificationCode findByEmail(String email);

    VerificationCode findByOtp(String otp);
}
