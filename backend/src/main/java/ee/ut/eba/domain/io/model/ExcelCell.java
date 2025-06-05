package ee.ut.eba.domain.io.model;

public class ExcelCell {
	public int featureGroupId;
	public int featureId;
	public int rowId;
	public String value;
	public String type;
	public String customId;

	public ExcelCell(int featureGroupId, int featureId, int rowId, String value, String type, String customId) {
		this.featureGroupId = featureGroupId;
		this.featureId = featureId;
		this.rowId = rowId;
		this.value = value;
		this.type = type;
		this.customId = customId;
	}
}
