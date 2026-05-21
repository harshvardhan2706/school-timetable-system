package com.school.timetable.api_gateway.config;

/**
 * DEPRECATED: CORS is now configured via application.yml globalcors settings
 * This class is kept for reference but should not be used
 * 
 * CORS Configuration moved to:
 * src/main/resources/application.yml -> spring.cloud.gateway.globalcors
 * 
 * Reason: Centralized CORS at gateway level to prevent duplicate headers
 * Duplicate CORS configs (Java bean + YAML) were causing header conflicts
 */
public class GatewayCorsConfig {
    // DEPRECATED - Use application.yml instead
}
