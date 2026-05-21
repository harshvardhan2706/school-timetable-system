package com.school.timetable.timetable_service.dto;

import java.util.List;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

/**
 * Timetable Analytics DTO
 * Contains timetable generation and scheduling metrics
 */
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class TimetableAnalyticsDTO {
    private Long generatedTimetables;
    private Long activeSchedules;
    private Double averageSlotsPerClass;
    private Integer weeksGenerated;
    private Integer totalGrades;
    private List<GradeDistribution> gradeDistribution;
    private Double schedulingEfficiency;
    private Integer totalRequiredSlots;
    private Integer totalAssignedSlots;
    
    @Data
    @Builder
    @NoArgsConstructor
    @AllArgsConstructor
    public static class GradeDistribution {
        private String grade;
        private Integer slotCount;
        private Double completionPercentage;
    }
}
