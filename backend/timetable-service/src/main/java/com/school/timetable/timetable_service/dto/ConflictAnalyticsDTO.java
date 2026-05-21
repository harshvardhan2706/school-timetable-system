package com.school.timetable.timetable_service.dto;

import java.util.List;
import java.util.Map;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

/**
 * Conflict Analytics DTO
 * Contains timetable conflict data and metrics
 */
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class ConflictAnalyticsDTO {
    private Long totalConflicts;
    private Double resolutionRate;
    private Map<String, Integer> conflictsByType; // TEACHER_DOUBLE_BOOKING, ROOM_DOUBLE_BOOKING, etc.
    private List<ConflictByTeacher> conflictsByTeacher;
    private Integer criticalConflicts;
    private Integer warningConflicts;
    
    @Data
    @Builder
    @NoArgsConstructor
    @AllArgsConstructor
    public static class ConflictByTeacher {
        private String teacherName;
        private Integer conflictCount;
        private String severity; // CRITICAL, WARNING, MINOR
    }
}
