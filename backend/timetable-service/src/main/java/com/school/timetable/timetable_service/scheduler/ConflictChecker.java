package com.school.timetable.timetable_service.scheduler;

import com.school.timetable.timetable_service.repository.TimetableRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class ConflictChecker {

    private final TimetableRepository repository;

    public boolean isTeacherBusy(
            Long teacherId,
            String day,
            Integer period
    ) {
        return repository
                .existsByTeacherIdAndDayNameAndPeriodNumber(
                        teacherId,
                        day,
                        period
                );
    }

    public boolean isClassBusy(
            Long classId,
            String day,
            Integer period
    ) {
        return repository
                .existsByClassIdAndDayNameAndPeriodNumber(
                        classId,
                        day,
                        period
                );
    }
}