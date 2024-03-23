this is general setting
per branch if branch is active.
some fields will have value if some other fields or features are active
if "auto_generate" is true then we have invoice prefix etc.

```json
{
  "auto_generate": true,
  "autonumbergenerationgroup": {
    "autonumbergenerationgroup_id": "4570531000000080170",
    "autonumbergenerationgroup_name": "TYT"
  },
  "autonumbergenerationgroups_list": [
    {
      "autonumbergeneration": {
        "reset_frequency": "none",
        "ph_replaced_prefix": "INV-",
        "next_number": "000001",
        "autonumbergeneration_id": "4570531000000067001",
        "prefix_string": "INV-"
      },
      "autonumbergenerationgroup_id": "4570531000000080135",
      "autonumbergenerationgroup_name": "Default Transaction Series"
    },
    {
      "autonumbergeneration": {
        "reset_frequency": "none",
        "ph_replaced_prefix": "FINV-",
        "next_number": "000001",
        "autonumbergeneration_id": "4570531000000080190",
        "prefix_string": "FINV-"
      },
      "autonumbergenerationgroup_id": "4570531000000080170",
      "autonumbergenerationgroup_name": "TYT"
    }
  ],
  "prefix_string": "FINV-",
  "start_at": 1,
  "ph_replaced_prefix": "FINV-",
  "next_number": "000001",
  "reset_frequency": "none",
  "quantity_precision": 2,
  "discount_type": "entity_level",
  "is_discount_before_tax": true,
  "is_discount_tax_inclusive": false,
  "can_send_in_mail": false,
  "reference_text": "",
  "default_template_id": "4570531000000017001",
  "notes": "Thanks for your business.",
  "terms": "",
  "is_shipping_charge_required": true,
  "is_tax_on_shipping_required": false,
  "is_adjustment_required": true,
  "adjustment_description": "Adjustment",
  "is_open_invoice_editable": true,
  "warn_convert_to_open": true,
  "warn_create_creditnotes": true,
  "warn_attach_expense_receipt": true,
  "attach_expense_receipt_to_invoice": false,
  "invoice_item_type": "product",
  "is_show_invoice_setup": true,
  "is_sales_person_required": true,
  "is_inclusive_tax": false,
  "is_sales_inclusive_tax_enabled": false,
  "sales_tax_type": "exclusive",
  "entityfields": [
    {
      "parent_field_name": "line_items",
      "is_enabled": true,
      "is_configure_permission": true,
      "can_disable": false,
      "field_name_formatted": "Sales Price",
      "can_show_in_pdf": false,
      "parent_field_data_type": "array",
      "entity": "invoice",
      "field_name": "rate",
      "field_data_type": "amount"
    },
    {
      "is_enabled": true,
      "is_configure_permission": false,
      "can_disable": false,
      "field_name_formatted": "Sales person",
      "can_show_in_pdf": false,
      "entity": "invoice",
      "field_name": "sales_person_id",
      "field_data_type": "custom"
    },
    {
      "is_enabled": true,
      "is_configure_permission": false,
      "can_disable": true,
      "field_name_formatted": "Subject",
      "can_show_in_pdf": true,
      "entity": "invoice",
      "field_name": "subject",
      "field_data_type": "string"
    },
    {
      "is_enabled": false,
      "is_configure_permission": false,
      "can_disable": true,
      "field_name_formatted": "Supply Date",
      "can_show_in_pdf": false,
      "entity": "invoice",
      "field_name": "supply_date",
      "field_data_type": "date"
    },
    {
      "is_enabled": false,
      "is_configure_permission": false,
      "can_disable": true,
      "field_name_formatted": "E-Commerce Operator",
      "can_show_in_pdf": false,
      "entity": "invoice",
      "field_name": "merchant",
      "field_data_type": "string"
    }
  ],
  "tax_rounding_type": "default",
  "auto_number_uniqueness_yearly": false,
  "tax_override_preference": "no_override",
  "tds_override_preference": "no_override"
}
```

we currently need these fields

- auto_generate
- discount_type
- is_discount_before_tax
- is_discount_tax_inclusive
- reference_text
- notes
- terms
- is_open_invoice_editable
- is_show_invoice_setup
- is_inclusive_tax
- sales_tax_type

