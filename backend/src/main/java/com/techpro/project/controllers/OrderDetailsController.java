package com.techpro.project.controllers;

import com.techpro.project.entity.Order;
import com.techpro.project.entity.OrderDetails;
import com.techpro.project.service.OrderDetailsService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/orderdetails")
@CrossOrigin
public class OrderDetailsController {
    private final OrderDetailsService orderDetailsService;

    @Autowired
    public OrderDetailsController(OrderDetailsService orderDetailsService) {
        this.orderDetailsService = orderDetailsService;
    }

    @GetMapping
    public ResponseEntity<List<OrderDetails>> getAllOrderDetails() {
        // Get all order details from the order details service
        List<OrderDetails> orderDetailsList = orderDetailsService.getAllOrderDetails();
        return new ResponseEntity<>(orderDetailsList, HttpStatus.OK);
    }

    @GetMapping("/{id}")
    public ResponseEntity<OrderDetails> getOrderDetailsById(@PathVariable("id") Long id) {
        // Get order details by its ID from the order details service
        Optional<OrderDetails> orderDetails = orderDetailsService.getOrderDetailsById(id);
        return orderDetails.map(value -> new ResponseEntity<>(value, HttpStatus.OK))
                .orElseGet(() -> new ResponseEntity<>(HttpStatus.NOT_FOUND));
    }

    @GetMapping("/order/{orderId}")
    public ResponseEntity<List<OrderDetails>> getOrderDetailsByOrderId(@PathVariable("orderId") Long orderId) {
        // Get order details associated with a specific order ID
        List<OrderDetails> orderDetails = orderDetailsService.getOrderDetailsByOrderId(orderId);
        return new ResponseEntity<>(orderDetails, HttpStatus.OK);
    }

    @PostMapping
    public ResponseEntity<OrderDetails> createOrderDetails(@RequestBody OrderDetails orderDetails) {
        // Create new order details
        OrderDetails createdOrderDetails = orderDetailsService.createOrderDetails(orderDetails);
        return new ResponseEntity<>(createdOrderDetails, HttpStatus.CREATED);
    }

    @PutMapping("/{id}")
    public ResponseEntity<OrderDetails> updateOrderDetails(@PathVariable("id") Long id, @RequestBody OrderDetails orderDetails) {
        // Update existing order details with the provided order details data
        Optional<OrderDetails> existingOrderDetails = orderDetailsService.getOrderDetailsById(id);
        if (existingOrderDetails.isPresent()) {
            OrderDetails updatedOrderDetails = orderDetailsService.updateOrderDetails(id, orderDetails);
            return new ResponseEntity<>(updatedOrderDetails, HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @DeleteMapping("/delete-by-order-id/{orderId}")
    public void deleteOrderDetailsByOrderId(@PathVariable Long orderId) {
        // Delete order details associated with a specific order ID
        orderDetailsService.deleteOrderDetailsByOrderId(orderId);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteOrderDetails(@PathVariable("id") Long id) {
        // Delete order details by its ID
        Optional<OrderDetails> existingOrderDetails = orderDetailsService.getOrderDetailsById(id);
        if (existingOrderDetails.isPresent()) {
            orderDetailsService.deleteOrderDetails(id);
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }
}
