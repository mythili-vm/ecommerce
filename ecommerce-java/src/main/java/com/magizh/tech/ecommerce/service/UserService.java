package com.magizh.tech.ecommerce.service;

import com.magizh.tech.ecommerce.entity.User;

public interface UserService {

    User findUserByEmail(String email) throws Exception;

    User findUserByJwtToken(String token) throws Exception;
}
