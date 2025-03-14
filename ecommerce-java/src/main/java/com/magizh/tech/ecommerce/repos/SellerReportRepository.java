package com.magizh.tech.ecommerce.repos;

import com.magizh.tech.ecommerce.entity.SellerReport;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface SellerReportRepository extends JpaRepository<SellerReport, Long> {
    SellerReport findBySellerId(Long id);
}
