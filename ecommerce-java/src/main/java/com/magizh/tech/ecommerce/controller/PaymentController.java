package com.magizh.tech.ecommerce.controller;

import com.magizh.tech.ecommerce.entity.*;
import com.magizh.tech.ecommerce.response.ApiResponse;
import com.magizh.tech.ecommerce.response.PaymentLinkResponse;
import com.magizh.tech.ecommerce.service.*;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/payment")
public class PaymentController {
    private final PaymentService paymentService;
    private final UserService userService;
    private final TransactionService transactionService;
    private final SellerService sellerService;
    private final SellerReportService sellerReportService;

    @GetMapping("/api/payment/{paymentId}")
    public ResponseEntity<ApiResponse> paymentSuccessHandler(@PathVariable String paymentId, @RequestParam String paymentLinkId, @RequestHeader("Authorization") String jwt) throws Exception {
        User user = userService.findUserByJwtToken(jwt);
        PaymentLinkResponse paymentResponse;

        PaymentOrder paymentOrder = paymentService.getPaymentOrderByPaymentId(paymentLinkId);
        boolean paymentSuccess = paymentService.processPaymentOrder(paymentOrder, paymentId, paymentLinkId);
        if (paymentSuccess) {
            for (Order order : paymentOrder.getOrders()) {
                transactionService.createTransaction(order);
                Seller seller = sellerService.getSellerById(order.getSellerId());
                SellerReport sellerReport = sellerReportService.getSellerReport(seller);
                sellerReport.setTotalOrders(sellerReport.getTotalOrders() + 1);
                sellerReport.setTotalEarnings(sellerReport.getTotalEarnings() + order.getTotalSellingPrice());
                sellerReport.setTotalSales(sellerReport.getTotalSales() + order.getOrderItems().size());
                sellerReportService.updateSellerReport(sellerReport);
            }
        }

        ApiResponse res = new ApiResponse("Payment Success");
        return new ResponseEntity<>(res, HttpStatus.OK);
    }
}


