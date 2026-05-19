package com.school.timetable.excel_service.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.school.timetable.excel_service.entity.Timetable;

@Repository
public interface TimetableRepository extends JpaRepository<Timetable, Long> {

}
