package com.school.timetable.class_service.entity;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "class_subject_mapping")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ClassSubjectMapping {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private Long classId;

    private Long subjectId;

    private Long teacherId;
}