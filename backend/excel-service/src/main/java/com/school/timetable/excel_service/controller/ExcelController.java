package com.school.timetable.excel_service.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.school.timetable.excel_service.exporter.ExcelExportService;
import com.school.timetable.excel_service.service.ExcelImportService;
import com.school.timetable.excel_service.service.PdfExportService;

import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/excel")
@RequiredArgsConstructor
public class ExcelController {

    private final ExcelImportService excelImportService;
    private final ExcelExportService excelExportService;
    private final PdfExportService pdfExportService;

    @PostMapping("/upload")
    public String uploadExcel(
            @RequestParam("file") MultipartFile file
    ) {

        excelImportService.processExcel(file);

        return "Excel Imported Successfully";
    }

    @GetMapping("/export")
    public void exportExcel(
            HttpServletResponse response
    ) throws Exception {

        excelExportService.exportExcel(response);
    }

    @GetMapping("/export/pdf")
    public void exportPdf(
            HttpServletResponse response
    ) {

        pdfExportService.exportPdf(response);
    }
}
