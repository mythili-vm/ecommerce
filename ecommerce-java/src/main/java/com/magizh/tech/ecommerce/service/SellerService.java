package com.magizh.tech.ecommerce.service;

import com.magizh.tech.ecommerce.entity.Seller;
import com.magizh.tech.ecommerce.enums.AccountStatus;
import com.magizh.tech.ecommerce.exception.SellerException;

import java.util.List;

public interface SellerService {

    Seller getSellerProfile(String jwt) throws SellerException;

    Seller createSeller(Seller seller) throws SellerException;

    Seller getSellerById(Long id) throws SellerException;

    Seller getSellerByEmail(String email) throws SellerException;

    List<Seller> getAllSellers(AccountStatus status);

    Seller updateSeller(Long id, Seller seller) throws SellerException;

    void deleteSeller(Long id) throws Exception;

    Seller verifyEmail(String email, String otp) throws SellerException;

    Seller updateSellerAccountStatus(Long sellerId, AccountStatus status) throws SellerException;

}
