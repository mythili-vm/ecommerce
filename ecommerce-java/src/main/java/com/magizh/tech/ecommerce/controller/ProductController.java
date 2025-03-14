package com.magizh.tech.ecommerce.controller;

import com.magizh.tech.ecommerce.entity.Product;
import com.magizh.tech.ecommerce.exception.ProductException;
import com.magizh.tech.ecommerce.service.ProductService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/products")
public class ProductController {

    private final ProductService productService;

    @GetMapping("/{productId}")
    public ResponseEntity<Product> getProductById(@PathVariable Long productId) throws ProductException {
        Product product = productService.findByProductId(productId);
        return new ResponseEntity<>(product, HttpStatus.OK);
    }

    @GetMapping("/{search}")
    public ResponseEntity<List<Product>> searchProduct(@RequestParam(required = false) String query) throws ProductException {
        List<Product> product = productService.searchProducts(query);
        return new ResponseEntity<>(product, HttpStatus.OK);
    }

    @GetMapping
    public ResponseEntity<Page<Product>> getAllProducts(@RequestParam(required = false) String category,
                                                        @RequestParam(required = false) String brand,
                                                        @RequestParam(required = false) String color,
                                                        @RequestParam(required = false) String size,
                                                        @RequestParam(required = false) Integer minPrice,
                                                        @RequestParam(required = false) Integer maxPrice,
                                                        @RequestParam(required = false) Integer minDiscount,
                                                        @RequestParam(required = false) String sort,
                                                        @RequestParam(required = false) String stock,
                                                        @RequestParam(defaultValue = "0") Integer pageNumber) {

        return new ResponseEntity<>(productService.getAllProducts(category, brand, color, size, maxPrice, minPrice, minDiscount, sort, stock, pageNumber), HttpStatus.OK);
    }


}
