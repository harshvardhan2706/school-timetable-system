package com.school.timetable.timetable_service.controller;

import com.school.timetable.timetable_service.service.TimetableGenerationService;

import lombok.RequiredArgsConstructor;

import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/timetable")
@RequiredArgsConstructor
public class TimetableController {

    private final TimetableGenerationService service;

    @PostMapping("/generate")
    public String generateTimetable() {

        service.generateTimetable();

        return "Timetable Generated Successfully";
    }
}