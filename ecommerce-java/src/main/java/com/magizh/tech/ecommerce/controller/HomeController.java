package com.magizh.tech.ecommerce.controller;

import com.magizh.tech.ecommerce.response.ApiResponse;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class HomeController {

    @GetMapping
    public ApiResponse HomeControllerHandler() {
        return new ApiResponse("Welcome to Magizh Tech Ecommerce!!");
    }
}
