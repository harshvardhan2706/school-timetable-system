package com.school.timetable.teacher_service.service;

import com.school.timetable.teacher_service.entity.Teacher;
import com.school.timetable.teacher_service.repository.TeacherRepository;

import lombok.RequiredArgsConstructor;

import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class TeacherService {

    private final TeacherRepository teacherRepository;

    public Teacher createTeacher(Teacher teacher) {
        return teacherRepository.save(teacher);
    }

    public List<Teacher> getAllTeachers() {
        return teacherRepository.findAll();
    }

    public Teacher getTeacherById(Long id) {
        return teacherRepository.findById(id)
                .orElseThrow();
    }

    public Teacher updateTeacher(Long id, Teacher updatedTeacher) {

        Teacher teacher = teacherRepository.findById(id)
                .orElseThrow();

        teacher.setTeacherName(updatedTeacher.getTeacherName());
        teacher.setEmail(updatedTeacher.getEmail());
        teacher.setSubject(updatedTeacher.getSubject());
        teacher.setMaxPeriodsPerWeek(
                updatedTeacher.getMaxPeriodsPerWeek()
        );

        teacher.setAssignedPeriods(
                updatedTeacher.getAssignedPeriods()
        );

        teacher.setAvailable(updatedTeacher.getAvailable());

        return teacherRepository.save(teacher);
    }

    public void deleteTeacher(Long id) {
        teacherRepository.deleteById(id);
    }
}
