package com.magizh.tech.ecommerce.service.impl;

import com.magizh.tech.ecommerce.entity.HomeCategory;
import com.magizh.tech.ecommerce.repos.HomeCategoryRepository;
import com.magizh.tech.ecommerce.service.HomeCategoryService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class HomeCategoryServiceImpl implements HomeCategoryService {

    private final HomeCategoryRepository homeCategoryRepository;

    @Override
    public List<HomeCategory> createHomeCategory(List<HomeCategory> homeCategory) {
        homeCategoryRepository.saveAll(homeCategory);
        return homeCategoryRepository.findAll();
    }

    @Override
    public List<HomeCategory> createCategories(List<HomeCategory> homeCategoryList) {
        if (homeCategoryRepository.findAll().isEmpty()) {
            return homeCategoryRepository.saveAll(homeCategoryList);
        }
        return homeCategoryRepository.findAll();
    }

    @Override
    public HomeCategory updateHomeCategory(HomeCategory homeCategory, Long id) throws Exception {
        HomeCategory existingCategory = homeCategoryRepository.findById(id)
                .orElseThrow(() -> new Exception("Category not found"));
        existingCategory.setProduct(homeCategory.getProduct());
        existingCategory.setSection(homeCategory.getSection());
        return homeCategoryRepository.saveAndFlush(existingCategory);
    }

    @Override
    public List<HomeCategory> getAllHomeCategories() {
        return homeCategoryRepository.findAll();
    }
}
