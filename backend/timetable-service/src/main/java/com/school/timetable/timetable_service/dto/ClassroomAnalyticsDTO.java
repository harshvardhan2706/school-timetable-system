package com.school.timetable.timetable_service.dto;

import java.util.List;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

/**
 * Classroom Analytics DTO
 * Contains classroom utilization and scheduling data
 */
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class ClassroomAnalyticsDTO {
    private Double utilizationPercentage;
    private Integer totalClassrooms;
    private Integer freeClassrooms;
    private List<String> mostUtilizedClassrooms;
    private List<String> leastUtilizedClassrooms;
    private List<PeakHour> peakHours;
    private Integer averageSlotsPerRoom;
    
    @Data
    @Builder
    @NoArgsConstructor
    @AllArgsConstructor
    public static class PeakHour {
        private String timeSlot;
        private Integer usedRooms;
        private Integer totalRooms;
    }
}