```json
{
  "is_estimate_enabled": false,
  "is_project_enabled": false,
  "is_purchaseorder_enabled": false,
  "is_salesorder_enabled": false,
  "is_zoho_inventory_enabled": false,
  "is_picklist_enabled": false,
  "is_creditnote_enabled": true,
  "is_deliverychallan_enabled": false,
  "is_recurring_invoice_enabled": false,
  "is_recurring_bill_enabled": false,
  "is_recurring_journal_enabled": false,
  "is_recurring_expense_enabled": false,
  "week_start_day": "sunday",
  "week_start_day_list": {
    "week_days": [
      {
        "day_formatted": "Sunday",
        "day": "sunday"
      },
      {
        "day_formatted": "Monday",
        "day": "monday"
      },
      {
        "day_formatted": "Saturday",
        "day": "saturday"
      }
    ]
  },
  "is_start_end_time_default_logtime": false,
  "attach_pdf_for_email": "link_and_pdf",
  "is_show_powered_by": false,
  "is_cp_banner_enabled": true,
  "is_show_invoice_setup": false,
  "discount_type": "entity_level",
  "is_discount_tax_inclusive_pref_enabled": false,
  "is_discount_before_tax": false,
  "is_shipping_charge_required": true,
  "is_landed_cost_enabled": false,
  "is_tax_on_shipping_enabled": false,
  "is_self_billed_invoice_enabled": false,
  "is_adjustment_required": true,
  "is_sales_person_required": true,
  "organization_address_format": "${ORGANIZATION.CITY} ${ORGANIZATION.STATE} ${ORGANIZATION.POSTAL_CODE}\n${ORGANIZATION.COUNTRY}\n${ORGANIZATION.PHONE}\n${ORGANIZATION.EMAIL}\n${ORGANIZATION.WEBSITE}",
  "customer_address_format": "${CONTACT.CONTACT_DISPLAYNAME}\n${CONTACT.CONTACT_ADDRESS}\n${CONTACT.CONTACT_CITY}\n${CONTACT.CONTACT_CODE} ${CONTACT.CONTACT_STATE}\n${CONTACT.CONTACT_COUNTRY}",
  "customer_shipping_address_format": "${CONTACT.CONTACT_DISPLAYNAME}\n${CONTACT.CONTACT_ADDRESS}\n${CONTACT.CONTACT_CITY}\n${CONTACT.CONTACT_CODE} ${CONTACT.CONTACT_STATE}\n${CONTACT.CONTACT_COUNTRY}",
  "is_retainerinvoice_enabled": false,
  "default_retainer_account_id": "4570531000000005001",
  "retainer_accounts": [
    {
      "account_type": "other_current_liability",
      "account_id": "4570531000000005001",
      "account_name": "Unearned Revenue",
      "account_type_formatted": "Other Current Liability"
    },
    {
      "account_type": "other_current_liability",
      "account_id": "4570531000000035003",
      "account_name": "Employee Reimbursements",
      "account_type_formatted": "Other Current Liability"
    }
  ],
  "is_pricebooks_enabled": false,
  "timesheet_rounding_type": "no_rounding",
  "timesheet_rounding_type_formatted": "No Rounding",
  "timesheet_rounding_value": "",
  "timesheet_max_time_limit_per_day": "24:00",
  "is_sales_inclusive_tax_enabled": false,
  "sales_tax_type": "inclusive",
  "is_encrypt_pdf": false,
  "can_send_org_summary": false,
  "can_show_weekly_summary_report": true,
  "books_start_date": "",
  "books_start_date_formatted": "",
  "is_inventory_enabled": false,
  "is_purchase_approval_enabled": false,
  "is_sales_approval_enabled": false,
  "send_mail_on_approval": false,
  "send_mail_on_submission": false,
  "email_id_for_submission_mail": "",
  "transaction_rounding_type": "no_rounding",
  "is_total_truncate_enabled": false,
  "rounding_description": "Rounding",
  "discount_setting": "percentage",
  "discount_level": "",
  "previous_product_option": "",
  "duplicate_copy_labels": {
    "original_copy_label": "ORIGINAL",
    "goods_duplicate_copy_label": "DUPLICATE",
    "goods_triplicate_copy_label": "TRIPLICATE",
    "duplicate_copy_label_font_size": 8,
    "quadruplicate_copy_label": "QUADRUPLICATE",
    "triplicate_copy_label": "TRIPLICATE",
    "goods_original_copy_label": "ORIGINAL",
    "no_of_copies": 0,
    "quintuplicate_copy_label": "QUINTUPLICATE",
    "duplicate_copy_label": "DUPLICATE",
    "service_duplicate_copy_label": "DUPLICATE",
    "service_original_copy_label": "ORIGINAL"
  },
  "timesheet_approval": {
    "is_timesheet_user_approval_enabled": false,
    "can_attach_timesheet_pdf_in_approval_email": false,
    "is_timesheet_client_approval_enabled": false
  },
  "is_customer_debit_note_enabled": false,
  "is_payment_links_enabled": false,
  "tax_rounding_type": "item_level",
  "default_billable_income_account_id": "",
  "default_billable_income_account_name": "",
  "default_markup_percent": "",
  "default_markup_percent_formatted": "",
  "is_sales_receipt_enabled": false,
  "is_proforma_invoice_enabled": false,
  "purchase_discount": {
    "track_discount_in_account": true
  },
  "is_todo_enabled": false,
  "loyalty_status": false,
  "loyalty_account_id": "",
  "loyalty_accounts": [
    {
      "account_type": "income",
      "account_id": "4570531000000000406",
      "account_name": "Discount",
      "account_type_formatted": "Income"
    }
  ]
}
```

need to work for invoice journal.