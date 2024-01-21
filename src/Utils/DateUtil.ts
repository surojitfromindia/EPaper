import { DateTime, FixedOffsetZone, Zone } from "luxon";

class DateUtil {
  static Formatter(date: Date | string): DateFormatter {
    return new DateFormatter(date);
  }

  static Calculator(date: Date): DateCalculator {
    return new DateCalculator(date);
  }

  static parseFromStr(dateStr: string): Date {
    return DateTime.fromISO(dateStr).toJSDate();
  }

  static daysBetween(date1: Date, date2: Date): number {
    const luxonDate1 = DateTime.fromJSDate(date1);
    const luxonDate2 = DateTime.fromJSDate(date2);
    const diff = luxonDate2.diff(luxonDate1, "days");
    return Math.round(diff.days);
  }
}

class DateFormatter {
  private date: Date;
  private local = "en-US";
  private zone: Zone = FixedOffsetZone.parseSpecifier("+00.00");

  constructor(date: Date | string) {
    if (typeof date === "string") {
      this.date = DateUtil.parseFromStr(date);
    } else {
      this.date = date;
    }
  }

  /**
   * @description format date
   * @param dateFormat
   * @param timezone
   */
  format(dateFormat: string, timezone?: string): string {
    if (timezone) {
      this.zone = FixedOffsetZone.parseSpecifier(timezone);
    }
    return DateTime.fromJSDate(this.date, {
      zone: this.zone,
    })
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

  endOfCurrentDay(): DateCalculator {
    this.dateTime = this.dateTime.endOf("day");
    return this;
  }

  // returns the date object
  getDate(): Date {
    return this.dateTime.toJSDate();
  }
}

export { DateUtil };
