package com.magizh.tech.ecommerce.controller;

import com.magizh.tech.ecommerce.entity.Cart;
import com.magizh.tech.ecommerce.entity.CartItem;
import com.magizh.tech.ecommerce.entity.Product;
import com.magizh.tech.ecommerce.entity.User;
import com.magizh.tech.ecommerce.request.AddItemRequest;
import com.magizh.tech.ecommerce.response.ApiResponse;
import com.magizh.tech.ecommerce.service.CartItemService;
import com.magizh.tech.ecommerce.service.CartService;
import com.magizh.tech.ecommerce.service.ProductService;
import com.magizh.tech.ecommerce.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/cart")
public class CartController {

    private final CartService cartService;

    private final CartItemService cartItemService;

    private final UserService userService;
    private final ProductService productService;


    @GetMapping
    public ResponseEntity<Cart> findUserCartHandler(@RequestHeader("Authorization") String jwt) throws Exception {
        User user = userService.findUserByJwtToken(jwt);
        Cart cart = cartService.findUserCart(user);
        return new ResponseEntity<Cart>(cart, HttpStatus.OK);
    }

    @PutMapping("/add")
    public ResponseEntity<CartItem> addItemToCart(@RequestBody AddItemRequest req,
                                                  @RequestHeader("Authorization") String jwt) throws Exception {
        User user = userService.findUserByJwtToken(jwt);
        Product product = productService.findByProductId(req.getProductId());

        CartItem cartItem = cartService.addCartItem(user, product, req.getSize(), req.getQuantity());
        ApiResponse response = new ApiResponse("Item added to cart successfully");
        return new ResponseEntity<>(cartItem, HttpStatus.ACCEPTED);
    }

    @DeleteMapping("/item/{cartItemId}")
    public ResponseEntity<ApiResponse> deleteCartItemHandler(@RequestHeader("Authorization") String jwt,
                                                             @PathVariable Long cartItemId) throws Exception {
        User user = userService.findUserByJwtToken(jwt);
        cartItemService.removeCartItem(user.getId(), cartItemId);

        ApiResponse apiResponse = new ApiResponse("Item Removed from cart");
        return new ResponseEntity<>(apiResponse, HttpStatus.OK);
    }

    @PutMapping("/item/{cartItemId}")
    public ResponseEntity<CartItem> updateCartItem(@RequestHeader("Authorization") String jwt,
                                                   @PathVariable Long cartItemId,
                                                   @RequestBody CartItem req) throws Exception {

        User user = userService.findUserByJwtToken(jwt);
        CartItem updateCartItem=null;
        if(req.getQuantity()>0){
            updateCartItem=cartItemService.updateCartItem(user.getId(),cartItemId,req);
        }

        return new ResponseEntity<>(updateCartItem,HttpStatus.OK);
    }
}
