package com.magizh.tech.ecommerce.service;

import com.magizh.tech.ecommerce.entity.Order;
import com.magizh.tech.ecommerce.entity.Seller;
import com.magizh.tech.ecommerce.entity.Transaction;
import com.magizh.tech.ecommerce.exception.SellerException;

import java.util.List;

public interface TransactionService {
    Transaction createTransaction(Order order) throws SellerException;
    List<Transaction> getTransactionBySellerId(Seller seller);
    List<Transaction> getAllTransactions();
}
