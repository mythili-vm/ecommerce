package com.magizh.tech.ecommerce.entity;

import com.magizh.tech.ecommerce.enums.AccountStatus;
import com.magizh.tech.ecommerce.enums.USER_ROLE;
import com.magizh.tech.ecommerce.model.BankDetails;
import com.magizh.tech.ecommerce.model.BusinessDetails;
import jakarta.persistence.*;
import lombok.*;

@Getter
@Setter
@Entity
@AllArgsConstructor
@NoArgsConstructor
@EqualsAndHashCode
public class Seller {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String sellerName;

    private String mobile;

    @Column(unique = true,nullable = false)
    private  String email;

    private String password;

    @Embedded
    private BusinessDetails businessDetails=new BusinessDetails();

    @Embedded
    private BankDetails bankDetails=new BankDetails();

    @OneToOne(cascade = CascadeType.ALL)
    private Address pickUpAddress=new Address();

    private String GSTIN;

    private USER_ROLE role=USER_ROLE.ROLE_SELLER;

    private  boolean isEmailVerified=false;

    private AccountStatus accountStatus=AccountStatus.PENDING_VERIFICATION;
}
