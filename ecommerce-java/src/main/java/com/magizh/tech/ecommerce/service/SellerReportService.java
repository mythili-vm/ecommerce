package com.magizh.tech.ecommerce.service;

import com.magizh.tech.ecommerce.entity.Seller;
import com.magizh.tech.ecommerce.entity.SellerReport;

public interface SellerReportService {

    SellerReport getSellerReport(Seller seller);

    SellerReport updateSellerReport(SellerReport sellerReport);
}
