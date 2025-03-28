package com.magizh.tech.ecommerce.repos;

import com.magizh.tech.ecommerce.entity.Coupon;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface CouponRepository extends JpaRepository<Coupon, Long> {

    Coupon findByCode(String code);
}
