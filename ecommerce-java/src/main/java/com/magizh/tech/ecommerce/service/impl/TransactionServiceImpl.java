package com.magizh.tech.ecommerce.service.impl;

import com.magizh.tech.ecommerce.entity.Order;
import com.magizh.tech.ecommerce.entity.Seller;
import com.magizh.tech.ecommerce.entity.Transaction;
import com.magizh.tech.ecommerce.exception.SellerException;
import com.magizh.tech.ecommerce.repos.SellerRepository;
import com.magizh.tech.ecommerce.repos.TransactionRepository;
import com.magizh.tech.ecommerce.service.TransactionService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class TransactionServiceImpl implements TransactionService {

    private final TransactionRepository transactionRepository;
    private final SellerRepository sellerRepository;

    @Override
    public Transaction createTransaction(Order order) throws SellerException {
        Seller seller = sellerRepository.findById(order.getSellerId()).orElseThrow(() -> new SellerException("Seller not found"));
        Transaction transaction = new Transaction();
        transaction.setSeller(seller);
        transaction.setCustomerId(order.getUser());
        transaction.setOrder(order);
        return transactionRepository.saveAndFlush(transaction);
    }

    @Override
    public List<Transaction> getTransactionBySellerId(Seller seller) {
        return transactionRepository.findBySellerId(seller.getId());
    }

    @Override
    public List<Transaction> getAllTransactions() {
        return transactionRepository.findAll();
    }
}
