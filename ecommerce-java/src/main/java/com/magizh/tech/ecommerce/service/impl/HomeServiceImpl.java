package com.magizh.tech.ecommerce.service.impl;

import com.magizh.tech.ecommerce.entity.Deal;
import com.magizh.tech.ecommerce.entity.HomeCategory;
import com.magizh.tech.ecommerce.enums.HomeCategorySection;
import com.magizh.tech.ecommerce.model.Home;
import com.magizh.tech.ecommerce.repos.DealRepository;
import com.magizh.tech.ecommerce.service.HomeService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class HomeServiceImpl implements HomeService {

    private final DealRepository dealRepository;

    @Override
    public Home createHomePage(List<HomeCategory> allCategories) {
        List<HomeCategory> gridCategories = allCategories.stream().filter(homeCategory -> homeCategory.getSection() == HomeCategorySection.GRID).toList();

        List<HomeCategory> shopByCategories = allCategories.stream().filter(homeCategory -> homeCategory.getSection() == HomeCategorySection.SHOP_BY_CATEGORIES).toList();

        List<HomeCategory> electricCategories = allCategories.stream().filter(homeCategory -> homeCategory.getSection() == HomeCategorySection.ELECTRIC_CATEGORIES).toList();

        List<HomeCategory> dealCategories = allCategories.stream().filter(homeCategory -> homeCategory.getSection() == HomeCategorySection.DEALS).toList();
        List<Deal> createdDeals = new ArrayList<>();
        if (dealRepository.findAll().isEmpty()) {
            List<Deal> deals = allCategories.stream().filter(homeCategory -> homeCategory.getSection() == HomeCategorySection.DEALS).map(homeCategory -> new Deal(null, 10, homeCategory)).toList();
            createdDeals = dealRepository.saveAll(deals);
        } else
            createdDeals = dealRepository.findAll();

        Home home = new Home();
        home.setGrid(gridCategories);
        home.setShopByCategories(shopByCategories);
        home.setElectricCategories(electricCategories);
        home.setDeals(createdDeals);
        home.setDealCategories(dealCategories);
        return home;
    }
}
