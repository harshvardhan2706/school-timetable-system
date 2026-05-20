package com.school.timetable.api_gateway.config;

import org.springframework.cloud.gateway.route.RouteLocator;
import org.springframework.cloud.gateway.route.builder.RouteLocatorBuilder;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class GatewayRoutesConfig {

    @Bean
    public RouteLocator gatewayRoutes(RouteLocatorBuilder builder) {
        return builder.routes()
            .route("auth-service", r -> r.path("/api/auth/**")
                .filters(f -> f.stripPrefix(0))
                .uri("lb://auth-service"))
            .route("teacher-service", r -> r.path("/api/teachers/**")
                .filters(f -> f.stripPrefix(0))
                .uri("lb://teacher-service"))
            .route("class-service", r -> r.path("/api/classes/**")
                .filters(f -> f.stripPrefix(0))
                .uri("lb://class-service"))
            .build();
    }
}
