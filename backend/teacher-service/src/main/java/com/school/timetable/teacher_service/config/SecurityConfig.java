package com.school.timetable.teacher_service.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;

import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;

import org.springframework.security.web.SecurityFilterChain;



@Configuration
@EnableWebSecurity
public class SecurityConfig {

    @Bean
    public SecurityFilterChain securityFilterChain(
            HttpSecurity http
    ) throws Exception {

        http
            .csrf(csrf -> csrf.disable())

            .authorizeHttpRequests(auth -> auth
                .requestMatchers(HttpMethod.GET,
                        "/api/teachers/**")
                .authenticated()

                .requestMatchers(HttpMethod.POST,
                        "/api/teachers/**")
                .permitAll()
                // .hasAuthority("ADMIN")

                .requestMatchers(HttpMethod.PUT,
                        "/api/teachers/**")
                .permitAll()
                        // .hasAuthority("ADMIN")

                .requestMatchers(HttpMethod.DELETE,
                        "/api/teachers/**")
                .permitAll()
                        // .hasAuthority("ADMIN")
        

                .anyRequest().authenticated()
            );

        return http.build();
    }
}
