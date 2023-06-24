package com.techpro.project.controllers;

import com.techpro.project.entity.People;
import com.techpro.project.service.PeopleService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.bind.annotation.CrossOrigin;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/people")
@CrossOrigin
public class PeopleController {
    private final PeopleService peopleService;

    @Autowired
    public PeopleController(PeopleService peopleService) {
        this.peopleService = peopleService;
    }

    @GetMapping
    public ResponseEntity<List<People>> getAllPeople() {
        List<People> peopleList = peopleService.getAllPeople();
        System.out.println(peopleList);
        return new ResponseEntity<>(peopleList, HttpStatus.OK);
    }

    @GetMapping("/{id}")
    public ResponseEntity<People> getPeopleById(@PathVariable("id") Long id) {
        Optional<People> people = peopleService.getPeopleById(id);
        return people.map(value -> new ResponseEntity<>(value, HttpStatus.OK))
                .orElseGet(() -> new ResponseEntity<>(HttpStatus.NOT_FOUND));
    }

    @PostMapping
    public ResponseEntity<People> createPeople(@RequestBody People people) {
        People createdPeople = peopleService.createPeople(people);
        return new ResponseEntity<>(createdPeople, HttpStatus.CREATED);
    }

    @PutMapping("/{id}")
    public ResponseEntity<People> updatePeople(@PathVariable("id") Long id, @RequestBody People people) {
        Optional<People> existingPeople = peopleService.getPeopleById(id);
        if (existingPeople.isPresent()) {
            People updatedPeople = peopleService.updatePeople(id, people);
            return new ResponseEntity<>(updatedPeople, HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deletePeople(@PathVariable("id") Long id) {
        Optional<People> existingPeople = peopleService.getPeopleById(id);
        if (existingPeople.isPresent()) {
            peopleService.deletePeople(id);
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }
}
