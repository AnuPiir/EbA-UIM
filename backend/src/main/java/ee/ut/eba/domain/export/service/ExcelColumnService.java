package ee.ut.eba.domain.export.service;

import ee.ut.eba.domain.export.persistance.ExcelColumn;
import ee.ut.eba.domain.export.persistance.ExcelColumnRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.List;

@Slf4j
@Service
@RequiredArgsConstructor
public class ExcelColumnService {

    private final ExcelColumnRepository excelColumnRepository;

    public List<ExcelColumn> get() {
        return excelColumnRepository.findAll();
    }

    public List<String> getColumnNames(String language) {
        List<ExcelColumn> columns = excelColumnRepository.findAll();
        return columns.stream().map(
                column ->
                        language.equalsIgnoreCase("et") ? column.getName_et() : column.getName_en()
        ).toList();
    }

}
