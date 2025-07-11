package ee.ut.eba.domain.io.service;

import com.fasterxml.jackson.databind.ObjectMapper;
import ee.ut.eba.domain.featuregroup.service.FeatureGroupService;
import ee.ut.eba.domain.io.model.ExcelCell;
import ee.ut.eba.domain.io.model.json.*;
import ee.ut.eba.domain.questionnaire.persistence.Questionnaire;
import ee.ut.eba.domain.questionnaire.service.QuestionnaireService;
import ee.ut.eba.domain.validationanswer.persistence.ValidationAnswer;
import ee.ut.eba.domain.validationanswer.service.ValidationAnswerService;
import java.io.IOException;
import java.util.*;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.apache.poi.ss.usermodel.*;
import org.apache.poi.ss.util.CellRangeAddress;
import org.apache.poi.xssf.usermodel.*;
import org.springframework.stereotype.Service;

@Slf4j
@Service
@RequiredArgsConstructor
public class ExportService {

	private final ValidationAnswerService validationAnswerService;
	private final FeatureGroupService featureGroupService;
	private final QuestionnaireService questionnaireService;

	private final List<Integer> columnsWidths = Arrays.asList(144, 420, 74, 201, 365, 365, 234, 234, 234, 234, 170, 452,
			201, 365, 602, 602);

	private final List<HorizontalAlignment> headerColumnsAlignment = Arrays.asList(HorizontalAlignment.CENTER,
			HorizontalAlignment.LEFT, HorizontalAlignment.RIGHT, HorizontalAlignment.CENTER, HorizontalAlignment.LEFT,
			HorizontalAlignment.LEFT, HorizontalAlignment.CENTER, HorizontalAlignment.CENTER,
			HorizontalAlignment.CENTER, HorizontalAlignment.CENTER, HorizontalAlignment.CENTER,
			HorizontalAlignment.CENTER, HorizontalAlignment.CENTER, HorizontalAlignment.CENTER,
			HorizontalAlignment.LEFT, HorizontalAlignment.LEFT);

	private final List<HorizontalAlignment> bodyColumnsAlignment = Arrays.asList(HorizontalAlignment.CENTER,
			HorizontalAlignment.LEFT, HorizontalAlignment.RIGHT, HorizontalAlignment.CENTER, HorizontalAlignment.LEFT,
			HorizontalAlignment.LEFT, HorizontalAlignment.CENTER, HorizontalAlignment.CENTER,
			HorizontalAlignment.CENTER, HorizontalAlignment.CENTER, HorizontalAlignment.CENTER,
			HorizontalAlignment.RIGHT, HorizontalAlignment.CENTER, HorizontalAlignment.LEFT, HorizontalAlignment.LEFT,
			HorizontalAlignment.LEFT);

	private final List<VerticalAlignment> bodyColumnsVerticalAlignment = Arrays.asList(VerticalAlignment.TOP,
			VerticalAlignment.TOP, VerticalAlignment.TOP, VerticalAlignment.TOP, VerticalAlignment.TOP,
			VerticalAlignment.TOP, VerticalAlignment.CENTER, VerticalAlignment.CENTER, VerticalAlignment.CENTER,
			VerticalAlignment.CENTER, VerticalAlignment.CENTER, VerticalAlignment.TOP, VerticalAlignment.TOP,
			VerticalAlignment.TOP, VerticalAlignment.TOP, VerticalAlignment.TOP);

	private final Map<String, Map<String, String>> selectionTranslations = Map.of("YES",
			Map.of("et", "Jah", "en", "Yes"), "PARTLY", Map.of("et", "Osaliselt", "en", "Partly"), "DONT_KNOW",
			Map.of("et", "Ei tea", "en", "Don't know"), "NO", Map.of("et", "Ei", "en", "No"));

