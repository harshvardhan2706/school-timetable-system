package com.school.timetable.timetable_service.dto;

import java.util.List;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

/**
 * Subject Distribution Analytics DTO
 * Contains subject distribution across timetable
 */
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class SubjectAnalyticsDTO {
    private List<SubjectDistributionData> subjectDistribution;
    private Integer totalSubjectSlots;
    private String mostPopularSubject;
    private String leastPopularSubject;
    
    @Data
    @Builder
    @NoArgsConstructor
    @AllArgsConstructor
    public static class SubjectDistributionData {
        private String name;
        private Integer value;
        private Double percentage;
    }
}
