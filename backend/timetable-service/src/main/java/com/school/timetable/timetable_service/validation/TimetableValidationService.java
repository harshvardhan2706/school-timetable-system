package com.school.timetable.timetable_service.validation;

import com.school.timetable.timetable_service.entity.Timetable;
import com.school.timetable.timetable_service.repository.TimetableRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class TimetableValidationService {

    private final TimetableRepository repository;

    public void validate() {

        List<Timetable> all =
                repository.findAll();

        for(Timetable t : all) {

            long conflicts =
                    all.stream()
                            .filter(x ->
                                    x.getTeacherId()
                                            .equals(t.getTeacherId())
                                    &&
                                    x.getDayName()
                                            .equals(t.getDayName())
                                    &&
                                    x.getPeriodNumber()
                                            .equals(t.getPeriodNumber())
                            )
                            .count();

            if(conflicts > 1) {

                throw new RuntimeException(
                        "Teacher conflict detected"
                );
            }
        }
    }
}