	Map<String, List<String>> columnNames = Map.of("et",
			List.of("ID", "Funktsiooni kirjeldus", "", "Sidusrühm", "Funktsiooni eeltingimus", "Võrdluseks sobiv näide",
					"Sama sidusrühm?", "Sama kontekst?", "Tegevus eesmärgikohane?", "Sidusrühma rahulolu?",
					"Prioritiseeri", "Kirjeldus, mil määral on eeltingimus täidetud", "", "", "",
					"Järeldused ja tegevuskava"),
			"en",
			List.of("ID", "Feature description", "", "Stakeholder", "Feature precondition", "Comparison example",
					"The same stakeholder?", "The same context?", "Purposeful action?", "Stakeholder satisfaction?",
					"Prioritize", "To what extent the preconditions are met", "", "", "",
					"Conclusions and action plan"));

	private final Map<String, XSSFColor> selectionBackground = Map.of("YES",
			new XSSFColor(new byte[]{(byte) 179, (byte) 217, (byte) 155}), "PARTLY",
			new XSSFColor(new byte[]{(byte) 247, (byte) 222, (byte) 135}), "DONT_KNOW",
			new XSSFColor(new byte[]{(byte) 160, (byte) 206, (byte) 234}), "NO",
			new XSSFColor(new byte[]{(byte) 245, (byte) 148, (byte) 138}), "",
			new XSSFColor(new byte[]{(byte) 211, (byte) 211, (byte) 211}));

	private final Map<String, XSSFColor> backgroundColorMap = Map.of("var(--light-green)",
			new XSSFColor(new byte[]{(byte) 179, (byte) 217, (byte) 155}), "var(--light-orange)",
			new XSSFColor(new byte[]{(byte) 246, (byte) 186, (byte) 137}), "var(--light-red)",
			new XSSFColor(new byte[]{(byte) 245, (byte) 148, (byte) 138}), "var(--light-yellow)",
			new XSSFColor(new byte[]{(byte) 246, (byte) 227, (byte) 163}), "var(--light-blue)",
			new XSSFColor(new byte[]{(byte) 160, (byte) 206, (byte) 234}), "var(--light-grey)",
			new XSSFColor(new byte[]{(byte) 220, (byte) 220, (byte) 220}), "var(--beige)",
			new XSSFColor(new byte[]{(byte) 247, (byte) 241, (byte) 230}));

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

	public String getQuestionnaireJson(int questionnaireId) {
		try {
			Questionnaire questionnaire = questionnaireService.get(questionnaireId);
			QuestionaireJson questionaireJson = mapToJson(questionnaire);
			ObjectMapper mapper = new ObjectMapper();
			return mapper.writeValueAsString(questionaireJson);
		} catch (IOException e) {
			log.error(e.getMessage());
			return "";
		}
	}

	public QuestionaireJson mapToJson(Questionnaire questionnaire) {
		return new QuestionaireJson(questionnaire.getName(), validationAnswerService
				.findByQuestionnaireId(questionnaire.getId()).stream()
				.map(validationAnswer -> new ValidationAnswerJson(validationAnswer.getId(),
						validationAnswer.getAnswer(), validationAnswer.getRowId(), validationAnswer.getType(),
						validationAnswer.getQuestionnaire().getId(),
						new ValidationJson(validationAnswer.getValidation().getId(),
								validationAnswer.getValidation().getNameEt(),
								validationAnswer.getValidation().getNameEn(),
								validationAnswer.getValidation().getTooltipEt(),
								validationAnswer.getValidation().getTooltipEn(),
								validationAnswer.getValidation().getWeight(),
								validationAnswer.getValidation().getType()),
						new FeatureGroupJson(validationAnswer.getFeatureGroup().getId(),
								validationAnswer.getFeatureGroup().getName()),
						new FeaturePreconditionJson(validationAnswer.getFeaturePrecondition().getId(),
								validationAnswer.getFeaturePrecondition().getAnswer()),
						new FeatureJson(validationAnswer.getFeature().getId(),
								validationAnswer.getFeature().getAnswer(), validationAnswer.getFeature().getCustomId()),
						new StakeholderJson(
								validationAnswer.getStakeholder() != null
										? validationAnswer.getStakeholder().getId()
										: null,
								validationAnswer.getStakeholder() != null
										? validationAnswer.getStakeholder().getName()
										: null),
						validationAnswer.getBackgroundColor(), validationAnswer.getPrioritized(),
						validationAnswer.getConclusionChanged()))
				.toList());
	}

