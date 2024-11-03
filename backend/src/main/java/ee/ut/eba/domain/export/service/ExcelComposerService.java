package ee.ut.eba.domain.export.service;

import ee.ut.eba.domain.questionnaire.persistence.Questionnaire;
import ee.ut.eba.domain.questionnaire.service.QuestionnaireService;
import ee.ut.eba.domain.validation.persistence.Validation;
import ee.ut.eba.domain.validation.service.ValidationService;
import ee.ut.eba.domain.validationanswer.persistence.ValidationAnswer;
import ee.ut.eba.domain.validationanswer.service.ValidationAnswerService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.apache.poi.ss.usermodel.CellType;
import org.apache.poi.xssf.usermodel.XSSFCell;
import org.apache.poi.xssf.usermodel.XSSFCellStyle;
import org.apache.poi.xssf.usermodel.XSSFFont;
import org.apache.poi.xssf.usermodel.XSSFRow;
import org.apache.poi.xssf.usermodel.XSSFSheet;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Objects;
import java.util.Optional;

@Slf4j
@Service
@RequiredArgsConstructor
public class ExcelComposerService {

  private final QuestionnaireService questionnaireService;
  private final ValidationAnswerService validationAnswerService;
  private final ValidationService validationService;

  public XSSFWorkbook compose(CreateParameters params) {
    return createWithGroups(params.questionnaireId(), params.language());
  }

  //TODO implement this at a later date
  private XSSFWorkbook createWithoutGroups(Integer questionnaireId, String language) {
    List<ValidationAnswer> validationAnswers = validationAnswerService.findByQuestionnaireId(questionnaireId);
    List<Validation> validations = validationService.get();

    XSSFWorkbook workbook = new XSSFWorkbook();
    XSSFSheet sheet = workbook.createSheet("Vastused");

    createHeaderRow(language, sheet, workbook, validations);
    createDataLines(workbook, sheet, validationAnswers);
    return workbook;
  }

  private XSSFWorkbook createWithGroups(Integer questionnaireId, String language) {
    List<ValidationAnswer> validationAnswers = validationAnswerService.findByQuestionnaireId(questionnaireId);
    List<Validation> validations = validationService.get();
    HashMap<Integer, List<ValidationAnswer>> answersSortedByGroup = getAnswersSortedByGroup(validationAnswers);

    XSSFWorkbook workbook = new XSSFWorkbook();

    for (Map.Entry<Integer, List<ValidationAnswer>> answersByGroup : answersSortedByGroup.entrySet()) {
      String sheetName =
        validationAnswerHasFeatureGroupWithName(answersByGroup) ?
          answersByGroup.getValue().get(0).getFeatureGroup().getName() :
          getDefaultSheetName(language, answersByGroup.getKey());
      XSSFSheet sheet = workbook.createSheet(sheetName);
      createHeaderRow(language, sheet, workbook, validations);
      createDataLines(workbook, sheet, answersByGroup.getValue());
    }

    return workbook;
  }

  private String getDefaultSheetName(String language, Integer key) {
    return language.equalsIgnoreCase("et") ? "nimetu grupp-" + key : "unnamed group-" + key;
  }

  private boolean validationAnswerHasFeatureGroupWithName(Map.Entry<Integer, List<ValidationAnswer>> answersByGroup) {
    return !answersByGroup.getValue().isEmpty() && answersByGroup.getValue().get(0).getFeatureGroup() != null && answersByGroup.getValue().get(0).getFeatureGroup().getName() != null;
  }

  private HashMap<Integer, List<ValidationAnswer>> getAnswersSortedByGroup(List<ValidationAnswer> validationAnswers) {
    HashMap<Integer, List<ValidationAnswer>> answersSortedByGroup = new HashMap<>();
    for (ValidationAnswer validationAnswer : validationAnswers) {
      if (!answersSortedByGroup.containsKey(validationAnswer.getFeatureGroup().getId())) {
        answersSortedByGroup.put(validationAnswer.getFeatureGroup().getId(), new ArrayList<>(List.of(validationAnswer)));

        continue;
      }
      List<ValidationAnswer> rowAnswers = answersSortedByGroup.get(validationAnswer.getFeatureGroup().getId());
      rowAnswers.add(validationAnswer);
      answersSortedByGroup.put(validationAnswer.getFeatureGroup().getId(), rowAnswers);
    }

    return answersSortedByGroup;
  }

