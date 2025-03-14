package com.magizh.tech.ecommerce.service;

import com.magizh.tech.ecommerce.entity.Cart;
import com.magizh.tech.ecommerce.entity.CartItem;
import com.magizh.tech.ecommerce.entity.Product;
import com.magizh.tech.ecommerce.entity.User;

public interface CartService {

    CartItem addCartItem(
            User user,
            Product product,
            String size,
            int quantity
    );

    Cart findUserCart(User user);
}
