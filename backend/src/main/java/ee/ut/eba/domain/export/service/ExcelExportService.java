package ee.ut.eba.domain.export.service;

import ee.ut.eba.domain.export.model.ExcelCell;
import ee.ut.eba.domain.featuregroup.service.FeatureGroupService;
import ee.ut.eba.domain.validationanswer.persistence.ValidationAnswer;
import ee.ut.eba.domain.validationanswer.service.ValidationAnswerService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.apache.poi.ss.usermodel.*;
import org.apache.poi.ss.util.CellRangeAddress;
import org.apache.poi.xssf.usermodel.*;
import org.springframework.stereotype.Service;
import java.util.*;

@Slf4j
@Service
@RequiredArgsConstructor
public class ExcelExportService {

    private final ValidationAnswerService validationAnswerService;
    private final ExcelColumnService excelColumnService;
    private final FeatureGroupService featureGroupService;

    private final List<Integer> columnsWidths = Arrays.asList(144, 420, 74, 201, 365, 365, 234, 234, 234, 234, 170, 452, 201, 365, 602, 602);
    private final List<HorizontalAlignment> headerColumnsAlignment = Arrays.asList(HorizontalAlignment.CENTER, HorizontalAlignment.LEFT, HorizontalAlignment.RIGHT, HorizontalAlignment.CENTER, HorizontalAlignment.LEFT, HorizontalAlignment.LEFT, HorizontalAlignment.CENTER, HorizontalAlignment.CENTER, HorizontalAlignment.CENTER, HorizontalAlignment.CENTER, HorizontalAlignment.CENTER, HorizontalAlignment.CENTER, HorizontalAlignment.CENTER, HorizontalAlignment.CENTER, HorizontalAlignment.LEFT, HorizontalAlignment.LEFT);
    private final List<HorizontalAlignment> bodyColumnsAlignment = Arrays.asList(HorizontalAlignment.CENTER, HorizontalAlignment.LEFT, HorizontalAlignment.RIGHT, HorizontalAlignment.CENTER, HorizontalAlignment.LEFT, HorizontalAlignment.LEFT, HorizontalAlignment.CENTER, HorizontalAlignment.CENTER, HorizontalAlignment.CENTER, HorizontalAlignment.CENTER, HorizontalAlignment.CENTER, HorizontalAlignment.RIGHT, HorizontalAlignment.CENTER, HorizontalAlignment.LEFT, HorizontalAlignment.LEFT, HorizontalAlignment.LEFT);
    private final List<VerticalAlignment> bodyColumnsVerticalAlignment = Arrays.asList(VerticalAlignment.TOP, VerticalAlignment.TOP, VerticalAlignment.TOP, VerticalAlignment.TOP, VerticalAlignment.TOP, VerticalAlignment.TOP, VerticalAlignment.CENTER, VerticalAlignment.CENTER, VerticalAlignment.CENTER, VerticalAlignment.CENTER, VerticalAlignment.CENTER, VerticalAlignment.TOP, VerticalAlignment.TOP, VerticalAlignment.TOP, VerticalAlignment.TOP, VerticalAlignment.TOP);

    private final Map<String, Map<String, String>> selectionTranslations = Map.of(
            "YES", Map.of("et", "Jah", "en", "Yes"),
            "PARTLY", Map.of("et", "Osaliselt", "en", "Partly"),
            "DONT_KNOW", Map.of("et", "Ei tea", "en", "Don't know"),
            "NO", Map.of("et", "Ei", "en", "No")
    );

    private final Map<String, XSSFColor> selectionBackground = Map.of(
            "YES", new XSSFColor(new byte[]{(byte) 179, (byte) 217, (byte) 155}),
            "PARTLY", new XSSFColor(new byte[]{(byte) 247, (byte) 222, (byte) 135}),
            "DONT_KNOW", new XSSFColor(new byte[]{(byte) 160, (byte) 206, (byte) 234}),
            "NO", new XSSFColor(new byte[]{(byte)  245, (byte) 148, (byte) 138})
    );

    private int rowCounter = 0;

    public Workbook generateExcel(Integer questionnaireId, String language) {
        Workbook workbook = new XSSFWorkbook();

        HashMap<Integer, HashMap<Integer, HashMap<Integer, List<ExcelCell>>>> answers = getAnswers(questionnaireId);

        answers.forEach((featureGroupId, featureMap) -> {
            rowCounter = 0;
            Sheet sheet = getSheet(workbook, featureGroupService.get(featureGroupId).getName());
            createSheetHeader(sheet, workbook, language);
            createSheetBody(sheet, workbook, language, featureMap);
        });

        return workbook;
    }

    private HashMap<Integer, HashMap<Integer, HashMap<Integer, List<ExcelCell>>>> getAnswers(Integer questionnaireId) {
        List<ValidationAnswer> validationAnswers = validationAnswerService.findByQuestionnaireId(questionnaireId);
        return getAnswersSortedByRowAndGroup(validationAnswers);
    }

    private Sheet getSheet(Workbook workbook, String name) {
        Sheet sheet1 = workbook.createSheet(name);
        for (int i = 0; i < columnsWidths.size(); i++) {
            sheet1.setColumnWidth(i, columnsWidths.get(i) * 256 / 7);
        }
        return sheet1;
    }

