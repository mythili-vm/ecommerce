package com.magizh.tech.ecommerce.repos;

import com.magizh.tech.ecommerce.entity.Order;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface OrderRepository extends JpaRepository<Order,Long> {
    List<Order> findByUserId(Long userId);

    List<Order> findBySellerId(Long userId);
}
