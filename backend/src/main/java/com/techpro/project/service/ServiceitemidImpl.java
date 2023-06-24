package com.techpro.project.service;

import com.techpro.project.entity.ItemId;
import com.techpro.project.repository.ItemIdRepository;
import org.springframework.beans.factory.annotation.Autowired;

public class ServiceitemidImpl implements Serviceitemid {

    @Autowired
    private ItemIdRepository itemIdRepository;

    @Override
    public ItemId saveItemId(ItemId itemId) {
        return itemIdRepository.save(itemId);
    }

    @Override
    public ItemId readItemId(int id){
        return null;
    }
}
