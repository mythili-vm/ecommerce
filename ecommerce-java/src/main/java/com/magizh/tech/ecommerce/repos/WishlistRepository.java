package com.magizh.tech.ecommerce.repos;

import com.magizh.tech.ecommerce.entity.User;
import com.magizh.tech.ecommerce.entity.WishList;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface WishlistRepository extends JpaRepository<WishList, Long> {
    WishList findByUserId(User userId);
}
