package com.magizh.tech.ecommerce.controller;

import com.magizh.tech.ecommerce.entity.HomeCategory;
import com.magizh.tech.ecommerce.model.Home;
import com.magizh.tech.ecommerce.service.HomeCategoryService;
import com.magizh.tech.ecommerce.service.HomeService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
public class HomeCategoryController {
    private final HomeCategoryService homeCategoryService;
    private final HomeService homeService;

    @PostMapping("/home/categories")
    public ResponseEntity<Home> createHomeCategories(@RequestBody List<HomeCategory> homeCategoryList) {
        List<HomeCategory> categories = homeCategoryService.createCategories(homeCategoryList);
        Home home = homeService.createHomePage(categories);
        return ResponseEntity.ok(home);
    }

    @GetMapping("/admin/home-category/{id}")
    public ResponseEntity<List<HomeCategory>> getHomeCategory() {
        List<HomeCategory> categories = homeCategoryService.getAllHomeCategories();
        return ResponseEntity.ok(categories);
    }

    @PatchMapping("/admin/home-category/{id}")
    public ResponseEntity<HomeCategory> updateHomeCategory(@PathVariable Long id, @RequestBody HomeCategory homeCategory) throws Exception {
        HomeCategory updateHomeCategory = homeCategoryService.updateHomeCategory(homeCategory, id);
        return ResponseEntity.ok(updateHomeCategory);
    }
}
