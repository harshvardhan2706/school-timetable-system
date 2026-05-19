package com.school.timetable.class_service.services;

import com.school.timetable.class_service.entity.ClassRoom;
import com.school.timetable.class_service.repository.ClassRoomRepository;

import lombok.RequiredArgsConstructor;

import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class ClassService {

    private final ClassRoomRepository classRoomRepository;

    public ClassRoom createClass(
            ClassRoom classRoom
    ) {
        return classRoomRepository.save(classRoom);
    }

    public List<ClassRoom> getAllClasses() {
        return classRoomRepository.findAll();
    }
}