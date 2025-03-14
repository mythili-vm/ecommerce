package com.magizh.tech.ecommerce.repos;

import com.magizh.tech.ecommerce.entity.Address;
import org.springframework.data.jpa.repository.JpaRepository;

public interface AddressRepository extends JpaRepository<Address,Long> {
}
