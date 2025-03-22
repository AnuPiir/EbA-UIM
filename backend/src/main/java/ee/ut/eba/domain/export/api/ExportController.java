package ee.ut.eba.domain.export.api;

import ee.ut.eba.domain.export.service.ExcelExportService;
import ee.ut.eba.domain.questionnaire.service.QuestionnaireService;
import jakarta.servlet.ServletOutputStream;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.apache.poi.ss.usermodel.Workbook;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;
import org.springframework.http.MediaType;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.io.IOException;
import java.text.DateFormat;
import java.text.SimpleDateFormat;
import java.util.Date;

@Slf4j
@Validated
@RestController
@RequiredArgsConstructor
@CrossOrigin(origins =  {"${app.dev.frontend.local}"})
@RequestMapping(value = "/api/export", produces = MediaType.APPLICATION_JSON_VALUE)
public class ExportController {

  private final ExcelExportService excelExportService;
  private final QuestionnaireService questionnaireService;

  @GetMapping(value = "questionnaire/{questionnaireId}/language/{language}")
  public void getQuestionnaire(
          @PathVariable(value = "questionnaireId") Integer questionnaireId,
          @PathVariable(value = "language") String language,
          HttpServletResponse response) throws IOException {

    log.info("Exporting excel by questionnaire id: {}", questionnaireId);

    Workbook workbook = excelExportService.generateExcel(questionnaireId, language);

    response.setContentType("application/octet-stream");
    DateFormat dateFormatter = new SimpleDateFormat("yyyy-MM-dd_HH:mm:ss");
    String currentDateTime = dateFormatter.format(new Date());
    String headerKey = "Content-Disposition";
    String headerValue = "attachment; filename=" + questionnaireService.get(questionnaireId).getName() + "_" + currentDateTime + ".xlsx";

    response.setHeader(headerKey, headerValue);
    ServletOutputStream outputStream = response.getOutputStream();
    workbook.write(outputStream);
    workbook.close();
    outputStream.close();
  }
}
