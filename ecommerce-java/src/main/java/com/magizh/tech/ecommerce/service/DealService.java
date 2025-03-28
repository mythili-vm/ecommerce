package com.magizh.tech.ecommerce.service;

import com.magizh.tech.ecommerce.entity.Deal;

import java.util.List;

public interface DealService {
    List<Deal> getDeals();

    Deal createDeal(Deal deal);

    Deal updateDeal(Deal deal, Long id) throws Exception;

    void deleteDeal(Long id) throws Exception;

    Deal findById(Long id) throws Exception;
}
