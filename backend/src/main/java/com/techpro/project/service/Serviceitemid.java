package com.techpro.project.service;

import com.techpro.project.entity.ItemId;

public interface Serviceitemid {
    ItemId saveItemId(ItemId itemId);

    // Read operation
    ItemId readItemId(int id);
}
