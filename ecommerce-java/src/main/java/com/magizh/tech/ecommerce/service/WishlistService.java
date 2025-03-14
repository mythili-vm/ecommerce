package com.magizh.tech.ecommerce.service;

import com.magizh.tech.ecommerce.entity.Product;
import com.magizh.tech.ecommerce.entity.User;
import com.magizh.tech.ecommerce.entity.WishList;

public interface WishlistService {

    WishList createWishList(User user);

    WishList getWishListByUserId(User user);

    WishList addProductToWishlist(User user, Product product);
}
