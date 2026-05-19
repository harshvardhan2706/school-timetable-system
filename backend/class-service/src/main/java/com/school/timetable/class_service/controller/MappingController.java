package com.school.timetable.class_service.controller;

import com.school.timetable.class_service.entity.ClassSubjectMapping;
import com.school.timetable.class_service.repository.ClassSubjectMappingRepository;

import lombok.RequiredArgsConstructor;

import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/mapping")
@RequiredArgsConstructor
public class MappingController {

    private final ClassSubjectMappingRepository repository;

    @PostMapping
    public ClassSubjectMapping assignSubject(
            @RequestBody ClassSubjectMapping mapping
    ) {
        return repository.save(mapping);
    }

    @GetMapping
    public List<ClassSubjectMapping> getAllMappings() {
        return repository.findAll();
    }
}