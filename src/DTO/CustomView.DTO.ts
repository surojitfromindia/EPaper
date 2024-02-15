class CustomViewDTO {
  static toFullCustomView(data: any) {
    return {
      entity_select_columns: {
        invoice: data.entity_select_columns.invoice
          .sort(
            (a: any, b: any) => a.default_filter_order - b.default_filter_order,
          )
          .map(this.#toEntitySelectColumn),
      },
      entity_views: {
        invoice: {
          default_filters: data.entity_views.invoice.default_filters.map(
            this.#toEntityDefaultFilter,
          ),
        },
      },
    };
  }

  static #toEntitySelectColumn(col: any) {
    return {
      default_filter_order: col.default_filter_order,
      is_mandatory: col.is_mandatory,
      is_editable: col.is_editable,
      is_default_select_column: col.is_default_select_column,
      value: col.value,
      key: col.key,
      is_sortable: col.is_sortable,
      alias: col.alias,
      align: col.align,
    };
  }

  static #toEntityDefaultFilter(filter: any) {
    return {
      title: filter.title,
      value: filter.value,
      key: filter.key,
      is_default: filter.is_default,
      empty_msg: filter.empty_msg,
      status: filter.status,
    };
  }
}

export { CustomViewDTO };
