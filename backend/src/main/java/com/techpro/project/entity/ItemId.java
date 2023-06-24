package com.techpro.project.entity;

import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;
@Getter
@Setter
@Entity
@Table(name = "items")
public class ItemId extends OrderDetails {
    @Id
    @GeneratedValue(strategy= GenerationType.AUTO)
    @Column(name = "ItemID")
    private int ItemId;

    public int getItemId() {
        return ItemId;
    }

    public void setItemId(int itemId) {
        ItemId = itemId;
    }
}
