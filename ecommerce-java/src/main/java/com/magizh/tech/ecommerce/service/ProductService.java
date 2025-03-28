package com.magizh.tech.ecommerce.service;

import com.magizh.tech.ecommerce.entity.Product;
import com.magizh.tech.ecommerce.entity.Seller;
import com.magizh.tech.ecommerce.exception.ProductException;
import com.magizh.tech.ecommerce.request.CreateProductRequest;
import org.springframework.data.domain.Page;

import java.util.List;

public interface ProductService {

    Product createProduct(CreateProductRequest req, Seller seller);

    void deleteProduct(Long productId) throws ProductException;

    Product updateProduct(Long productId, Product product) throws ProductException;

    Product findByProductId(Long productId) throws ProductException;

    List<Product> searchProducts(String query);

    Page<Product> getAllProducts(
            String category, String brand, String color, String size,
            Integer maxPrice, Integer minPrice, Integer minDiscount, String sort, String stock,
            Integer pageNumber
    );

    List<Product> getProductBySellerId(Long sellerId);


}
