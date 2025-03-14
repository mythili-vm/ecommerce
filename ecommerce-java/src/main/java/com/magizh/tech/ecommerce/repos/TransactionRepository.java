package com.magizh.tech.ecommerce.repos;

import com.magizh.tech.ecommerce.entity.Transaction;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface TransactionRepository extends JpaRepository<Transaction, Long> {
    List<Transaction> findBySellerId(Long id);
}