    private CellStyle getHeaderStyle(Workbook workbook, HorizontalAlignment horizontalAlignment) {
        CellStyle cellStyle = workbook.createCellStyle();

        byte[] rgb = new byte[]{(byte) 208, (byte) 229, (byte) 202};
        cellStyle.setFillForegroundColor(new XSSFColor(rgb));
        cellStyle.setFillPattern(FillPatternType.SOLID_FOREGROUND);

        cellStyle.setVerticalAlignment(VerticalAlignment.CENTER);
        cellStyle.setAlignment(horizontalAlignment);

        cellStyle.setBorderTop(BorderStyle.THIN);
        cellStyle.setBorderBottom(BorderStyle.THIN);
        cellStyle.setBorderLeft(BorderStyle.THIN);
        cellStyle.setBorderRight(BorderStyle.THIN);

        return cellStyle;
    }

    private CellStyle getCellStyle(Workbook workbook, HorizontalAlignment horizontalAlignment, VerticalAlignment verticalAlignment, ExcelCell cell) {
        CellStyle cellStyle = workbook.createCellStyle();

        if (cell != null && cell.type.equalsIgnoreCase("SELECT")) {
            cellStyle.setFillForegroundColor(selectionBackground.get(cell.value));
            cellStyle.setFillPattern(FillPatternType.SOLID_FOREGROUND);
        }

        cellStyle.setAlignment(horizontalAlignment);
        cellStyle.setVerticalAlignment(verticalAlignment);
        cellStyle.setBorderTop(BorderStyle.THIN);
        cellStyle.setBorderBottom(BorderStyle.THIN);
        cellStyle.setBorderLeft(BorderStyle.THIN);
        cellStyle.setBorderRight(BorderStyle.THIN);
        cellStyle.setWrapText(true);
        return cellStyle;
    }

    private void createSheetHeader(Sheet sheet1, Workbook workbook, String language) {
        Row row = sheet1.createRow(rowCounter);
        rowCounter++;
        row.setHeight((short) 800);

        List<String> headerNames = excelColumnService.getColumnNames(language);

        for (int i = 0; i < headerNames.size(); i++) {
            CellStyle headerStyle = getHeaderStyle(workbook, headerColumnsAlignment.get(i));
            Cell cell = row.createCell(i);
            if (i == 11) {
                sheet1.addMergedRegion(new CellRangeAddress(0, 0, 11, 13));
            }
            cell.setCellValue(headerNames.get(i));
            cell.setCellStyle(headerStyle);
        }
    }

    private void createSheetBody(Sheet sheet1, Workbook workbook, String language, HashMap<Integer, HashMap<Integer, List<ExcelCell>>> answers) {

        answers.forEach((groupId, rowMap) -> {
            int cellHeight = rowMap.size();
            String desc = rowMap.get(rowMap.keySet().iterator().next()).get(0).value;
            if (cellHeight > 1) {
                sheet1.addMergedRegion(new CellRangeAddress(rowCounter, rowCounter + cellHeight - 1, 0, 0));
                sheet1.addMergedRegion(new CellRangeAddress(rowCounter, rowCounter + cellHeight - 1, 1, 1));
            }

            rowMap.forEach((rowId, values) -> {
                Row row = sheet1.createRow(rowCounter);
                row.setHeight((short) -1);

                Cell cell0 = row.createCell(0);
                cell0.setCellValue(groupId);
                cell0.setCellStyle(getCellStyle(workbook, bodyColumnsAlignment.get(0), bodyColumnsVerticalAlignment.get(0), null));

                Cell cell1 = row.createCell(1);
                cell1.setCellValue(desc);
                cell1.setCellStyle(getCellStyle(workbook, bodyColumnsAlignment.get(1), bodyColumnsVerticalAlignment.get(1), null));

                for (int i = 1; i < values.size(); i++) {
                    Cell cell = row.createCell(i+1);
                    ExcelCell c = values.get(i);
                    cell.setCellValue(c.type.equalsIgnoreCase("SELECT") ? selectionTranslations.getOrDefault(c.value, Map.of()).getOrDefault(language, c.value) : c.value);
                    cell.setCellStyle(getCellStyle(workbook, bodyColumnsAlignment.get(i+1), bodyColumnsVerticalAlignment.get(i+1), c));
                }
                rowCounter++;
            });
        });

    }

    private HashMap<Integer, HashMap<Integer, HashMap<Integer, List<ExcelCell>>>> getAnswersSortedByRowAndGroup(List<ValidationAnswer> validationAnswers) {
        List<ExcelCell> cells = validationAnswers.stream().map(
                answer -> new ExcelCell(answer.getFeatureGroup().getId(), answer.getFeature().getId(), answer.getRowId(), answer.getAnswer(), answer.getType())
        ).toList();

        HashMap<Integer, HashMap<Integer, HashMap<Integer, List<ExcelCell>>>> result = new HashMap<>();

        for (ExcelCell cell : cells) {
            result.putIfAbsent(cell.featureGroupId, new HashMap<>());
            result.get(cell.featureGroupId).putIfAbsent(cell.featureId, new HashMap<>());
            result.get(cell.featureGroupId).get(cell.featureId).putIfAbsent(cell.rowId, new ArrayList<>());
            result.get(cell.featureGroupId).get(cell.featureId).get(cell.rowId).add(cell);
        }
        return result;
    }

}
