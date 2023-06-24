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

    public List<People> getAllPeople() {
        return peopleRepository.findAll();
    }

    public Optional<People> getPeopleById(Long personId) { return peopleRepository.findById(personId);
    }

    public People createPeople(People people) {
        return peopleRepository.save(people);
    }

    public People updatePeople(Long id, People people) {
        people.setPersonID(id);
        return peopleRepository.save(people);
    }

    public void deletePeople(Long id) {
        peopleRepository.deleteById(id);
    }
}
