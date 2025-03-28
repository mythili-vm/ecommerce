package com.magizh.tech.ecommerce.service.impl;

import com.magizh.tech.ecommerce.entity.*;
import com.magizh.tech.ecommerce.enums.OrderStatus;
import com.magizh.tech.ecommerce.enums.PaymentStatus;
import com.magizh.tech.ecommerce.repos.AddressRepository;
import com.magizh.tech.ecommerce.repos.OrderItemRepository;
import com.magizh.tech.ecommerce.repos.OrderRepository;
import com.magizh.tech.ecommerce.service.OrderService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.*;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class OrderServiceImpl implements OrderService {

    private final OrderRepository orderRepository;
    private final AddressRepository addressRepository;
    private final OrderItemRepository orderItemRepository;

    @Override
    public Set<Order> createOrder(User user, Address shippingAddress, Cart cart) {
        if (!user.getAddresses().contains(shippingAddress)) {
            user.getAddresses().add(shippingAddress);
        }

        Address address = addressRepository.save(shippingAddress);
        Map<Long, List<CartItem>> itemsBySeller = cart.getCartItems().stream()
                .collect(Collectors.groupingBy(item -> item.getProduct().getSeller().getId()));
        Set<Order> orders = new HashSet<>();

        for (Map.Entry<Long, List<CartItem>> entry : itemsBySeller.entrySet()) {
            Long sellerId = entry.getKey();
            List<CartItem> items = entry.getValue();
            int totalOrderPrice = items.stream().mapToInt(CartItem::getSellingPrice).sum();
            int totalItem = items.stream().mapToInt(CartItem::getQuantity).sum();

            Order createdOrder = new Order();
            createdOrder.setUser(user);
            createdOrder.setSellerId(sellerId);
            createdOrder.setTotalMrpPrice(totalOrderPrice);
            createdOrder.setTotalSellingPrice(totalOrderPrice);
            createdOrder.setTotalItem(totalItem);
            createdOrder.setShippingAddress(address);
            createdOrder.getPaymentDetails().setStatus(PaymentStatus.PENDING);
            createdOrder.setOrderStatus(OrderStatus.PENDING);
            Order savedOrder = orderRepository.saveAndFlush(createdOrder);
            orders.add(savedOrder);
            List<OrderItem> orderItems = new ArrayList<>();

            for (CartItem item : items) {
                OrderItem orderItem = new OrderItem();
                orderItem.setOrder(savedOrder);
                orderItem.setSize(item.getSize());
                orderItem.setProduct(item.getProduct());
                orderItem.setQuantity(item.getQuantity());
                orderItem.setMrpPrice(item.getMrpPrice());
                orderItem.setSellingPrice(item.getSellingPrice());
                orderItem.setUserId(item.getUserId());
                savedOrder.getOrderItems().add(orderItem);

                OrderItem savedOrderItem = orderItemRepository.saveAndFlush(orderItem);
                orderItems.add(savedOrderItem);
            }
        }
        return orders;
    }

    @Override
    public Order findOrderById(Long id) throws Exception {
        return orderRepository.findById(id).orElseThrow(() -> new Exception("Order not found"));
    }

    @Override
    public List<Order> usersOrderHistory(Long userId) {
        return orderRepository.findByUserId(userId);
    }

    @Override
    public List<Order> sellerOrder(Long userId) {
        return orderRepository.findBySellerId(userId);
    }

    @Override
    public Order updateOrderStatus(Long orderId, OrderStatus orderStatus) throws Exception {
        Order order = findOrderById(orderId);
        order.setOrderStatus(orderStatus);
        return orderRepository.saveAndFlush(order);
    }

    @Override
    public Order cancelOrder(Long orderId, User user) throws Exception {
        Order order = findOrderById(orderId);
        if (!order.getUser().getId().equals(user.getId())) {
            throw new Exception("you don't have access to this order");
        }
        order.setOrderStatus(OrderStatus.CANCELLED);
        return orderRepository.saveAndFlush(order);
    }

    @Override
    public OrderItem findOrderItemById(Long id) {
        return orderItemRepository.findById(id).orElseThrow(() -> new RuntimeException("order item not found"));
    }
}
