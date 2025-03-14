package com.magizh.tech.ecommerce.service.impl;

import com.magizh.tech.ecommerce.entity.HomeCategory;
import com.magizh.tech.ecommerce.repos.HomeCategoryRepository;
import com.magizh.tech.ecommerce.service.HomeCategoryService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Objects;

import static java.util.Objects.isNull;

@Service
@RequiredArgsConstructor
public class HomeCategoryServiceImpl implements HomeCategoryService {

    private final HomeCategoryRepository homeCategoryRepository;

    @Override
    public HomeCategory createHomeCategory(HomeCategory homeCategory) {
        return homeCategoryRepository.saveAndFlush(homeCategory);
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
        if (!isNull(homeCategory.getImage())) {
            existingCategory.setImage(homeCategory.getImage());
        }
        if (!isNull(homeCategory.getCategoryId())) {
            existingCategory.setCategoryId(homeCategory.getCategoryId());
        }
        return homeCategoryRepository.saveAndFlush(existingCategory);
    }

    @Override
    public List<HomeCategory> getAllHomeCategories() {
        return homeCategoryRepository.findAll();
    }
}
