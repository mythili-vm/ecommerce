package com.magizh.tech.ecommerce.controller;

import com.magizh.tech.ecommerce.entity.Deal;
import com.magizh.tech.ecommerce.response.ApiResponse;
import com.magizh.tech.ecommerce.service.DealService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/admin/deals")
public class DealController {

    private final DealService dealService;


    @PostMapping
    public ResponseEntity<Deal> createDeals(
            @RequestBody Deal deal
    ) {
        Deal createdDeals = dealService.createDeal(deal);
        return ResponseEntity.ok(createdDeals);
    }

    @PatchMapping("/{id}")
    public ResponseEntity<Deal> updateDeals(
            @PathVariable Long id,
            @RequestBody Deal deal
    ) throws Exception {
        Deal updatedDeal = dealService.updateDeal(deal, id);
        return ResponseEntity.ok(updatedDeal);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<ApiResponse> deleteDeal(
            @PathVariable Long id
    ) throws Exception {
        dealService.deleteDeal(id);
        return ResponseEntity.ok(new ApiResponse("Deal deleted!"));
    }


    @GetMapping
    public ResponseEntity<List<Deal>> getDeals(){
        List<Deal> deals=dealService.getDeals();
        return ResponseEntity.ok(deals);

    }

}
