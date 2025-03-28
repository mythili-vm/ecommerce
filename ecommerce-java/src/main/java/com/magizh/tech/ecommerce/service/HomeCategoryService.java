package com.magizh.tech.ecommerce.service;

import com.magizh.tech.ecommerce.entity.HomeCategory;

import java.util.List;

public interface HomeCategoryService {

    List<HomeCategory> createHomeCategory(List<HomeCategory> homeCategory);

    List<HomeCategory> createCategories(List<HomeCategory> homeCategoryList);

    HomeCategory updateHomeCategory(HomeCategory homeCategory, Long id) throws Exception;

    List<HomeCategory> getAllHomeCategories();
}
