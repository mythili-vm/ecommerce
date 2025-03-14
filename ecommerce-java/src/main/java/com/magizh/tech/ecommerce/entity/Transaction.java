package com.magizh.tech.ecommerce.entity;

import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;

@Getter
@Setter
@Entity
@AllArgsConstructor
@NoArgsConstructor
@EqualsAndHashCode
public class Transaction {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    private User customerId;

    @OneToOne
    private  Order order;

    @ManyToOne
    private Seller seller;

    private LocalDateTime date=LocalDateTime.now();
}
