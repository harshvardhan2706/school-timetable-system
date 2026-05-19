package com.school.timetable.teacher_service.controller;

import com.school.timetable.teacher_service.entity.Teacher;
import com.school.timetable.teacher_service.service.TeacherService;

import lombok.RequiredArgsConstructor;

import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/teachers")
@RequiredArgsConstructor
public class TeacherController {

    private final TeacherService teacherService;

    @PostMapping
    public Teacher createTeacher(
            @RequestBody Teacher teacher
    ) {
        return teacherService.createTeacher(teacher);
    }

    @GetMapping
    public List<Teacher> getAllTeachers() {
        return teacherService.getAllTeachers();
    }

    @GetMapping("/{id}")
    public Teacher getTeacherById(
            @PathVariable Long id
    ) {
        return teacherService.getTeacherById(id);
    }

    @PutMapping("/{id}")
    public Teacher updateTeacher(
            @PathVariable Long id,
            @RequestBody Teacher teacher
    ) {
        return teacherService.updateTeacher(id, teacher);
    }

    @DeleteMapping("/{id}")
    public String deleteTeacher(
            @PathVariable Long id
    ) {

        teacherService.deleteTeacher(id);

        return "Teacher Deleted Successfully";
    }
}