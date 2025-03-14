package com.magizh.tech.ecommerce.service;

import com.magizh.tech.ecommerce.entity.Cart;
import com.magizh.tech.ecommerce.entity.Coupon;
import com.magizh.tech.ecommerce.entity.User;

import java.util.List;

public interface CouponService {

    Cart applyCoupon(String code, double orderValue, User user) throws Exception;

    Cart removeCoupon(String code, User user) throws Exception;

    Coupon findCouponById(Long id) throws Exception;

    Coupon createCoupon(Coupon coupon);

    List<Coupon> findAllCoupon();

    void deleteCoupon(Long couponId) throws Exception;
}
