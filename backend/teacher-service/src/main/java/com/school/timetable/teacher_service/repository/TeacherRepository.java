package com.school.timetable.teacher_service.repository;

import com.school.timetable.teacher_service.entity.Teacher;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface TeacherRepository extends JpaRepository<Teacher, Long>{
    
}
