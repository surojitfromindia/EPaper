import { InferSchemaType, model, Schema } from "mongoose";

const EntitySelectColumnSchema = new Schema({
  default_filter_order: {
    type: Number,
    required: true,
  },
  is_mandatory: {
    type: Boolean,
    required: true,
  },
  is_editable: {
    type: Boolean,
    required: true,
  },
  is_default_select_column: {
    type: Boolean,
    required: true,
  },
  value: {
    type: String,
    required: true,
  },
  key: {
    type: String,
    required: true,
  },
  is_sortable: {
    type: Boolean,
    required: true,
  },
});
const EntityViewSchemaDefaultFilterSchema = new Schema({
  header_and_sort_columns: [EntitySelectColumnSchema],
  title: {
    type: String,
    required: true,
  },
  value: {
    type: String,
    required: true,
  },
  key: {
    type: String,
    required: true,
  },
  is_default: {
    type: Boolean,
    required: true,
  },
  empty_msg: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    required: true,
  },
});
const EntityViewSchema = new Schema({
  default_filters: [EntityViewSchemaDefaultFilterSchema],
});

const CustomViewSchema = new Schema({
  entity_select_columns: {
    invoice: [EntitySelectColumnSchema],
    customer: [EntitySelectColumnSchema],
  },
  entity_views: {
    invoice: EntityViewSchema,
  },
});

type CustomViewType = InferSchemaType<typeof CustomViewSchema>;
type CustomViewEntitySelectColumnType = InferSchemaType<
  typeof EntitySelectColumnSchema
>;
type CustomViewEntityViewSchemaDefaultFilterType = InferSchemaType<
  typeof EntityViewSchemaDefaultFilterSchema
>;

const CustomViewModel = model("Custom_View", CustomViewSchema);
export { CustomViewModel };
export type {
  CustomViewType,
  CustomViewEntitySelectColumnType,
  CustomViewEntityViewSchemaDefaultFilterType,
};
