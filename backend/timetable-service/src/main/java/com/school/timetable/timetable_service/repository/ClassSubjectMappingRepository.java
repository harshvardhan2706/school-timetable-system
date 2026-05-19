package com.school.timetable.timetable_service.repository;

import com.school.timetable.timetable_service.entity.ClassSubjectMapping;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ClassSubjectMappingRepository
        extends JpaRepository<ClassSubjectMapping, Long> {
}