// list of pre-defined date formats
// array of luxon date formats with locales

// db date format postgres

const DATE_FORMAT_DB = "yyyy-MM-dd";
const DATE_FORMATS_OBJECT = [
  {
    formats: [
      "yyyy-MM-dd",
      "yyyy-MM-dd",
      "dd-MM-yyyy",
      "MM-dd-yyyy",
      "dd/MM/yyyy",
      "MM/dd/yyyy",
      "dd.MM.yyyy",
      "MM.dd.yyyy",
      "dd MM yyyy",
      "MM dd yyyy",
      "dd,MM,yyyy",
      "MM,dd,yyyy",
      "dd MM,yyyy",
      "MM dd,yyyy",
      "dd.MM.yyyy",
      "MM.dd.yyyy",
      "dd-MM-yyyy",
      "MM-dd-yyyy",
      "dd/MM/yyyy",
      "MM/dd/yyyy",
      "dd MM yyyy",
      "MM dd yyyy",
      "dd,MM,yyyy",
      "MM,dd,yyyy",
      "dd MM,yyyy",
    ],
    locale: "en-US",
  },
  {
    formats: [
      // for japanese
      "yyyy年MM月dd日",
      "yyyy年M月d日",
      "yyyy年MM月d日",
      "yyyy年M月dd日",
    ],
    locale: "ja-JP",
  },
];
const DATE_FORMATS = DATE_FORMATS_OBJECT.map((obj) => obj.formats).flat();
export { DATE_FORMATS, DATE_FORMATS_OBJECT, DATE_FORMAT_DB };
