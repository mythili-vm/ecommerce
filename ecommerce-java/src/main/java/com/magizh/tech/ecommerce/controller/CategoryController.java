package com.magizh.tech.ecommerce.controller;

import com.magizh.tech.ecommerce.entity.Category;
import com.magizh.tech.ecommerce.model.CategoryDTO;
import com.magizh.tech.ecommerce.service.CategoryService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
@RestController
@RequestMapping("/home")
@RequiredArgsConstructor
public class CategoryController {

    private final CategoryService categoryService;

    @GetMapping("/categories")
    public ResponseEntity<List<CategoryDTO>> getAllCategories() {
        return ResponseEntity.ok(categoryService.findAll());
    }

    @GetMapping("level-three")
    public ResponseEntity<List<Category>> getLevelThreeCategories(){
        int level=3;
        return ResponseEntity.ok(categoryService.findByLevel(level));
    }

    @GetMapping("/flat-categories")
    public ResponseEntity<List<Category>> getAllFlatCategories() {
        return ResponseEntity.ok(categoryService.findAllFlatCategories());
    }

    @PostMapping("/add-category")
    public ResponseEntity<List<Category>> addCategory(@RequestBody Category category){
        return ResponseEntity.ok(categoryService.addCategory(category));
    }

}
