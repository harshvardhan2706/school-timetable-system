package com.school.timetable.teacher_service.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

import com.school.timetable.teacher_service.security.JwtFilter;

import lombok.RequiredArgsConstructor;

@Configuration
@EnableWebSecurity
@RequiredArgsConstructor // Automatically injects JwtFilter bean
public class SecurityConfig {

    private final JwtFilter jwtFilter; // 👈 Token read karne ke liye zaruri hai

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {

        http
            .csrf(csrf -> csrf.disable())

            // 1. Session state ko Stateless banayein taaki cookies ki jagah JWT valid ho
            .sessionManagement(session -> 
                session.sessionCreationPolicy(SessionCreationPolicy.STATELESS)
            )

            .authorizeHttpRequests(auth -> auth
                // 2. Allow public teacher listing so the dashboard can fetch teachers without login
                .requestMatchers(HttpMethod.GET, "/api/teachers", "/api/teachers/**")
                .permitAll()

                .requestMatchers(HttpMethod.POST, "/api/teachers", "/api/teachers/**")
                .permitAll() // Abhi ke liye permitAll hai (Baad mein hasAuthority("ADMIN") enable kar sakte hain)

                .requestMatchers(HttpMethod.PUT, "/api/teachers", "/api/teachers/**")
                .permitAll()

                .requestMatchers(HttpMethod.DELETE, "/api/teachers", "/api/teachers/**")
                .permitAll()

                .anyRequest().authenticated()
            )

            // 3. UsernamePassword filter se pehle JwtFilter pipeline lagayein taaki token security context mein set ho sake
            .addFilterBefore(jwtFilter, UsernamePasswordAuthenticationFilter.class);

        return http.build();
    }
}