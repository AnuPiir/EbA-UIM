package ee.ut.eba.domain.export.model.json;

public record ValidationJson (
        Integer id,
        String nameEt,
        String nameEn,
        String tooltipEt,
        String tooltipEn,
        Integer weight,
        String type
){
}
