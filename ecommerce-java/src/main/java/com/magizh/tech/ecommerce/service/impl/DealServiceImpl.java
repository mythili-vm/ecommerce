package com.magizh.tech.ecommerce.service.impl;

import com.magizh.tech.ecommerce.entity.Deal;
import com.magizh.tech.ecommerce.entity.HomeCategory;
import com.magizh.tech.ecommerce.repos.DealRepository;
import com.magizh.tech.ecommerce.repos.HomeCategoryRepository;
import com.magizh.tech.ecommerce.service.DealService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

import static java.util.Objects.isNull;

@Service
@RequiredArgsConstructor
public class DealServiceImpl implements DealService {

    private final DealRepository dealRepository;
    private final HomeCategoryRepository homeCategoryRepository;

    @Override
    public List<Deal> getDeals() {
        return dealRepository.findAll();
    }

    @Override
    public Deal createDeal(Deal deal) {
        HomeCategory category = homeCategoryRepository.findById(deal.getCategory().getId()).orElse(null);
        Deal newDeal = dealRepository.saveAndFlush(deal);
        newDeal.setCategory(category);
        newDeal.setDiscount(deal.getDiscount());
        return dealRepository.saveAndFlush(newDeal);
    }

    @Override
    public Deal updateDeal(Deal deal, Long id) throws Exception {
        Deal existingDeal = findById(id);
        HomeCategory category = homeCategoryRepository.findById(deal.getCategory().getId()).orElse(null);

        if (!isNull(deal.getDiscount())) {
            existingDeal.setDiscount(deal.getDiscount());
        }

        if (!isNull(category)) {
            existingDeal.setCategory(category);
        }
        return dealRepository.saveAndFlush(deal);
    }

    @Override
    public void deleteDeal(Long id) throws Exception {
        Deal deal = findById(id);
        dealRepository.delete(deal);
    }

    @Override
    public Deal findById(Long id) throws Exception {
        return dealRepository.findById(id).orElseThrow(() -> new Exception("Deal not found"));
    }
}
