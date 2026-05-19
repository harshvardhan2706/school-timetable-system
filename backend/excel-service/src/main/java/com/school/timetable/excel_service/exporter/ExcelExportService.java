package com.school.timetable.excel_service.exporter;

import java.util.List;

import org.apache.poi.ss.usermodel.Row;
import org.apache.poi.ss.usermodel.Sheet;
import org.apache.poi.ss.usermodel.Workbook;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;
import org.springframework.stereotype.Service;

import com.school.timetable.excel_service.entity.Timetable;
import com.school.timetable.excel_service.repository.TimetableRepository;

import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class ExcelExportService {

    private final TimetableRepository repository;

    public void exportExcel(
            HttpServletResponse response
    ) throws Exception {

        Workbook workbook = new XSSFWorkbook();

        Sheet sheet = workbook.createSheet("Timetable");

        Row header = sheet.createRow(0);

        header.createCell(0).setCellValue("Day");
        header.createCell(1).setCellValue("Period");
        header.createCell(2).setCellValue("Class");
        header.createCell(3).setCellValue("Subject");
        header.createCell(4).setCellValue("Teacher");

        List<Timetable> list = repository.findAll();

        int rowNum = 1;

        for (Timetable t : list) {
            Row row = sheet.createRow(rowNum++);

            row.createCell(0).setCellValue(t.getDayName());
            row.createCell(1).setCellValue(t.getPeriodNumber());
            row.createCell(2).setCellValue(t.getClassId());
            row.createCell(3).setCellValue(t.getSubjectId());
            row.createCell(4).setCellValue(t.getTeacherId());
        }

        workbook.write(response.getOutputStream());

        workbook.close();
    }
}