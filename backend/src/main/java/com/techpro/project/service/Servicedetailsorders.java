package com.techpro.project.service;

import com.techpro.project.entity.Order;
import com.techpro.project.entity.OrderDetails;
import org.jvnet.hk2.annotations.Service;

@Service
public interface Servicedetailsorders {
    OrderDetails saveOrderDetails(OrderDetails orderdetails);

    // Read operation
    OrderDetails readOrderDetails(int id);
}
