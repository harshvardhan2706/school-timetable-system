package com.school.timetable.excel_service.parser;

import org.springframework.stereotype.Component;

import com.school.timetable.excel_service.dto.ParsedData;

@Component
public class TimetableParser {

        public ParsedData parseCell(
                        String value
        ) {

                ParsedData data = new ParsedData();

                if (value == null || value.trim().isEmpty()) {
                        return data;
                }

                String[] parts = value.split("-");

                if (parts.length >= 1) {
                        data.setSubject(parts[0].trim());
                }

                if (parts.length >= 2) {
                        data.setTeacher(parts[1].trim());
                }

                return data;
        }
}