package com.school.timetable.class_service.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.school.timetable.class_service.entity.ClassRoom;

@Repository
public interface ClassRoomRepository
        extends JpaRepository<ClassRoom, Long> {
}