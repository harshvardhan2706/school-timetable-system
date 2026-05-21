package com.school.timetable.timetable_service.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

/**
 * Activity Feed DTO
 * Represents a single activity/event in the system
 */
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class ActivityFeedDTO {
    private Long id;
    private String text;
    private String time;
    private String type; // TIMETABLE_UPDATE, SLOT_SWAP, TEACHER_ASSIGNED, CONFLICT_RESOLVED, TIMETABLE_GENERATED
    private String adminName;
    private Long timestamp;
}
