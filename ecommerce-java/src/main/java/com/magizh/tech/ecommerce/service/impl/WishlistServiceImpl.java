package com.magizh.tech.ecommerce.service.impl;

import com.magizh.tech.ecommerce.entity.Product;
import com.magizh.tech.ecommerce.entity.User;
import com.magizh.tech.ecommerce.entity.WishList;
import com.magizh.tech.ecommerce.repos.WishlistRepository;
import com.magizh.tech.ecommerce.service.WishlistService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import static java.util.Objects.isNull;

@Service
@RequiredArgsConstructor
public class WishlistServiceImpl implements WishlistService {

    private final WishlistRepository wishlistRepository;

    @Override
    public WishList createWishList(User user) {
        WishList wishList = new WishList();
        wishList.setUserId(user);
        return wishlistRepository.saveAndFlush(wishList);
    }

    @Override
    public WishList getWishListByUserId(User user) {
        WishList wishList = wishlistRepository.findByUserId(user);
        if (isNull(wishList)) {
            wishList = createWishList(user);
        }
        return wishList;
    }

    @Override
    public WishList addProductToWishlist(User user, Product product) {
        WishList wishList = getWishListByUserId(user);
        if (wishList.getProducts().contains(product)) {
            wishList.getProducts().remove(product);
        } else wishList.getProducts().add(product);

        return wishlistRepository.saveAndFlush(wishList);
    }
}
