// src.test DateUtil.ts
import { DateUtil } from "../../../src/Utils/DateUtil";

describe("DateFormatter", () => {
  // a indian time zone date
  const date = new Date("2020-12-31T00:00:00.000+00:00");
  const formatter = DateUtil.Formatter(date).setLocale("en-US");

  test("format", () => {
    expect(formatter.format("yyyy-MM-dd", "+05.30")).toBe("2020-12-31");
  });
});

describe("DateCalculator", () => {
  const date = new Date("2020-05-01T00:00:00.000+00:00");
  test("addDays 10 days", () => {
    const newDate = DateUtil.Calculator(date).addDays(10).getDate();
    const formatter = DateUtil.Formatter(newDate);
    expect(formatter.format("yyyy-MM-dd", "+05.30")).toBe("2020-05-11");
  });
  test("addMonths 2 months", () => {
    const newDate = DateUtil.Calculator(date).addMonths(2).getDate();
    const formatter = DateUtil.Formatter(newDate);
    expect(formatter.format("yyyy-MM-dd", "+05.30")).toBe("2020-07-01");
  });
  test("end of current month", () => {
    const newDate = DateUtil.Calculator(date).endOfFewMonths(0).getDate();
    const formatter = DateUtil.Formatter(newDate);
    expect(formatter.format("yyyy-MM-dd", "+05.30")).toBe("2020-05-31");
  });
  test("end of next month", () => {
    const newDate = DateUtil.Calculator(date).endOfFewMonths(1).getDate();
    const formatter = DateUtil.Formatter(newDate);
    expect(formatter.format("yyyy-MM-dd", "+05.30")).toBe("2020-06-30");
  });
  test("end of next 2 months", () => {
    const newDate = DateUtil.Calculator(date).endOfFewMonths(2).getDate();
    const formatter = DateUtil.Formatter(newDate);
    expect(formatter.format("yyyy-MM-dd", "+05.30")).toBe("2020-07-31");
  });
  test("end of day", () => {
    const newDate = DateUtil.Calculator(date).endOfCurrentDay().getDate();
    const formatter = DateUtil.Formatter(newDate);
    expect(formatter.format("yyyy-MM-dd", "+05.30")).toBe("2020-05-01");
  });
});
