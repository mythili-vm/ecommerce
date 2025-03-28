package com.magizh.tech.ecommerce.entity;

import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDate;
import java.util.HashSet;
import java.util.Set;

@Getter
@Setter
@Entity
@AllArgsConstructor
@NoArgsConstructor
@EqualsAndHashCode
public class Coupon {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String code;

    private double discountPercentage;
    private LocalDate validityStartDate;
    private LocalDate validityEndDate;

    private double minimumOrderValue;
    private boolean isActive=true;

    @ManyToMany
    private Set<User> usedByUsers=new HashSet<>();
}
