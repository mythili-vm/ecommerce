package com.magizh.tech.ecommerce.service.impl;

import com.magizh.tech.ecommerce.config.JwtProvider;
import com.magizh.tech.ecommerce.entity.Address;
import com.magizh.tech.ecommerce.entity.Seller;
import com.magizh.tech.ecommerce.enums.AccountStatus;
import com.magizh.tech.ecommerce.enums.USER_ROLE;
import com.magizh.tech.ecommerce.exception.SellerException;
import com.magizh.tech.ecommerce.repos.AddressRepository;
import com.magizh.tech.ecommerce.repos.SellerRepository;
import com.magizh.tech.ecommerce.service.SellerService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;

import static java.util.Objects.isNull;

@Service
@RequiredArgsConstructor
public class SellerServiceImpl implements SellerService {
    private final SellerRepository sellerRepository;
    private final JwtProvider jwtProvider;
    private final PasswordEncoder passwordEncoder;
    private final AddressRepository addressRepository;


    @Override
    public Seller getSellerProfile(String jwt) throws SellerException {
        String email = jwtProvider.getEmailFromJwtToken(jwt);
        return getSellerByEmail(email);
    }

    @Override
    public Seller createSeller(Seller seller) throws SellerException {
        Seller sellerExist = sellerRepository.findByEmail(seller.getEmail());
        if (!isNull(sellerExist)) {
            throw new SellerException("seller already exist , use different email id");
        }
        Address savedAddress = addressRepository.saveAndFlush(seller.getPickUpAddress());
        Seller newSeller = new Seller();
        newSeller.setEmail(seller.getEmail());
        newSeller.setSellerName(seller.getSellerName());
        newSeller.setBankDetails(seller.getBankDetails());
        newSeller.setBusinessDetails(seller.getBusinessDetails());
        newSeller.setGSTIN(seller.getGSTIN());
        newSeller.setMobile(seller.getMobile());
        newSeller.setPassword(passwordEncoder.encode(seller.getPassword()));
        newSeller.setPickUpAddress(seller.getPickUpAddress());
        newSeller.setRole(USER_ROLE.ROLE_SELLER);
        return sellerRepository.saveAndFlush(newSeller);
    }

    @Override
    public Seller getSellerById(Long id) throws SellerException {
        return sellerRepository.findById(id).orElseThrow(() -> new SellerException("Seller not found"));
    }

    @Override
    public Seller getSellerByEmail(String email) throws SellerException {
        Seller seller = sellerRepository.findByEmail(email);
        if (isNull(seller)) {
            throw new SellerException("Seller Not Found");
        }
        return seller;
    }

    @Override
    public List<Seller> getAllSellers(AccountStatus status) {
        return sellerRepository.findByAccountStatus(status);
    }

    @Override
    public Seller updateSeller(Long id, Seller seller) throws SellerException {
        Seller existingSeller = getSellerById(id);
        if (!isNull(seller.getSellerName())) existingSeller.setSellerName(seller.getSellerName());
        if (!isNull(seller.getMobile())) {
            existingSeller.setMobile(seller.getMobile());
        }
        if (!isNull(seller.getEmail())) {
            existingSeller.setEmail(seller.getEmail());
        }
        if (!isNull(seller.getBusinessDetails()) && !isNull(seller.getBusinessDetails().getBusinessName())) {
            existingSeller.getBusinessDetails().setBusinessName(seller.getBusinessDetails().getBusinessName());
        }

        if (!isNull(seller.getBankDetails()) && !isNull(seller.getBankDetails().getAccountHolderName()) && !isNull(seller.getBankDetails().getIfscCode()) && !isNull(seller.getBankDetails().getAccountNumber())) {
            existingSeller.getBankDetails().setAccountHolderName(seller.getBankDetails().getAccountHolderName());
            existingSeller.getBankDetails().setAccountNumber(seller.getBankDetails().getAccountNumber());
            existingSeller.getBankDetails().setIfscCode(seller.getBankDetails().getIfscCode());
        }

        if (!isNull(seller.getPickUpAddress()) && !isNull(seller.getPickUpAddress().getAddress()) && !isNull(seller.getPickUpAddress().getMobileNumber()) && !isNull(seller.getPickUpAddress().getCity()) && !isNull(seller.getPickUpAddress().getState())) {
            existingSeller.getPickUpAddress().setAddress(seller.getPickUpAddress().getAddress());
            existingSeller.getPickUpAddress().setCity(seller.getPickUpAddress().getCity());
            existingSeller.getPickUpAddress().setState(seller.getPickUpAddress().getState());
            existingSeller.getPickUpAddress().setMobileNumber(seller.getPickUpAddress().getMobileNumber());
            existingSeller.getPickUpAddress().setPinCode(seller.getPickUpAddress().getPinCode());

        }

        if (!isNull(seller.getGSTIN())) existingSeller.setGSTIN(seller.getGSTIN());
        return sellerRepository.saveAndFlush(existingSeller);
    }

    @Override
    public void deleteSeller(Long id) throws Exception {
        Seller seller = getSellerById(id);
        sellerRepository.delete(seller);

    }

    @Override
    public Seller verifyEmail(String email, String otp) throws SellerException {
        Seller seller=getSellerByEmail(email);
        seller.setEmailVerified(true);
        seller.setAccountStatus(AccountStatus.ACTIVE);
        return sellerRepository.saveAndFlush(seller);
    }

    @Override
    public Seller updateSellerAccountStatus(Long id, AccountStatus status) throws SellerException {
        Seller seller = getSellerById(id);
        seller.setAccountStatus(status);
        return sellerRepository.saveAndFlush(seller);
    }
}
