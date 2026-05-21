package com.school.timetable.timetable_service.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

/**
 * Operational Insight DTO
 * Represents a single operational insight/alert
 */
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class OperationalInsightDTO {
    private String title;
    private String message;
    private String severity; // INFO, WARNING, CRITICAL
    private String icon;
    private String color;
}
