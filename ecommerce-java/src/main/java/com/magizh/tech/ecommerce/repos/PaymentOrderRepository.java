package com.magizh.tech.ecommerce.repos;

import com.magizh.tech.ecommerce.entity.PaymentOrder;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface PaymentOrderRepository extends JpaRepository<PaymentOrder,Long> {

    Optional<PaymentOrder> findByPaymentLinkId(String paymentId);
}
