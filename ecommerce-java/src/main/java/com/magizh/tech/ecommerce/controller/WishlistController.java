package com.magizh.tech.ecommerce.controller;

import com.magizh.tech.ecommerce.entity.Product;
import com.magizh.tech.ecommerce.entity.User;
import com.magizh.tech.ecommerce.entity.WishList;
import com.magizh.tech.ecommerce.service.ProductService;
import com.magizh.tech.ecommerce.service.UserService;
import com.magizh.tech.ecommerce.service.WishlistService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/wishlist")
public class WishlistController {

    private final WishlistService wishlistService;
    private final UserService userService;
    private final ProductService productService;

    @GetMapping
    public ResponseEntity<WishList> getWishListByUserId(
            @RequestHeader("Authorization") String jwt
    ) throws Exception {
        User user = userService.findUserByJwtToken(jwt);
        WishList wishList = wishlistService.getWishListByUserId(user);
        return ResponseEntity.ok(wishList);
    }

    @PostMapping("/add-product/{productId}")
    public ResponseEntity<WishList> addProductToWishList(
            @RequestHeader("Authorization") String jwt,
            @PathVariable Long productId
    ) throws Exception {
        Product product = productService.findByProductId(productId);
        User user = userService.findUserByJwtToken(jwt);
        WishList updatedWishList = wishlistService.addProductToWishlist(user, product);
        return ResponseEntity.ok(updatedWishList);
    }


}
