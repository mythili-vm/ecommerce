package com.magizh.tech.ecommerce.service.impl;

import com.magizh.tech.ecommerce.entity.Category;
import com.magizh.tech.ecommerce.model.CategoryDTO;
import com.magizh.tech.ecommerce.repos.CategoryRepository;
import com.magizh.tech.ecommerce.service.CategoryService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
@RequiredArgsConstructor
public class CategoryServiceImpl implements CategoryService {

    private final CategoryRepository categoryRepository;

    @Override
    public List<CategoryDTO> findAll() {
        List<Category> categories = categoryRepository.findAll();
        Map<Long, CategoryDTO> categoryMap = new HashMap<>();

        // Convert to DTO and store in map
        for (Category cat : categories) {
            categoryMap.put(cat.getId(), new CategoryDTO(cat.getId(), cat.getName(), cat.getLevel(), cat.getCategoryId()));
        }

        List<CategoryDTO> rootCategories = new ArrayList<>();

        // Build parent-child relationship
        for (Category cat : categories) {
            if (cat.getParentCategory() != null) {
                CategoryDTO parent = categoryMap.get(cat.getParentCategory().getId());
                if (parent != null) {
                    parent.addSubcategory(categoryMap.get(cat.getId()));
                }
            } else {
                rootCategories.add(categoryMap.get(cat.getId()));
            }
        }

        return rootCategories;
    }

    @Override
    public List<Category> findByLevel(int level) {
        return categoryRepository.findByLevel(level);
    }

    @Override
    public List<Category> findAllFlatCategories() {
        return categoryRepository.findAll();
    }

    @Override
    public List<Category> addCategory(Category category) {
        categoryRepository.save(category);
        return findAllFlatCategories();
    }
}
