package com.magizh.tech.ecommerce.repos;

import com.magizh.tech.ecommerce.entity.HomeCategory;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface HomeCategoryRepository extends JpaRepository<HomeCategory, Long> {
}
