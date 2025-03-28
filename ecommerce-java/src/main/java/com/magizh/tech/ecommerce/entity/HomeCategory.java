package com.magizh.tech.ecommerce.entity;

import com.magizh.tech.ecommerce.enums.HomeCategorySection;
import jakarta.persistence.*;
import lombok.*;

@Getter
@Setter
@Entity
@AllArgsConstructor
@NoArgsConstructor
@EqualsAndHashCode
public class HomeCategory {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @ManyToOne
    private Product product;
    private HomeCategorySection section;

}
