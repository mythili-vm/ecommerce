package com.magizh.tech.ecommerce.service.impl;

import com.magizh.tech.ecommerce.entity.Order;
import com.magizh.tech.ecommerce.entity.PaymentOrder;
import com.magizh.tech.ecommerce.entity.User;
import com.magizh.tech.ecommerce.enums.PaymentOrderStatus;
import com.magizh.tech.ecommerce.enums.PaymentStatus;
import com.magizh.tech.ecommerce.repos.OrderRepository;
import com.magizh.tech.ecommerce.repos.PaymentOrderRepository;
import com.magizh.tech.ecommerce.service.PaymentService;
import com.razorpay.Payment;
import com.razorpay.PaymentLink;
import com.razorpay.RazorpayClient;
import com.razorpay.RazorpayException;
import com.stripe.Stripe;
import com.stripe.exception.StripeException;
import com.stripe.model.checkout.Session;
import com.stripe.param.checkout.SessionCreateParams;
import lombok.RequiredArgsConstructor;
import org.json.JSONObject;
import org.springframework.stereotype.Service;

import java.util.Set;

@Service
@RequiredArgsConstructor
public class PaymentServiceImpl implements PaymentService {

    private final PaymentOrderRepository paymentOrderRepository;
    private final OrderRepository orderRepository;

    private String apiKey = "apikey";
    private String apiSecret = "apisecret";
    private String stripeApiSecret = "apisecret";

    @Override
    public PaymentOrder createOrder(User user, Set<Order> orders) {
        Long amount = orders.stream().mapToLong(Order::getTotalSellingPrice).sum();
        PaymentOrder paymentOrder = new PaymentOrder();
        paymentOrder.setAmount(amount);
        paymentOrder.setUser(user);
        paymentOrder.setOrders(orders);
        return paymentOrderRepository.saveAndFlush(paymentOrder);
    }

    @Override
    public PaymentOrder getPaymentOrderById(Long orderId) throws Exception {
        return paymentOrderRepository.findById(orderId).orElseThrow(() -> new Exception("Payment order not found"));
    }

    @Override
    public PaymentOrder getPaymentOrderByPaymentId(String paymentId) throws Exception {
        return paymentOrderRepository.findByPaymentLinkId(paymentId).orElseThrow(() -> new Exception("Payment order not found with payment link"));
    }

    @Override
    public boolean processPaymentOrder(PaymentOrder paymentOrder, String paymentId, String paymentLinkId) throws RazorpayException {
        if (paymentOrder.getStatus().equals(PaymentOrderStatus.PENDING)) {
            RazorpayClient razorpayClient = new RazorpayClient(apiKey, apiSecret);
            Payment payment = razorpayClient.payments.fetch(paymentId);
            String status = payment.get("status");
            if (status.equals("captured")) {
                Set<Order> orders = paymentOrder.getOrders();
                orders.forEach(order -> {
                    order.setPaymentStatus(PaymentStatus.COMPLETED);
                    orderRepository.save(order);
                });
                paymentOrder.setStatus(PaymentOrderStatus.SUCCESS);
                paymentOrderRepository.save(paymentOrder);
                return true;
            }
            paymentOrder.setStatus(PaymentOrderStatus.FAILED);
            paymentOrderRepository.save(paymentOrder);
            return false;
        }

        return false;
    }

    @Override
    public PaymentLink createRazorpayPayment(User user, Long amount, Long orderId) throws RazorpayException {
        amount = amount * 100;
        RazorpayClient razorpayClient = new RazorpayClient(apiKey, apiSecret);
        JSONObject paymentLinkRequest = new JSONObject();
        paymentLinkRequest.put("amount", amount);
        paymentLinkRequest.put("currency", "INR");

        JSONObject customer = new JSONObject();
        customer.put("name", user.getFullName());
        customer.put("email", user.getEmail());
        paymentLinkRequest.put("customer", customer);

        JSONObject notify = new JSONObject();
        notify.put("email", true);
        paymentLinkRequest.put("notify", notify);


        paymentLinkRequest.put("callback_url", "http://localhost:3000/payment-success/" + orderId);
        paymentLinkRequest.put("callback_method", "get");
        return razorpayClient.paymentLink.create(paymentLinkRequest);
    }

    @Override
    public String createStripePaymentLink(User user, Long amount, Long orderId) throws StripeException {
        Stripe.apiKey = stripeApiSecret;
        SessionCreateParams params = SessionCreateParams.builder().addPaymentMethodType(SessionCreateParams.PaymentMethodType.CARD).setMode(SessionCreateParams.Mode.PAYMENT).setSuccessUrl("http://localhost:3000/payment-success/" + orderId).setCancelUrl("http://localhost:3000/payment-cance/").addLineItem(SessionCreateParams.LineItem.builder().setQuantity(1L).setPriceData(SessionCreateParams.LineItem.PriceData.builder().setCurrency("usd").setUnitAmount(amount * 100).setProductData(SessionCreateParams.LineItem.PriceData.ProductData.builder().setName("Magizh Bazaar Payment").build()).build()).build()).build();
        Session session = Session.create(params);
        return session.getUrl();
    }
}
