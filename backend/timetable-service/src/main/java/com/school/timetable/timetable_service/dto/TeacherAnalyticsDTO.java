package com.school.timetable.timetable_service.dto;

import java.util.List;
import java.util.Map;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

/**
 * Teacher Analytics DTO
 * Contains teacher workload and assignment data
 */
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class TeacherAnalyticsDTO {
    private Double averageLessonsPerWeek;
    private Integer overloadedTeachers;
    private Double maxTeacherLoad;
    private Double minTeacherLoad;
    private Map<String, Integer> workloadDistribution; // 0-5, 5-10, 10-15, etc.
    private List<WeeklyDataPoint> weeklyData;
    private List<String> topOverloadedTeachers;
    
    @Data
    @Builder
    @NoArgsConstructor
    @AllArgsConstructor
    public static class WeeklyDataPoint {
        private String name; // Mon, Tue, Wed, etc.
        private Integer lessons;
        private Double utilizationRate;
    }
}
