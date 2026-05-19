package com.school.timetable.timetable_service.scheduler;

import com.school.timetable.timetable_service.entity.Subject;
import com.school.timetable.timetable_service.repository.TimetableRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class SlotScorer {

    private final TimetableRepository repository;

    public int calculateScore(
            Long classId,
            Long teacherId,
            Subject subject,
            String day,
            Integer period
    ) {

        int score = 0;

        boolean teacherBusy =
                repository.existsByTeacherIdAndDayNameAndPeriodNumber(
                        teacherId,
                        day,
                        period
                );

        boolean classBusy =
                repository.existsByClassIdAndDayNameAndPeriodNumber(
                        classId,
                        day,
                        period
                );

        if(!teacherBusy) {
            score += 20;
        }

        if(!classBusy) {
            score += 20;
        }

        long sameSubjectCount =
                repository.countByClassIdAndSubjectIdAndDayName(
                        classId,
                        subject.getId(),
                        day
                );

        if(sameSubjectCount < subject.getMaxPeriodsPerDay()) {
            score += 30;
        }

        long consecutiveLoad =
                repository
                        .countByTeacherIdAndDayNameAndPeriodNumberBetween(
                                teacherId,
                                day,
                                Math.max(1, period - 2),
                                period
                        );

        if(consecutiveLoad <
                3) {

            score += 25;
        }

        score += subject.getPriorityLevel();

        return score;
    }
}