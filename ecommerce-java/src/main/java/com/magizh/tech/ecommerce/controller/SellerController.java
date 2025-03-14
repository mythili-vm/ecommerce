package com.magizh.tech.ecommerce.controller;

import com.magizh.tech.ecommerce.config.JwtProvider;
import com.magizh.tech.ecommerce.entity.Seller;
import com.magizh.tech.ecommerce.entity.SellerReport;
import com.magizh.tech.ecommerce.entity.VerificationCode;
import com.magizh.tech.ecommerce.enums.AccountStatus;
import com.magizh.tech.ecommerce.exception.SellerException;
import com.magizh.tech.ecommerce.model.LoginRequest;
import com.magizh.tech.ecommerce.repos.VerificationCodeRepository;
import com.magizh.tech.ecommerce.response.AuthResponse;
import com.magizh.tech.ecommerce.service.AuthService;
import com.magizh.tech.ecommerce.service.SellerReportService;
import com.magizh.tech.ecommerce.service.SellerService;
import com.magizh.tech.ecommerce.service.impl.EmailService;
import com.magizh.tech.ecommerce.utils.OtpUtil;
import jakarta.mail.MessagingException;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

import static java.util.Objects.isNull;

@RestController
@RequiredArgsConstructor
@RequestMapping("/seller")
public class SellerController {

    private final SellerService sellerService;
    private final VerificationCodeRepository verificationCodeRepository;
    private final AuthService authService;
    private final EmailService emailService;
    private final JwtProvider jwtProvider;
    private final SellerReportService sellerReportService;

    @PostMapping("/login")
    public ResponseEntity<AuthResponse> loginSeller(@RequestBody LoginRequest req) {
        String email = req.getEmail();
        req.setEmail("seller_" + email);
        AuthResponse authResponse = authService.signIn(req);
        return ResponseEntity.ok(authResponse);

    }

    @PatchMapping("/verify/{otp}")
    public ResponseEntity<Seller> verifySellerEmail(@PathVariable String otp) throws SellerException {
        VerificationCode verificationCode = verificationCodeRepository.findByOtp(otp);

        if (isNull(verificationCode) || !verificationCode.getOtp().equals(otp)) {
            throw new SellerException("wrong otp");
        }

        Seller seller = sellerService.verifyEmail(verificationCode.getEmail(), otp);
        return ResponseEntity.ok(seller);
    }

    @PostMapping
    public ResponseEntity<Seller> createSeller(@RequestBody Seller seller) throws SellerException, MessagingException {
        Seller savedSeller = sellerService.createSeller(seller);
        String otp = OtpUtil.generateOtp();
        VerificationCode verificationCode = new VerificationCode();
        verificationCode.setOtp(otp);
        verificationCode.setEmail(savedSeller.getEmail());
        verificationCodeRepository.save(verificationCode);

        String subject = "Magizh Bazaar Email verification Code";
        String text = "Welcome to Magizh Bazaar,Verify your account using this link ";
        String frontend_url = "http://localhost:3000/verify-seller";
        emailService.sendVerificationOtpEmail(seller.getEmail(), verificationCode.getOtp(), subject, text + frontend_url);
        return new ResponseEntity<>(seller, HttpStatus.CREATED);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Seller> getSellerById(@PathVariable Long id) throws SellerException {
        Seller seller = sellerService.getSellerById(id);
        return new ResponseEntity<>(seller, HttpStatus.OK);
    }

    @GetMapping("/profile")
    public ResponseEntity<Seller> getSellerByJwt(@RequestHeader("Authorization") String jwt) throws Exception {
        String email = jwtProvider.getEmailFromJwtToken(jwt);
        Seller seller = sellerService.getSellerByEmail(email);
        return new ResponseEntity<>(seller, HttpStatus.OK);
    }

    @GetMapping("/report")
    public ResponseEntity<SellerReport> getSellerReport(@RequestHeader("Authorization") String jwt) throws Exception {
        String email=jwtProvider.getEmailFromJwtToken(jwt);
        Seller seller=sellerService.getSellerByEmail(email);
        SellerReport report=sellerReportService.getSellerReport(seller);
        return new ResponseEntity<>(report,HttpStatus.OK);
    }

    @GetMapping
    public ResponseEntity<List<Seller>> getAllSellers(@RequestParam(required = false) AccountStatus status) {
        List<Seller> sellers = sellerService.getAllSellers(status);
        return ResponseEntity.ok(sellers);
    }

    @PatchMapping
    public ResponseEntity<Seller> updateSeller(@RequestHeader("Authorization") String jwt, @RequestBody Seller seller) throws Exception {
        Seller profile = sellerService.getSellerProfile(jwt);
        Seller updatedSeller = sellerService.updateSeller(profile.getId(), seller);
        return ResponseEntity.ok(updatedSeller);
    }
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteSeller(@PathVariable Long id) throws Exception {
        sellerService.deleteSeller(id);
        return ResponseEntity.noContent().build();
    }
}
