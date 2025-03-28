package com.magizh.tech.ecommerce.service;

import com.magizh.tech.ecommerce.entity.Order;
import com.magizh.tech.ecommerce.entity.PaymentOrder;
import com.magizh.tech.ecommerce.entity.User;
import com.razorpay.PaymentLink;
import com.razorpay.RazorpayException;
import com.stripe.exception.StripeException;

import java.util.Set;

public interface PaymentService {
    PaymentOrder createOrder(User user, Set<Order> orders);

    PaymentOrder getPaymentOrderById(Long orderId) throws Exception;

    PaymentOrder getPaymentOrderByPaymentId(String paymentId) throws Exception;

    boolean processPaymentOrder(PaymentOrder paymentOrder, String paymentId, String paymentLinkId) throws RazorpayException;

    PaymentLink createRazorpayPayment(User user, Long amount, Long id) throws Exception;

    String createStripePaymentLink(User user, Long amount, Long id) throws StripeException;
}
