package com.magizh.tech.ecommerce.controller;

import com.magizh.tech.ecommerce.entity.Cart;
import com.magizh.tech.ecommerce.entity.Coupon;
import com.magizh.tech.ecommerce.entity.User;
import com.magizh.tech.ecommerce.service.CartService;
import com.magizh.tech.ecommerce.service.CouponService;
import com.magizh.tech.ecommerce.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api")
public class AdminCouponController {

    private final CouponService couponService;
    private final UserService userService;
    private final CartService cartService;


    @PostMapping("/apply")
    public ResponseEntity<Cart> applyCoupon(@RequestParam String apply, @RequestParam String code, @RequestParam double orderValue, @RequestHeader("Authorization") String jwt) throws Exception {
        User user = userService.findUserByJwtToken(jwt);
        Cart cart;
        if (apply.equals("true")) {
            cart = couponService.applyCoupon(code, orderValue, user);
        } else {
            cart = couponService.removeCoupon(code, user);
        }

        return ResponseEntity.ok(cart);
    }

    @PostMapping("/admin/create")
    public ResponseEntity<Coupon> getAllCoupons(@RequestBody Coupon coupon) {
        Coupon createdCoupon = couponService.createCoupon(coupon);
        return ResponseEntity.ok(createdCoupon);
    }

    @DeleteMapping("/admin/delete/{id}")
    public ResponseEntity<?> deleteCoupon(@PathVariable Long id) throws Exception {
        couponService.deleteCoupon(id);
        return ResponseEntity.ok("coupon deleted successfully!");
    }

    @GetMapping("/admin/all")
    public ResponseEntity<List<Coupon>> getAllCoupons() {
        List<Coupon> coupons = couponService.findAllCoupon();
        return ResponseEntity.ok(coupons);
    }

}
