package com.school.timetable.class_service.controller;

import com.school.timetable.class_service.entity.ClassRoom;
import com.school.timetable.class_service.services.ClassService;

import lombok.RequiredArgsConstructor;

import org.springframework.web.bind.annotation.*;

import java.util.List;

import java.util.HashMap;
import java.util.Map;
import java.util.ArrayList;

@RestController
@RequestMapping("/api/classes")
@RequiredArgsConstructor
public class ClassController {

    private final ClassService classService;

    @PostMapping
    public ClassRoom createClass(
            @RequestBody ClassRoom classRoom
    ) {
        return classService.createClass(classRoom);
    }

    @GetMapping
    public List<ClassRoom> getAllClasses() {
        return classService.getAllClasses();
    }
}