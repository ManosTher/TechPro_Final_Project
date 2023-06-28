package com.techpro.project.service;

import com.techpro.project.entity.OrderDetails;
import com.techpro.project.repository.OrderDetailsRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Service
public class OrderDetailsService {
    private final OrderDetailsRepository orderDetailsRepository;

    @Autowired
    public OrderDetailsService(OrderDetailsRepository orderDetailsRepository) {
        this.orderDetailsRepository = orderDetailsRepository;
    }

    // Retrieve all order details
    public List<OrderDetails> getAllOrderDetails() {
        return orderDetailsRepository.findAll();
    }

    // Retrieve order details by ID
    public Optional<OrderDetails> getOrderDetailsById(Long id) {
        return orderDetailsRepository.findById(id);
    }

    // Create a new order details
    public OrderDetails createOrderDetails(OrderDetails orderDetails) {
        return orderDetailsRepository.save(orderDetails);
    }

    // Update an existing order details
    public OrderDetails updateOrderDetails(Long id, OrderDetails orderDetails) {
        orderDetails.setOrderDetailsId(id);
        return orderDetailsRepository.save(orderDetails);
    }

    // Delete an order details
    public void deleteOrderDetails(Long id) {
        orderDetailsRepository.deleteById(id);
    }

    // Retrieve order details by order ID
    public List<OrderDetails> getOrderDetailsByOrderId(Long orderId) {
        return orderDetailsRepository.findByOrderId_OrderId(orderId);
    }

    // Delete order details by order ID
    @Transactional
    public void deleteOrderDetailsByOrderId(Long orderId) {
        List<OrderDetails> orderDetails = orderDetailsRepository.findByOrderId_OrderId(orderId);
        if (!orderDetails.isEmpty()) {
            orderDetailsRepository.deleteAll(orderDetails);
        }
    }

    /* public Optional<OrderDetails> findOrderDetailsByPersonId(Long personId) {
        return orderDetailsRepository.findOrderDetailsByPersonId(personId);
    }*/
}
