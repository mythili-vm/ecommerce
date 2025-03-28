package com.magizh.tech.ecommerce.model;

import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.ArrayList;
import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class CategoryDTO {

    private Long id;
    private String name;
    private Integer level;
    private String categoryId;
    private List<CategoryDTO> subcategories = new ArrayList<>();

    public CategoryDTO(Long id, String name, Integer level, String categoryId) {
        this.id = id;
        this.name = name;
        this.level = level;
        this.categoryId = categoryId;
    }


    public void addSubcategory(CategoryDTO subcategory) {
        this.subcategories.add(subcategory);
    }

}