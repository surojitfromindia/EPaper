import { DateTime } from "luxon";

class DateUtil {
  static Formatter(date: Date): DateFormatter {
    return new DateFormatter(date);
  }

  static Calculator(date: Date): DateCalculator {
    return new DateCalculator(date);
  }
}

class DateFormatter {
  private date: Date;
  private local = "en-US";

  constructor(date: Date) {
    this.date = date;
  }

  // passing a date format string and timezone and a date object
  // returns a formatted date string using luxon
  format(dateFormat: string, timezone: string): string {
    return DateTime.fromJSDate(this.date, { zone: timezone })
      .setLocale(this.local)
      .toFormat(dateFormat);
  }

  setLocale(locale: string): DateFormatter {
    this.local = locale;
    return this;
  }
}

class DateCalculator {
  private dateTime: DateTime;

  constructor(date: Date) {
    this.dateTime = DateTime.fromJSDate(date);
  }

  addDays(days: number): DateCalculator {
    // add days to the date
    this.dateTime = this.dateTime.plus({ days });
    return this;
  }

  addMonths(months: number): DateCalculator {
    // add months to the date
    this.dateTime = this.dateTime.plus({ months });
    return this;
  }

  endOfFewMonths(months: number): DateCalculator {
    // add months to the date
    this.dateTime = this.dateTime.plus({ months }).endOf("month");
    return this;
  }

  endOfFewWeeks(weeks: number): DateCalculator {
    this.dateTime = this.dateTime.plus({ weeks }).endOf("week");
    return this;
  }

  // returns the date object
  getDate(): Date {
    return this.dateTime.toJSDate();
  }
}

export { DateUtil };
