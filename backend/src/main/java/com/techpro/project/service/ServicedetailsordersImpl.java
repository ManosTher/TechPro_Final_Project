package com.techpro.project.service;


import com.techpro.project.entity.OrderDetails;
import com.techpro.project.repository.OrderDetailsRepository;
import org.springframework.beans.factory.annotation.Autowired;

public class ServicedetailsordersImpl implements Servicedetailsorders {

    @Autowired
    private OrderDetailsRepository orderDetailsRepository;

    @Override
    public OrderDetails saveOrderDetails(OrderDetails orderDetails) {
        return orderDetailsRepository.save(orderDetails);
    }

    @Override
    public OrderDetails readOrderDetails(int id){
        return null;
    }
}
