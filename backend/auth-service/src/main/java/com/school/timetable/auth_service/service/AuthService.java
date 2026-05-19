package com.school.timetable.auth_service.service;

import com.school.timetable.auth_service.dto.AuthResponse;
import com.school.timetable.auth_service.dto.LoginRequest;
import com.school.timetable.auth_service.dto.RegisterRequest;
import com.school.timetable.auth_service.entity.User;
import com.school.timetable.auth_service.exception.AuthException;
import com.school.timetable.auth_service.repository.UserRepository;
import com.school.timetable.auth_service.security.JwtService;

import lombok.RequiredArgsConstructor;

import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;


@Service
@RequiredArgsConstructor
public class AuthService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtService jwtService;

    public AuthResponse register(RegisterRequest request) {
        // Check if email already exists
        if (userRepository.findByEmail(request.getEmail()).isPresent()) {
            throw new AuthException("Email already registered");
        }

        // Validate required fields
        if (request.getName() == null || request.getName().isEmpty()) {
            throw new AuthException("Name is required");
        }
        if (request.getPassword() == null || request.getPassword().isEmpty()) {
            throw new AuthException("Password is required");
        }

        // Create new user with encrypted password
        User user = User.builder()
                .name(request.getName())
                .email(request.getEmail())
                .password(passwordEncoder.encode(request.getPassword()))
                .role(request.getRole() != null ? request.getRole() : "USER")
                .build();

        User savedUser = userRepository.save(user);

        // Generate JWT token
        String token = jwtService.generateToken(savedUser.getEmail());

        return AuthResponse.builder()
                .id(savedUser.getId())
                .name(savedUser.getName())
                .email(savedUser.getEmail())
                .role(savedUser.getRole())
                .token(token)
                .message("User registered successfully")
                .statusCode(201)
                .build();
    }

    public AuthResponse login(LoginRequest request) {
        // Find user by email
        User user = userRepository.findByEmail(request.getEmail())
                .orElseThrow(() -> new AuthException("Invalid email or password"));

        // Verify password
        if (!passwordEncoder.matches(request.getPassword(), user.getPassword())) {
            throw new AuthException("Invalid email or password");
        }

        // Generate JWT token
        String token = jwtService.generateToken(user.getEmail());

        return AuthResponse.builder()
                .id(user.getId())
                .name(user.getName())
                .email(user.getEmail())
                .role(user.getRole())
                .token(token)
                .message("Login successful")
                .statusCode(200)
                .build();
    }

    public AuthResponse validateToken(String token) {
        if (!jwtService.validateToken(token)) {
            throw new AuthException("Invalid or expired token");
        }

        String email = jwtService.extractEmail(token);
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new AuthException("User not found"));

        return AuthResponse.builder()
                .id(user.getId())
                .name(user.getName())
                .email(user.getEmail())
                .role(user.getRole())
                .message("Token is valid")
                .statusCode(200)
                .build();
    }
}