	private HashMap<Integer, HashMap<Integer, HashMap<Integer, List<ExcelCell>>>> getAnswers(Integer questionnaireId) {
		List<ValidationAnswer> validationAnswers = validationAnswerService.findByQuestionnaireId(questionnaireId);
		return getAnswersSortedByRowAndGroup(validationAnswers);
	}

	private Sheet getSheet(Workbook workbook, String name) {
		Sheet sheet1 = workbook.createSheet(name);
		for (int i = 0; i < columnsWidths.size(); i++) {
			int px = columnsWidths.get(i);
			int poiWidth = (int) ((px - 5) / 7. * 256 * 0.6);
			sheet1.setColumnWidth(i, poiWidth);
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

	private CellStyle getCellStyle(Workbook workbook, HorizontalAlignment horizontalAlignment,
			VerticalAlignment verticalAlignment, ExcelCell cell) {
		CellStyle cellStyle = workbook.createCellStyle();

		if (cell != null) {

			if ("SELECT".equalsIgnoreCase(cell.type)) {
				XSSFColor color = selectionBackground.get(cell.value.strip());
				if (color != null && cellStyle instanceof XSSFCellStyle xssfCellStyle) {
					xssfCellStyle.setFillForegroundColor(color);
					xssfCellStyle.setFillPattern(FillPatternType.SOLID_FOREGROUND);
				}
			}

			if (cell.backgroundColor != null) {
				XSSFColor bgColor = backgroundColorMap.get(cell.backgroundColor.strip());
				if (bgColor != null && cellStyle instanceof XSSFCellStyle xssfCellStyle) {
					xssfCellStyle.setFillForegroundColor(bgColor);
					xssfCellStyle.setFillPattern(FillPatternType.SOLID_FOREGROUND);
				}
			}
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

		List<String> headerNames = columnNames.get(language);

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

	private void createSheetBody(Sheet sheet1, Workbook workbook, String language,
			HashMap<Integer, HashMap<Integer, List<ExcelCell>>> answers) {

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
				cell0.setCellValue(values.get(0).customId);
				cell0.setCellStyle(
						getCellStyle(workbook, bodyColumnsAlignment.get(0), bodyColumnsVerticalAlignment.get(0), null));

				Cell cell1 = row.createCell(1);
				cell1.setCellValue(desc);
				cell1.setCellStyle(
						getCellStyle(workbook, bodyColumnsAlignment.get(1), bodyColumnsVerticalAlignment.get(1), null));

				for (int i = 1; i < values.size(); i++) {
					Cell cell = row.createCell(i + 1);
					ExcelCell c = values.get(i);
					if (i == 9) {
						// Check if row is prioritized
						boolean hasCheckmark = values.stream()
								.anyMatch(v -> "FEATURE_PRECONDITION".equalsIgnoreCase(v.type)
										&& Boolean.TRUE.equals(v.prioritized));

						if (hasCheckmark) {
							cell.setCellValue("✓");
						} else {
							cell.setCellValue("");
						}
					} else {
						cell.setCellValue(c.type.equalsIgnoreCase("SELECT")
								? selectionTranslations.getOrDefault(c.value, Map.of()).getOrDefault(language, c.value)
								: c.value);
					}
					cell.setCellStyle(getCellStyle(workbook, bodyColumnsAlignment.get(i + 1),
							bodyColumnsVerticalAlignment.get(i + 1), c));
				}
				rowCounter++;
			});
		});
	}

	private HashMap<Integer, HashMap<Integer, HashMap<Integer, List<ExcelCell>>>> getAnswersSortedByRowAndGroup(
			List<ValidationAnswer> validationAnswers) {
		List<ExcelCell> cells = validationAnswers.stream()
				.map(answer -> new ExcelCell(answer.getFeatureGroup().getId(), answer.getFeature().getId(),
						answer.getRowId(), answer.getAnswer(), answer.getType(), answer.getFeature().getCustomId(),
						answer.getPrioritized(), answer.getBackgroundColor()))
				.toList();

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
