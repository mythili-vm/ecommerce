package com.magizh.tech.ecommerce.service;

import com.magizh.tech.ecommerce.entity.HomeCategory;
import com.magizh.tech.ecommerce.model.Home;

import java.util.List;

public interface HomeService {

    Home createHomePage(List<HomeCategory> allCategories);

    Home getHomeCategories(List<HomeCategory> categories);
}
