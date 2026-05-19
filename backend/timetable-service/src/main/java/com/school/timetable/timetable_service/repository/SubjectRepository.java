package com.school.timetable.timetable_service.repository;

import com.school.timetable.timetable_service.entity.Subject;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface SubjectRepository
        extends JpaRepository<Subject, Long> {
}