package com.magizh.tech.ecommerce.service.impl;

import com.magizh.tech.ecommerce.entity.Category;
import com.magizh.tech.ecommerce.entity.Product;
import com.magizh.tech.ecommerce.entity.Seller;
import com.magizh.tech.ecommerce.exception.ProductException;
import com.magizh.tech.ecommerce.repos.CategoryRepository;
import com.magizh.tech.ecommerce.repos.ProductRepository;
import com.magizh.tech.ecommerce.request.CreateProductRequest;
import com.magizh.tech.ecommerce.service.ProductService;
import jakarta.persistence.criteria.Join;
import jakarta.persistence.criteria.Predicate;
import lombok.NonNull;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import static java.util.Objects.isNull;

@Service
@RequiredArgsConstructor
public class ProductServiceImpl implements ProductService {

    private final ProductRepository productRepository;
    private final CategoryRepository categoryRepository;

    @Override
    public Product createProduct(CreateProductRequest req, Seller seller) {
        Optional<Category> category1 = categoryRepository.findByCategoryId(req.getCategory());
        if (category1.isEmpty()) {
            Category category = new Category();
            category.setCategoryId(req.getCategory());
            category.setLevel(1);
            category1 = Optional.of(categoryRepository.saveAndFlush(category));
        }

        Optional<Category> category2 = categoryRepository.findByCategoryId(req.getCategory2());
        if (category2.isEmpty()) {
            Category category = new Category();
            category.setCategoryId(req.getCategory2());
            category.setLevel(2);
            category.setParentCategory(category1.get());
            category2 = Optional.of(categoryRepository.saveAndFlush(category));
        }


        Optional<Category> category3 = categoryRepository.findByCategoryId(req.getCategory3());
        if (category3.isEmpty()) {
            Category category = new Category();
            category.setCategoryId(req.getCategory3());
            category.setLevel(3);
            category.setParentCategory(category2.get());
            category3 = Optional.of(categoryRepository.saveAndFlush(category));
        }

        int discountPercent = calculateDiscountPercent(req.getMrpPrice(), req.getSellingPrice());

        Product product = new Product();
        product.setSeller(seller);
        product.setCategory(category3.get());
        product.setDescription(req.getDescription());
        product.setCreatedAt(LocalDateTime.now());
        product.setTitle(req.getTitle());
        product.setColor(req.getColor());
        product.setSellingPrice(req.getSellingPrice());
        product.setMrpPrice(req.getMrpPrice());
        product.setSizes(req.getSizes());
        product.setDiscountPercent(discountPercent);
        product.setImages(req.getImages());
        return productRepository.saveAndFlush(product);
    }

    private int calculateDiscountPercent(int mrpPrice, int sellingPrice) {
        if (mrpPrice < 0) {
            throw new IllegalArgumentException("Actual price must be greater than 0");
        }
        double discount = mrpPrice - sellingPrice;
        double discountPercentage = (discount / mrpPrice) * 100;
        return (int) discountPercentage;
    }

    @Override
    public void deleteProduct(Long productId) throws ProductException {
        Product product = findByProductId(productId);
        productRepository.delete(product);

    }

    @Override
    public Product updateProduct(Long productId, Product product) throws ProductException {
        findByProductId(productId);
        product.setId(productId);
        return productRepository.saveAndFlush(product);
    }

    @Override
    public Product findByProductId(Long productId) throws ProductException {
        return productRepository.findById(productId).orElseThrow(() -> new ProductException("Product not found"));
    }

    @Override
    public List<Product> searchProducts(String query) {
        if(!isNull(query)) {
            return productRepository.searchProduct(query);
        }else{
            return productRepository.findAll();
        }
    }

    @Override
    public Page<Product> getAllProducts(String category, String brand, String color, String size,
                                        Integer maxPrice, Integer minPrice, Integer minDiscount, String sort, String stock,
                                        Integer pageNumber) {
        Specification<Product> spec = (root, query, criteriaBuilder) -> {
            List<Predicate> predicates = new ArrayList<>();
            if (!isNull(category)) {
                Join<Product, Category> categoryJoin = root.join("category");
                predicates.add(criteriaBuilder.equal(categoryJoin.get("categoryId"), category));
            }

            if (!isNull(brand) && !brand.isEmpty()) {
                predicates.add(criteriaBuilder.equal(root.get("brand"), brand));
            }

            if (!isNull(color) && !color.isEmpty()) {
                predicates.add(criteriaBuilder.equal(root.get("color"), color));
            }
            //Filter by size
            if (!isNull(size) && !size.isEmpty()) {
                predicates.add(criteriaBuilder.equal(root.get("size"), size));
            }
            if (!isNull(minPrice)) {
                predicates.add(criteriaBuilder.greaterThanOrEqualTo(root.get("sellingPrice"), minPrice));
            }

            if (!isNull(maxPrice)) {
                predicates.add(criteriaBuilder.lessThanOrEqualTo(root.get("sellingPrice"), maxPrice));
            }

            if (!isNull(minDiscount)) {
                predicates.add(criteriaBuilder.greaterThanOrEqualTo(root.get("discountPercent"), minDiscount));
            }

            if (!isNull(stock)) {
                predicates.add(criteriaBuilder.equal(root.get("stock"), stock));
            }

            return criteriaBuilder.and(predicates.toArray(new Predicate[0]));

        };
        Pageable pageable;
        if (!isNull(sort) && !sort.isEmpty()) {
            switch (sort) {
                case "price_low":
                    pageable = PageRequest.of(!isNull(pageNumber) ? pageNumber : 0, 10, Sort.by("sellingPrice").ascending());
                    break;
                case "price_high":
                    pageable = PageRequest.of(!isNull(pageNumber) ? pageNumber : 0, 10, Sort.by("sellingPrice").descending());
                    break;
                default:
                    pageable = PageRequest.of(!isNull(pageNumber) ? pageNumber : 0, 10, Sort.unsorted());
                    break;
            }
        } else {
            pageable = PageRequest.of(!isNull(pageNumber) ? pageNumber : 0, 10, Sort.unsorted());
        }

        return productRepository.findAll(spec, pageable);
    }

    @Override
    public List<Product> getProductBySellerId(Long sellerId) {
        return productRepository.findBySellerId(sellerId);
    }
}
