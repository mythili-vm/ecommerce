package com.magizh.tech.ecommerce.service.impl;

import com.magizh.tech.ecommerce.entity.CartItem;
import com.magizh.tech.ecommerce.entity.User;
import com.magizh.tech.ecommerce.repos.CartItemRepository;
import com.magizh.tech.ecommerce.service.CartItemService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@RequiredArgsConstructor
@Service
public class CartItemServiceImpl implements CartItemService {

    private CartItemRepository cartItemRepository;

    @Override
    public CartItem updateCartItem(Long userId, Long id, CartItem cartItem) throws Exception {

        CartItem item = findCartItem(userId);
        User cartItemUser = item.getCart().getUser();
        if (cartItemUser.getId().equals(userId)) {
            item.setQuantity(cartItem.getQuantity());
            item.setMrpPrice(item.getQuantity() * item.getProduct().getMrpPrice());
            item.setSellingPrice(item.getQuantity() * item.getProduct().getSellingPrice());
            return cartItemRepository.saveAndFlush(item);
        }
        throw new Exception("you can't update this cart item");
    }

    @Override
    public void removeCartItem(Long userId, Long cartItemId) throws Exception {
        CartItem item = findCartItem(cartItemId);
        User cartItemUser = item.getCart().getUser();

        if (cartItemUser.getId().equals(userId)) {
            cartItemRepository.delete(item);
        } else
            throw new Exception("you can't delete this item");

    }

    @Override
    public CartItem findCartItem(Long id) throws Exception {
        return cartItemRepository.findById(id). orElseThrow(() -> new Exception("cart item not found"));
    }
}
