package com.magizh.tech.ecommerce.service;

import com.magizh.tech.ecommerce.entity.*;
import com.magizh.tech.ecommerce.enums.OrderStatus;

import java.util.List;
import java.util.Set;

public interface OrderService {

    Set<Order> createOrder(User user, Address shippingAddress, Cart cart);

    Order findOrderById(Long orderId) throws Exception;

    List<Order> usersOrderHistory(Long userId);

    List<Order> sellerOrder(Long sellerId);

    Order updateOrderStatus(Long orderId, OrderStatus orderStatus) throws Exception;

    Order cancelOrder(Long orderId, User user) throws Exception;

    OrderItem findOrderItemById(Long orderItemId);
}
