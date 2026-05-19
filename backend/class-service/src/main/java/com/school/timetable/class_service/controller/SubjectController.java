package com.school.timetable.class_service.controller;

import com.school.timetable.class_service.entity.Subject;
import com.school.timetable.class_service.services.SubjectService;

import lombok.RequiredArgsConstructor;

import org.springframework.web.bind.annotation.*;

import java.util.List;


@RestController
@RequestMapping("/subjects")
@RequiredArgsConstructor
public class SubjectController {

    private final SubjectService subjectService;

    @PostMapping
    public Subject createSubject(
            @RequestBody Subject subject
    ) {
        return subjectService.createSubject(subject);
    }

    @GetMapping
    public List<Subject> getAllSubjects() {
        return subjectService.getAllSubjects();
    }
}