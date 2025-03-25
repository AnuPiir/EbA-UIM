package ee.ut.eba.domain.io.model.json;

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
