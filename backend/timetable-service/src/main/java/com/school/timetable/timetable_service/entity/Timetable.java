package com.school.timetable.timetable_service.entity;

import jakarta.persistence.*;
import lombok.*;



@Entity
@Table(name = "timetable")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Timetable {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String dayName;

    private Integer periodNumber;

    private Long classId;

    private Long subjectId;

    private Long teacherId;
}