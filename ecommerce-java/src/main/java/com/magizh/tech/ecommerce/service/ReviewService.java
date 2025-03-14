package com.magizh.tech.ecommerce.service;

import com.magizh.tech.ecommerce.entity.Product;
import com.magizh.tech.ecommerce.entity.Review;
import com.magizh.tech.ecommerce.entity.User;
import com.magizh.tech.ecommerce.request.CreateReviewRequest;

import java.util.List;

public interface ReviewService {

    Review createReview(CreateReviewRequest req, User user, Product product);
    List<Review> getReviewByProductId(Long productId);
    Review updateReview(Long reviewId,String reviewText,double rating,Long userId) throws Exception;
    Review getReviewById(Long reviewId);
    void deleteReview(Long reviewId,Long userId) throws Exception;
}
