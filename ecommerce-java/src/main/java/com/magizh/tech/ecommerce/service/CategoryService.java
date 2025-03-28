package com.magizh.tech.ecommerce.service;

import com.magizh.tech.ecommerce.entity.Category;
import com.magizh.tech.ecommerce.model.CategoryDTO;

import java.util.List;

public interface CategoryService {
    List<CategoryDTO> findAll();

    List<Category> findByLevel(int level);

    List<Category> findAllFlatCategories();

    List<Category> addCategory(Category category);
}
