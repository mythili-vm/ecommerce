package com.magizh.tech.ecommerce.repos;

import com.magizh.tech.ecommerce.entity.Review;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ReviewRepository extends JpaRepository<Review,Long> {
    List<Review> findByProductId(Long productId);
}
