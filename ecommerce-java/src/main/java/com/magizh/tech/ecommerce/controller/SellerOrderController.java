package com.magizh.tech.ecommerce.controller;

import com.magizh.tech.ecommerce.entity.Order;
import com.magizh.tech.ecommerce.entity.Seller;
import com.magizh.tech.ecommerce.entity.User;
import com.magizh.tech.ecommerce.enums.OrderStatus;
import com.magizh.tech.ecommerce.exception.SellerException;
import com.magizh.tech.ecommerce.service.OrderService;
import com.magizh.tech.ecommerce.service.SellerService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/seller/orders")
public class SellerOrderController {

    private final OrderService orderService;
    private final SellerService sellerService;

    @GetMapping
    public ResponseEntity<List<Order>> getAllOrdersHandler(
            @RequestHeader("Authorization") String jwt) throws SellerException {
        Seller seller = sellerService.getSellerProfile(jwt);
        List<Order> orders = orderService.sellerOrder(seller.getId());
        return new ResponseEntity<>(orders, HttpStatus.OK);
    }

    @PatchMapping("/{orderId}/status/{orderStatus}")
    public ResponseEntity<Order> updateOrderHandler(
            @RequestHeader("Authorization") String jwt,
            @PathVariable Long orderId,
            @PathVariable OrderStatus orderStatus) throws Exception {
        Order order = orderService.updateOrderStatus(orderId, orderStatus);
        return new ResponseEntity<>(order, HttpStatus.OK);
    }
}
