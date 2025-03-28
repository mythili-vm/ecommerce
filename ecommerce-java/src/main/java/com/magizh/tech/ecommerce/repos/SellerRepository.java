package com.magizh.tech.ecommerce.repos;

import com.magizh.tech.ecommerce.entity.Seller;
import com.magizh.tech.ecommerce.enums.AccountStatus;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface SellerRepository extends JpaRepository<Seller, Long> {

    Seller findByEmail(String email);

    List<Seller> findByAccountStatus(AccountStatus status);
}
