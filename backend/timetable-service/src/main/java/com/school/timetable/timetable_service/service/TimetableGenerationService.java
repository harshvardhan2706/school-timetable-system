package com.school.timetable.timetable_service.service;


import com.school.timetable.timetable_service.entity.Subject;
import com.school.timetable.timetable_service.entity.ClassSubjectMapping;
import com.school.timetable.timetable_service.entity.Timetable;

import com.school.timetable.timetable_service.repository.SubjectRepository;
import com.school.timetable.timetable_service.repository.ClassSubjectMappingRepository;
import com.school.timetable.timetable_service.repository.TimetableRepository;

import com.school.timetable.timetable_service.constants.TimetableConstants;

import lombok.RequiredArgsConstructor;

import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class TimetableGenerationService {

    private final TimetableRepository timetableRepository;

    private final ClassSubjectMappingRepository mappingRepository;

    private final SubjectRepository subjectRepository;

    public void generateTimetable() {

        List<ClassSubjectMapping> mappings =
                mappingRepository.findAll();

        for(ClassSubjectMapping mapping : mappings) {

            Subject subject = subjectRepository
                    .findById(mapping.getSubjectId())
                    .orElseThrow();

            int weeklyPeriods = subject.getWeeklyPeriods();

            int assigned = 0;

            for(String day : TimetableConstants.DAYS) {

                for(int period = 1; period <= 8; period++) {

                    if(assigned >= weeklyPeriods) {
                        break;
                    }

                    boolean teacherBusy =
                            timetableRepository
                                    .existsByTeacherIdAndDayNameAndPeriodNumber(
                                            mapping.getTeacherId(),
                                            day,
                                            period
                                    );

                    boolean classBusy =
                            timetableRepository
                                    .existsByClassIdAndDayNameAndPeriodNumber(
                                            mapping.getClassId(),
                                            day,
                                            period
                                    );

                    if(!teacherBusy && !classBusy) {

                        Timetable timetable =
                                Timetable.builder()
                                        .dayName(day)
                                        .periodNumber(period)
                                        .classId(mapping.getClassId())
                                        .subjectId(mapping.getSubjectId())
                                        .teacherId(mapping.getTeacherId())
                                        .build();

                        timetableRepository.save(timetable);

                        assigned++;
                    }
                }
            }
        }
    }
}