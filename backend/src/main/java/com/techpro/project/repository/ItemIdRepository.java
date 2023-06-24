package com.techpro.project.repository;

import com.techpro.project.entity.ItemId;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ItemIdRepository extends CrudRepository<ItemId, Integer> {

}
