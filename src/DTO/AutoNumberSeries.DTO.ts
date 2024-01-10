import { IAutoNumber } from "../Models/AutoNumberSeries/AutoNumber.model";

class AutoNumberSeriesDTO {
  static toAutoNumberSeries(auto_number_series: any) {
    return {
      auto_number_group_id: auto_number_series.id,
      auto_number_group_name: auto_number_series.name,
      is_default: auto_number_series.isDefault,
      list: auto_number_series.AutoNumbers.map((entry: IAutoNumber) =>
        this.#toAutoNumber(entry),
      ),
    };
  }

  static #toAutoNumber = (auto_number: IAutoNumber) => {
    return {
      entity_type: auto_number.entityType,
      prefix_string: auto_number.prefixString,
      next_number: auto_number.nextNumber,
      number_zero_pad: auto_number.numberZeroPad,
    };
  };
}

export { AutoNumberSeriesDTO };
