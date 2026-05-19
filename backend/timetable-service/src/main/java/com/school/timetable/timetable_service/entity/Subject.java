package com.school.timetable.timetable_service.entity;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "subjects")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Subject {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String subjectName;

    private Integer weeklyPeriods;

    private Boolean requiresConsecutivePeriods;

    private Integer priorityLevel;

    private Integer maxPeriodsPerDay;
}