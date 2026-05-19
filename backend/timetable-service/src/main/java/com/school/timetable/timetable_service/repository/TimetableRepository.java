package com.school.timetable.timetable_service.repository;

import com.school.timetable.timetable_service.entity.Timetable;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface TimetableRepository
        extends JpaRepository<Timetable, Long> {

    boolean existsByTeacherIdAndDayNameAndPeriodNumber(
            Long teacherId,
            String dayName,
            Integer periodNumber
    );

    boolean existsByClassIdAndDayNameAndPeriodNumber(
            Long classId,
            String dayName,
            Integer periodNumber
    );

    long countByTeacherIdAndDayName(
            Long teacherId,
            String dayName
    );

    long countByTeacherIdAndDayNameAndPeriodNumberBetween(
            Long teacherId,
            String dayName,
            Integer start,
            Integer end
    );

    long countByClassIdAndSubjectIdAndDayName(
            Long classId,
            Long subjectId,
            String dayName
    );
}