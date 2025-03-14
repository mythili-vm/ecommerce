package com.magizh.tech.ecommerce.service.impl;

import com.magizh.tech.ecommerce.entity.Cart;
import com.magizh.tech.ecommerce.entity.CartItem;
import com.magizh.tech.ecommerce.entity.Product;
import com.magizh.tech.ecommerce.entity.User;
import com.magizh.tech.ecommerce.repos.CartItemRepository;
import com.magizh.tech.ecommerce.repos.CartRepository;
import com.magizh.tech.ecommerce.service.CartService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import static java.util.Objects.isNull;

@Service
@RequiredArgsConstructor
public class CartServiceImpl implements CartService {
    private final CartRepository cartRepository;
    private final CartItemRepository cartItemRepository;

    @Override
    public CartItem addCartItem(User user, Product product, String size, int quantity) {

        Cart cart = findUserCart(user);
        CartItem isPresent = cartItemRepository.findByCartAndProductAndSize(cart, product, size);

        if (isNull(isPresent)) {
            CartItem cartItem = new CartItem();
            cartItem.setProduct(product);
            cartItem.setQuantity(quantity);
            cartItem.setUserId(user.getId());
            cartItem.setSize(size);
            int totalPrice = quantity * product.getSellingPrice();
            cartItem.setSellingPrice(totalPrice);

            cart.getCartItems().add(cartItem);
            cartItem.setMrpPrice(quantity*product.getMrpPrice());
            cartItem.setCart(cart);
            return cartItemRepository.saveAndFlush(cartItem);
        }
        return isPresent;
    }

    @Override
    public Cart findUserCart(User user) {
        Cart cart = cartRepository.findByUserId(user.getId());

        int totalPrice = 0;
        int totalDiscountedPrice = 0;
        int totalItem = 0;


        for (CartItem cartItem : cart.getCartItems()) {
            totalPrice += cartItem.getMrpPrice();
            totalDiscountedPrice += cartItem.getSellingPrice();
            totalItem += cartItem.getQuantity();
        }
        cart.setTotalMrpPrice(totalPrice);
        cart.setTotalSellingPrice(totalDiscountedPrice);
        cart.setDiscount(calculateDiscountPercentage(totalPrice, totalDiscountedPrice));
        cart.setTotalItem(totalItem);
        return cart;
    }

    private int calculateDiscountPercentage(int mrpPrice, int sellingPrice) {
        if (mrpPrice < 0) {
            throw new IllegalArgumentException("Actual price must be greater than 0");
        }
        double discount = mrpPrice - sellingPrice;
        double discountPercentage = (discount / mrpPrice) * 100;
        return (int) discountPercentage;
    }
}