  private void createHeaderRow(String language, XSSFSheet sheet, XSSFWorkbook workbook, List<Validation> validationSummaries) {
    XSSFRow row = sheet.createRow(0);
    XSSFCellStyle style = workbook.createCellStyle();
    XSSFFont font = workbook.createFont();
    font.setBold(true);
    font.setFontHeight(16);
    style.setFont(font);

    createCell(row, 0, "ID", style, sheet);
    validationSummaries.sort((v1, v2) -> v2.getWeight() - v1.getWeight());
    if (language.equalsIgnoreCase("et")) {
      for (int i = 0; i < validationSummaries.size(); i++) {
        createCell(row, i + 1 /*Take ID field into accordance*/ , validationSummaries.get(i).getNameEt(), style, sheet);
      }
      return;
    }
    for (int i = 0; i < validationSummaries.size(); i++) {
      createCell(row, i + 1 /*Take ID field into accordance*/ , validationSummaries.get(i).getNameEn(), style, sheet);
    }
  }


  private void createDataLines(XSSFWorkbook workbook, XSSFSheet sheet, List<ValidationAnswer> validationAnswers) {
    HashMap<Integer, List<ValidationAnswer>> answers = getAnswersSortedByRow(validationAnswers);

    int rowCount = 1;

    XSSFCellStyle style = workbook.createCellStyle();
    XSSFFont font = workbook.createFont();
    font.setFontHeight(14);
    style.setFont(font);

    for (Map.Entry<Integer, List<ValidationAnswer>> answerByRow : answers.entrySet()) {
      XSSFRow row = sheet.createRow(rowCount++);
      List<ValidationAnswer> answerList = answerByRow.getValue();
      createCell(row, 0, rowCount - 1, style, sheet); //TODO Or just auto increment ID either or
      for (int i = 0; i < answerList.size(); i++) {
        if (i == 2) { //Bad Hack for stakeholder setting
          int finalI = i;
          Optional<ValidationAnswer> validationAnswer = validationAnswers.stream().filter(va -> Objects.equals(va.getFeaturePrecondition().getId(), answerList.get(finalI).getFeaturePrecondition().getId()) && va.getStakeholder() != null).findFirst();
          if (validationAnswer.isPresent()) {
            createCell(row, i + 1 , validationAnswer.get().getStakeholder().getName(), style, sheet);
          } else {
            createCell(row, i + 1 , answerList.get(i).getStakeholder() != null ? answerList.get(i).getStakeholder().getName() : null, style, sheet);
          }
        } else {
          createCell(row, i + 1 /*Take ID field into accordance*/, answerList.get(i).getAnswer(), style, sheet);
        }
      }
    }

  }

  private HashMap<Integer, List<ValidationAnswer>> getAnswersSortedByRow(List<ValidationAnswer> validationAnswers) {
    HashMap<Integer, List<ValidationAnswer>> answersSortedByRow = new HashMap<>();
    for (ValidationAnswer validationAnswer : validationAnswers) {
      if (!answersSortedByRow.containsKey(validationAnswer.getRowId())) {
        answersSortedByRow.put(validationAnswer.getRowId(), new ArrayList<>(List.of(validationAnswer)));

        continue;
      }
      List<ValidationAnswer> rowAnswers = answersSortedByRow.get(validationAnswer.getRowId());
      rowAnswers.add(validationAnswer);
      answersSortedByRow.put(validationAnswer.getRowId(), rowAnswers);
    }

    return answersSortedByRow;
  }

  private void createCell(XSSFRow row, int columnCount, Object value, XSSFCellStyle style, XSSFSheet sheet) {
    sheet.autoSizeColumn(columnCount);
    XSSFCell cell = row.createCell(columnCount);
    if (value instanceof Integer) {
      cell.setCellValue((Integer) value);
    } else if (value instanceof Boolean) {
      cell.setCellValue((Boolean) value);
    } else if (value == null) {
      cell.setCellType(CellType.BLANK);
    } else {
      cell.setCellValue((String) value);
    }
    cell.setCellStyle(style);
  }
  public record CreateParameters(Integer questionnaireId, String language,
                                 Boolean exportFeatureGroupsToSeparateSheets) {
  }

}
