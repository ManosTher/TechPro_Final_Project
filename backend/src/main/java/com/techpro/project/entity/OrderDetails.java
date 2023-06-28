package com.techpro.project.entity;
import javax.persistence.*;

@Entity
@Table(name = "order_details")
public class OrderDetails {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "OrderDetailsID")
    private Long orderDetailsId;

    @ManyToOne
    @JoinColumn(name = "OrderID", nullable = false)
    private Order orderId;

    @ManyToOne
    @JoinColumn(name = "ItemID", nullable = false)
    private Item item;

    // Getters and setters

    @Column(name = "Quantity")
    private Integer quantity;

    public Order getOrderId() {
        return orderId;
    }

    public void setOrderId(Order orderId) {
        this.orderId = orderId;
    }

    public Long getOrderDetailsId() {
        return orderDetailsId;
    }

    public void setOrderDetailsId(Long orderDetailsId) {
        this.orderDetailsId = orderDetailsId;
    }


    public Item getItem() {
        return item;
    }

    public void setItem(Item item) {
        this.item = item;
    }

    public Integer getQuantity() {
        return quantity;
    }

    public void setQuantity(Integer quantity) {
        this.quantity = quantity;
    }
}