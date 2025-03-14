package com.magizh.tech.ecommerce.utils;

import java.util.Random;

public class OtpUtil {

    public static String generateOtp() {
        int otpLength = 6;
        Random rnd = new Random();
        StringBuilder otp = new StringBuilder();
        for (int i = 0; i < otpLength; i++) {
            otp.append((rnd.nextInt(10)));
        }
        return otp.toString();
    }
}
