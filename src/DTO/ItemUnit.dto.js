class ItemUnitDTO {
  static toItemUnit(item_unit) {
    return {
      unit_id: item_unit.id,
      name: item_unit?.name ?? "",
      unit: item_unit.unit,
      status: item_unit.status,
    };
  }
}

export default ItemUnitDTO;
