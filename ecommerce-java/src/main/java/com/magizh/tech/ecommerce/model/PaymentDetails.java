package com.magizh.tech.ecommerce.model;

import com.magizh.tech.ecommerce.enums.PaymentStatus;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class PaymentDetails {

    private String paymentId;

    private String razorpayPaymentLinkId;
    private String razorpayPaymentLinkReferenceId;

    private String razorpayPaymentLinkStatus;
    private String razorpayPaymentIdZWSP;
    private PaymentStatus status;
}
