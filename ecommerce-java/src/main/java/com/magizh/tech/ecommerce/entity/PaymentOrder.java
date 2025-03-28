package com.magizh.tech.ecommerce.entity;

import com.magizh.tech.ecommerce.enums.PaymentMethod;
import com.magizh.tech.ecommerce.enums.PaymentOrderStatus;
import jakarta.persistence.*;
import lombok.*;

import java.util.HashSet;
import java.util.Set;

@Getter
@Setter
@Entity
@AllArgsConstructor
@NoArgsConstructor
@EqualsAndHashCode
public class PaymentOrder {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private Long amount;
    private PaymentOrderStatus status = PaymentOrderStatus.PENDING;

    private PaymentMethod paymentMethod;

    private String paymentLinkId;

    @ManyToOne
    private User user;

    @OneToMany
    private Set<Order> orders = new HashSet<>();
}
