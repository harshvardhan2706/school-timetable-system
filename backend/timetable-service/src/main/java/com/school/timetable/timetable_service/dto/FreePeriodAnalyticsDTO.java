package com.school.timetable.timetable_service.dto;

import java.util.List;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

/**
 * Free Periods Analytics DTO
 * Contains free period and availability data
 */
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class FreePeriodAnalyticsDTO {
    private List<WeeklyFreePeriods> weeklyData;
    private Integer totalFreePeriods;
    private Double averageFreePeriods;
    
    @Data
    @Builder
    @NoArgsConstructor
    @AllArgsConstructor
    public static class WeeklyFreePeriods {
        private String name;
        private Integer free;
    }
}
