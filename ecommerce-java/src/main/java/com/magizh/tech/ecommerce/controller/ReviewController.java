package com.magizh.tech.ecommerce.controller;

import com.magizh.tech.ecommerce.entity.Product;
import com.magizh.tech.ecommerce.entity.Review;
import com.magizh.tech.ecommerce.entity.User;
import com.magizh.tech.ecommerce.request.CreateReviewRequest;
import com.magizh.tech.ecommerce.response.ApiResponse;
import com.magizh.tech.ecommerce.service.ProductService;
import com.magizh.tech.ecommerce.service.ReviewService;
import com.magizh.tech.ecommerce.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api")
public class ReviewController {
    private final ReviewService reviewService;
    private final UserService userService;
    private final ProductService productService;

    @GetMapping("/products/{productId}/reviews")
    public ResponseEntity<List<Review>> getReviewByProductId(@PathVariable Long productId) {
        List<Review> reviews = reviewService.getReviewByProductId(productId);
        return ResponseEntity.ok(reviews);
    }

    @PostMapping("/products/{productId}/reviews")
    public ResponseEntity<Review> writeReview(
            @RequestBody CreateReviewRequest request,
            @PathVariable Long productId,
            @RequestHeader("Authorization") String jwt
    ) throws Exception {
        User user = userService.findUserByJwtToken(jwt);
        Product product = productService.findByProductId(productId);
        Review review = reviewService.createReview(request, user, product);
        return ResponseEntity.ok(review);
    }

    @PatchMapping("/reviews/{reviewId}")
    public ResponseEntity<Review> updateReview(
            @RequestBody CreateReviewRequest request,
            @PathVariable Long reviewId,
            @RequestHeader("Authorization") String jwt
    ) throws Exception {
        User user = userService.findUserByJwtToken(jwt);
        Review review = reviewService.updateReview(reviewId, request.getReviewText(), request.getReviewRating(), user.getId());
        return ResponseEntity.ok(review);
    }

    @DeleteMapping("/review/{reviewId}")
    public ResponseEntity<ApiResponse> deleteReview(
            @PathVariable Long reviewId,
            @RequestHeader("Authorization") String jwt
    ) throws Exception {
        User user = userService.findUserByJwtToken(jwt);
        reviewService.deleteReview(reviewId, user.getId());
        ApiResponse apiResponse = new ApiResponse("Review deleted successfully");
        return ResponseEntity.ok(apiResponse);
    }
}
