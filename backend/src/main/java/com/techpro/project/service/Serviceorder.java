package com.techpro.project.service;

import com.techpro.project.entity.Order;
import org.jvnet.hk2.annotations.Service;

@Service
public interface Serviceorder {
    Order saveOrder(Order order);

    // Read operation
    Order readOrder(int id);
}
