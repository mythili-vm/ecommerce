package com.magizh.tech.ecommerce.service.impl;

import com.magizh.tech.ecommerce.entity.Seller;
import com.magizh.tech.ecommerce.entity.SellerReport;
import com.magizh.tech.ecommerce.repos.SellerReportRepository;
import com.magizh.tech.ecommerce.service.SellerReportService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import static java.util.Objects.isNull;

@Service
@RequiredArgsConstructor
public class SellerReportServiceImpl implements SellerReportService {
    private final SellerReportRepository sellerReportRepository;

    @Override
    public SellerReport getSellerReport(Seller seller) {
        SellerReport sellerReport = sellerReportRepository.findBySellerId(seller.getId());

        if (isNull(sellerReport)) {
            SellerReport newReport = new SellerReport();
            newReport.setSeller(seller);
            return sellerReportRepository.saveAndFlush(newReport);
        }
        return sellerReport;
    }

    @Override
    public SellerReport updateSellerReport(SellerReport sellerReport) {

        return sellerReportRepository.saveAndFlush(sellerReport);
    }
}
