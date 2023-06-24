package com.techpro.project.repository;

import com.techpro.project.entity.Order;
import com.techpro.project.entity.OrderDetails;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface OrderDetailsRepository extends JpaRepository<OrderDetails , Long> {
    List<OrderDetails> findByOrderId_OrderId(Long orderId);

}
