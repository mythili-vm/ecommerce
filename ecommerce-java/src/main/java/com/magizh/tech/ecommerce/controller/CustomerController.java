package com.magizh.tech.ecommerce.controller;

import com.magizh.tech.ecommerce.entity.HomeCategory;
import com.magizh.tech.ecommerce.model.Home;
import com.magizh.tech.ecommerce.service.HomeCategoryService;
import com.magizh.tech.ecommerce.service.HomeService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequiredArgsConstructor
public class CustomerController {
    private final HomeCategoryService homeCategoryService;
    private final HomeService homeService;

    @PostMapping("/home/categories")
    public ResponseEntity<Home> createHomeCategories(
            @RequestBody List<HomeCategory> homeCategories
            ){
        List<HomeCategory> categories=homeCategoryService.createHomeCategory(homeCategories);
        Home home=homeService.createHomePage(categories);
        return ResponseEntity.ok(home);
    }

    @GetMapping("/home-categories")
    public ResponseEntity<Home> getHomeCategories() {
        List<HomeCategory> categories = homeCategoryService.getAllHomeCategories();
        Home home=homeService.getHomeCategories(categories);
        return ResponseEntity.ok(home);
    }
}
