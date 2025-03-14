package com.magizh.tech.ecommerce.service;

import com.magizh.tech.ecommerce.entity.CartItem;

public interface CartItemService {

    CartItem updateCartItem(Long userId, Long id, CartItem cartItem) throws Exception;

    void removeCartItem(Long userId, Long cartItemId) throws Exception;

    CartItem findCartItem(Long cartItemId) throws Exception;
}
