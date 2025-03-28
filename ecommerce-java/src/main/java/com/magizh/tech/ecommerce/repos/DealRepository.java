package com.magizh.tech.ecommerce.repos;

import com.magizh.tech.ecommerce.entity.Deal;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface DealRepository extends JpaRepository<Deal, Long> {
}
