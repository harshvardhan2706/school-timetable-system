package com.school.timetable.timetable_service.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

/**
 * Dashboard Statistics DTO
 * Contains overall system statistics
 */
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class DashboardStatsDTO {
    private Long totalTeachers;
    private Long totalStudents;
    private Long totalClasses;
    private Long totalSubjects;
    private Long generatedTimetables;
    private Long activeSchedules;
    private Long totalSlots;
}
