package com.techpro.project.service;

import com.techpro.project.entity.People;
import com.techpro.project.repository.PeopleRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class PeopleService {
    private final PeopleRepository peopleRepository;

    @Autowired
    public PeopleService(PeopleRepository peopleRepository) {
        this.peopleRepository = peopleRepository;
    }

    // Retrieve all people
    public List<People> getAllPeople() {
        return peopleRepository.findAll();
    }

    // Retrieve a specific person by ID
    public Optional<People> getPeopleById(Long personId) {
        return peopleRepository.findById(personId);
    }

    // Create a new person
    public People createPeople(People people) {
        return peopleRepository.save(people);
    }

    // Update an existing person
    public People updatePeople(Long id, People people) {
        people.setPersonID(id);
        return peopleRepository.save(people);
    }

    // Delete a person by ID
    public void deletePeople(Long id) {
        peopleRepository.deleteById(id);
    }
}
