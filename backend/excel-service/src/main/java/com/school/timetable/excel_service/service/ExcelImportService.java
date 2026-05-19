package com.school.timetable.excel_service.service;

import org.apache.poi.ss.usermodel.Cell;
import org.apache.poi.ss.usermodel.Row;
import org.apache.poi.ss.usermodel.Sheet;
import org.apache.poi.ss.usermodel.Workbook;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.school.timetable.excel_service.dto.ParsedData;
import com.school.timetable.excel_service.entity.Timetable;
import com.school.timetable.excel_service.parser.TimetableParser;
import com.school.timetable.excel_service.repository.TimetableRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class ExcelImportService {

    private final TimetableRepository repository;
    private final TimetableParser parser;

    public void processExcel(
            MultipartFile file
    ) {

        try (Workbook workbook = new XSSFWorkbook(file.getInputStream())) {

            Sheet sheet = workbook.getSheetAt(0);

            int rowNum = 0;

            for (Row row : sheet) {

                // skip header row
                if (rowNum++ == 0) continue;

                Timetable t = new Timetable();

                Cell dayCell = row.getCell(0);
                Cell periodCell = row.getCell(1);
                Cell classCell = row.getCell(2);
                Cell subjectCell = row.getCell(3);
                Cell teacherCell = row.getCell(4);

                if (dayCell != null) t.setDayName(dayCell.toString());
                if (periodCell != null) {
                    try {
                        t.setPeriodNumber((int) periodCell.getNumericCellValue());
                    } catch (Exception ex) {
                        try {
                            t.setPeriodNumber(Integer.parseInt(periodCell.toString()));
                        } catch (Exception ignored) {
                        }
                    }
                }
                if (classCell != null) t.setClassId(classCell.toString());

                // try to parse subject/teacher from a single cell if necessary
                if (subjectCell != null) {
                    ParsedData pd = parser.parseCell(subjectCell.toString());
                    if (pd.getSubject() != null && !pd.getSubject().isEmpty()) {
                        t.setSubjectId(pd.getSubject());
                    } else {
                        t.setSubjectId(subjectCell.toString());
                    }
                }

                if (teacherCell != null) {
                    ParsedData pd = parser.parseCell(teacherCell.toString());
                    if (pd.getTeacher() != null && !pd.getTeacher().isEmpty()) {
                        t.setTeacherId(pd.getTeacher());
                    } else {
                        t.setTeacherId(teacherCell.toString());
                    }
                }

                repository.save(t);
            }

        } catch (Exception e) {
            e.printStackTrace();
        }
    }
}