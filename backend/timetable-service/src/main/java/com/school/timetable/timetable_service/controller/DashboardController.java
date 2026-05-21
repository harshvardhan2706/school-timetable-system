package com.school.timetable.timetable_service.controller;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.school.timetable.timetable_service.dto.ActivityFeedDTO;
import com.school.timetable.timetable_service.dto.ClassroomAnalyticsDTO;
import com.school.timetable.timetable_service.dto.ConflictAnalyticsDTO;
import com.school.timetable.timetable_service.dto.DashboardStatsDTO;
import com.school.timetable.timetable_service.dto.FreePeriodAnalyticsDTO;
import com.school.timetable.timetable_service.dto.OperationalInsightDTO;
import com.school.timetable.timetable_service.dto.SubjectAnalyticsDTO;
import com.school.timetable.timetable_service.dto.TeacherAnalyticsDTO;
import com.school.timetable.timetable_service.dto.TimetableAnalyticsDTO;
import com.school.timetable.timetable_service.service.DashboardAnalyticsService;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

/**
 * Dashboard Controller
 * Exposes analytics and metrics endpoints for the frontend dashboard
 */
@RestController
@RequestMapping("/api/dashboard")
@RequiredArgsConstructor
@Slf4j
public class DashboardController {

    private final DashboardAnalyticsService analyticsService;

    /**
     * Get overall dashboard statistics
     * GET /api/dashboard/stats
     */
    @GetMapping("/stats")
    public ResponseEntity<DashboardStatsDTO> getDashboardStats() {
        log.info("Fetching dashboard statistics");
        try {
            DashboardStatsDTO stats = analyticsService.getDashboardStats();
            return ResponseEntity.ok(stats);
        } catch (Exception e) {
            log.error("Error fetching dashboard stats", e);
            return ResponseEntity.internalServerError().build();
        }
    }

    /**
     * Get teacher analytics and workload distribution
     * GET /api/dashboard/teacher-load
     */
    @GetMapping("/teacher-load")
    public ResponseEntity<TeacherAnalyticsDTO> getTeacherAnalytics() {
        log.info("Fetching teacher analytics");
        try {
            TeacherAnalyticsDTO analytics = analyticsService.getTeacherAnalytics();
            return ResponseEntity.ok(analytics);
        } catch (Exception e) {
            log.error("Error fetching teacher analytics", e);
            return ResponseEntity.internalServerError().build();
        }
    }

    /**
     * Get timetable generation and scheduling metrics
     * GET /api/dashboard/timetable-analytics
     */
    @GetMapping("/timetable-analytics")
    public ResponseEntity<TimetableAnalyticsDTO> getTimetableAnalytics() {
        log.info("Fetching timetable analytics");
        try {
            TimetableAnalyticsDTO analytics = analyticsService.getTimetableAnalytics();
            return ResponseEntity.ok(analytics);
        } catch (Exception e) {
            log.error("Error fetching timetable analytics", e);
            return ResponseEntity.internalServerError().build();
        }
    }

    /**
     * Get conflict analytics
     * GET /api/dashboard/conflicts
     */
    @GetMapping("/conflicts")
    public ResponseEntity<ConflictAnalyticsDTO> getConflictAnalytics() {
        log.info("Fetching conflict analytics");
        try {
            ConflictAnalyticsDTO analytics = analyticsService.getConflictAnalytics();
            return ResponseEntity.ok(analytics);
        } catch (Exception e) {
            log.error("Error fetching conflict analytics", e);
            return ResponseEntity.internalServerError().build();
        }
    }

    /**
     * Get classroom utilization analytics
     * GET /api/dashboard/classroom-utilization
     */
    @GetMapping("/classroom-utilization")
    public ResponseEntity<ClassroomAnalyticsDTO> getClassroomAnalytics() {
        log.info("Fetching classroom analytics");
        try {
            ClassroomAnalyticsDTO analytics = analyticsService.getClassroomAnalytics();
            return ResponseEntity.ok(analytics);
        } catch (Exception e) {
            log.error("Error fetching classroom analytics", e);
            return ResponseEntity.internalServerError().build();
        }
    }

    /**
     * Get subject distribution analytics
     * GET /api/dashboard/subject-distribution
     */
    @GetMapping("/subject-distribution")
    public ResponseEntity<SubjectAnalyticsDTO> getSubjectAnalytics() {
        log.info("Fetching subject analytics");
        try {
            SubjectAnalyticsDTO analytics = analyticsService.getSubjectAnalytics();
            return ResponseEntity.ok(analytics);
        } catch (Exception e) {
            log.error("Error fetching subject analytics", e);
            return ResponseEntity.internalServerError().build();
        }
    }

    /**
     * Get free periods analytics
     * GET /api/dashboard/free-periods
     */
    @GetMapping("/free-periods")
    public ResponseEntity<FreePeriodAnalyticsDTO> getFreePeriodAnalytics() {
        log.info("Fetching free periods analytics");
        try {
            FreePeriodAnalyticsDTO analytics = analyticsService.getFreePeriodAnalytics();
            return ResponseEntity.ok(analytics);
        } catch (Exception e) {
            log.error("Error fetching free periods analytics", e);
            return ResponseEntity.internalServerError().build();
        }
    }

    /**
     * Get activity feed
     * GET /api/dashboard/activity-feed
     */
    @GetMapping("/activity-feed")
    public ResponseEntity<List<ActivityFeedDTO>> getActivityFeed() {
        log.info("Fetching activity feed");
        try {
            List<ActivityFeedDTO> feed = analyticsService.getActivityFeed();
            return ResponseEntity.ok(feed);
        } catch (Exception e) {
            log.error("Error fetching activity feed", e);
            return ResponseEntity.internalServerError().build();
        }
    }

    /**
     * Get operational insights and alerts
     * GET /api/dashboard/insights
     */
    @GetMapping("/insights")
    public ResponseEntity<List<OperationalInsightDTO>> getOperationalInsights() {
        log.info("Fetching operational insights");
        try {
            List<OperationalInsightDTO> insights = analyticsService.getOperationalInsights();
            return ResponseEntity.ok(insights);
        } catch (Exception e) {
            log.error("Error fetching operational insights", e);
            return ResponseEntity.internalServerError().build();
        }
    }
}
