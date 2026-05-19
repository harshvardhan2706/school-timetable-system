package com.school.timetable.class_service.controller;

import org.springframework.web.bind.annotation.*;
import java.util.HashMap;
import java.util.Map;
import java.util.ArrayList;

@RestController
@RequestMapping("/api/classes")
@CrossOrigin(origins = "*", maxAge = 3600)
public class ClassController {
	
	/**
	 * Get all classes
	 * 
	 * @return List of all classes
	 */
	@GetMapping
	public Map<String, Object> getAllClasses() {
		Map<String, Object> response = new HashMap<>();
		response.put("statusCode", 200);
		response.put("message", "Classes retrieved successfully");
		response.put("content", new ArrayList<>()); // TODO: Get from database
		response.put("timestamp", System.currentTimeMillis());
		return response;
	}
	
	/**
	 * Get class by ID
	 * 
	 * @param id Class ID
	 * @return Class details
	 */
	@GetMapping("/{id}")
	public Map<String, Object> getClassById(@PathVariable Long id) {
		Map<String, Object> response = new HashMap<>();
		response.put("statusCode", 200);
		response.put("message", "Class retrieved successfully");
		response.put("data", new HashMap<>()); // TODO: Get from database
		response.put("timestamp", System.currentTimeMillis());
		return response;
	}
	
	/**
	 * Create new class
	 * 
	 * @param classData Class information
	 * @return Created class
	 */
	@PostMapping
	public Map<String, Object> createClass(@RequestBody Map<String, Object> classData) {
		Map<String, Object> response = new HashMap<>();
		response.put("statusCode", 201);
		response.put("message", "Class created successfully");
		response.put("data", classData); // TODO: Save to database
		response.put("timestamp", System.currentTimeMillis());
		return response;
	}
	
	/**
	 * Health check endpoint
	 */
	@GetMapping("/health")
	public Map<String, Object> health() {
		Map<String, Object> response = new HashMap<>();
		response.put("status", "UP");
		response.put("service", "class-service");
		response.put("timestamp", System.currentTimeMillis());
		return response;
	}
}
