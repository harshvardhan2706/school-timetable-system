package com.school.timetable.timetable_service.service;

import com.school.timetable.timetable_service.constants.TimetableConstants;
import com.school.timetable.timetable_service.entity.*;
import com.school.timetable.timetable_service.repository.*;
import com.school.timetable.timetable_service.scheduler.*;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class SmartSchedulingService {

    private final TimetableRepository timetableRepository;

    private final SubjectRepository subjectRepository;

    private final ClassSubjectMappingRepository mappingRepository;

    private final SlotScorer slotScorer;

    private final ConflictChecker checker;

    public void generateSmartTimetable() {

        List<ClassSubjectMapping> mappings =
                mappingRepository.findAll();

        for(ClassSubjectMapping mapping : mappings) {

            Subject subject =
                    subjectRepository
                            .findById(mapping.getSubjectId())
                            .orElseThrow();

            int assigned = 0;

            while(assigned < subject.getWeeklyPeriods()) {

                int bestScore = -1;

                String bestDay = null;

                Integer bestPeriod = null;

                for(String day : TimetableConstants.DAYS) {

                    for(int period = 1;
                        period <= TimetableConstants.TOTAL_PERIODS;
                        period++) {

                        if(period ==
                                TimetableConstants.LUNCH_PERIOD) {
                            continue;
                        }

                        boolean teacherBusy =
                                checker.isTeacherBusy(
                                        mapping.getTeacherId(),
                                        day,
                                        period
                                );

                        boolean classBusy =
                                checker.isClassBusy(
                                        mapping.getClassId(),
                                        day,
                                        period
                                );

                        if(teacherBusy || classBusy) {
                            continue;
                        }

                        int score =
                                slotScorer.calculateScore(
                                        mapping.getClassId(),
                                        mapping.getTeacherId(),
                                        subject,
                                        day,
                                        period
                                );

                        if(score > bestScore) {

                            bestScore = score;

                            bestDay = day;

                            bestPeriod = period;
                        }
                    }
                }

                if(bestDay == null) {
                    break;
                }

                Timetable timetable =
                        Timetable.builder()
                                .dayName(bestDay)
                                .periodNumber(bestPeriod)
                                .classId(mapping.getClassId())
                                .subjectId(mapping.getSubjectId())
                                .teacherId(mapping.getTeacherId())
                                .build();

                timetableRepository.save(timetable);

                assigned++;

                // LAB HANDLING
                if(Boolean.TRUE.equals(
                        subject.getRequiresConsecutivePeriods())) {

                    Timetable next =
                            Timetable.builder()
                                    .dayName(bestDay)
                                    .periodNumber(bestPeriod + 1)
                                    .classId(mapping.getClassId())
                                    .subjectId(mapping.getSubjectId())
                                    .teacherId(mapping.getTeacherId())
                                    .build();

                    timetableRepository.save(next);

                    assigned++;
                }
            }
        }
    }
}