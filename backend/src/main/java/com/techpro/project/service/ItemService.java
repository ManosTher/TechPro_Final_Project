package com.techpro.project.service;

import com.techpro.project.entity.Item;
import com.techpro.project.repository.ItemRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class ItemService {
    private final ItemRepository itemRepository;

    @Autowired
    public ItemService(ItemRepository itemRepository) {
        this.itemRepository = itemRepository;
    }

    // Retrieve all items
    public List<Item> getAllItems() {
        return itemRepository.findAll();
    }

    // Retrieve item by ID
    public Optional<Item> getItemById(Long id) {
        return itemRepository.findById(id);
    }

    // Create a new item
    public Item createItem(Item item) {
        return itemRepository.save(item);
    }

    // Update an existing item
    public Item updateItem(Long id, Item item) {
        item.setItemID(id);
        return itemRepository.save(item);
    }

    // Delete an item
    public void deleteItem(Long id) {
        itemRepository.deleteById(id);
    }
}
