package com.school.timetable.excel_service.service;

import org.springframework.stereotype.Service;

import com.lowagie.text.Document;
import com.lowagie.text.Paragraph;
import com.lowagie.text.pdf.PdfWriter;

import jakarta.servlet.http.HttpServletResponse;

@Service
public class PdfExportService {

        public void exportPdf(
                        HttpServletResponse response
        ) {

                try {

                        Document document = new Document();

                        PdfWriter.getInstance(document, response.getOutputStream());

                        document.open();

                        document.add(new Paragraph("School Timetable"));

                        document.close();

                } catch (Exception e) {
                        e.printStackTrace();
                }
        }
}