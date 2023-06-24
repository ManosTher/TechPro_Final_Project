package com.techpro.project.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import com.techpro.project.entity.Order;
import com.techpro.project.repository.OrderRepository;

@Component
public class ServiceorderImpl implements Serviceorder{

    @Autowired
    private OrderRepository orderRepository;

    @Override
    public Order saveOrder(Order order) {

        return orderRepository.save(order);
    }

    @Override
    public Order readOrder(int id){
        return null;
    }

}
