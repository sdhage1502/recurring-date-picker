import { generateRecurringDates, formatRecurrencePattern } from "../utils/recurrenceUtils";
import { RecurrencePattern } from "@shared/schema";

describe("recurrenceUtils", () => {
  describe("generateRecurringDates", () => {
    it("should generate daily recurring dates", () => {
      const pattern: RecurrencePattern = {
        type: "daily",
        interval: 1,
        startDate: "2025-01-01",
      };

      const dates = generateRecurringDates(pattern, 5);
      
      expect(dates).toHaveLength(5);
      expect(dates[0].toISOString().split('T')[0]).toBe("2025-01-01");
      expect(dates[1].toISOString().split('T')[0]).toBe("2025-01-02");
      expect(dates[4].toISOString().split('T')[0]).toBe("2025-01-05");
    });

    it("should generate weekly recurring dates", () => {
      const pattern: RecurrencePattern = {
        type: "weekly",
        interval: 1,
        daysOfWeek: [1, 3, 5], // Monday, Wednesday, Friday
        startDate: "2025-01-06", // Monday
      };

      const dates = generateRecurringDates(pattern, 6);
      
      expect(dates.length).toBeGreaterThan(0);
      // Check that all dates fall on the correct days of week
      dates.forEach(date => {
        const dayOfWeek = date.getDay();
        expect([1, 3, 5]).toContain(dayOfWeek);
      });
    });

    it("should generate monthly recurring dates with date pattern", () => {
      const pattern: RecurrencePattern = {
        type: "monthly",
        interval: 1,
        monthlyPattern: "date",
        startDate: "2025-01-15",
      };

      const dates = generateRecurringDates(pattern, 3);
      
      expect(dates.length).toBeGreaterThan(0);
      // Check that all dates fall on the 15th
      dates.forEach(date => {
        expect(date.getDate()).toBe(15);
      });
    });

    it("should generate monthly recurring dates with weekday pattern", () => {
      const pattern: RecurrencePattern = {
        type: "monthly",
        interval: 1,
        monthlyPattern: "weekday",
        nthWeekday: { week: 2, day: 2 }, // Second Tuesday
        startDate: "2025-01-01",
      };

      const dates = generateRecurringDates(pattern, 3);
      
      expect(dates.length).toBeGreaterThan(0);
      // Check that all dates are Tuesdays (day 2)
      dates.forEach(date => {
        expect(date.getDay()).toBe(2);
      });
    });

    it("should respect end date", () => {
      const pattern: RecurrencePattern = {
        type: "daily",
        interval: 1,
        startDate: "2025-01-01",
        endDate: "2025-01-03",
      };

      const dates = generateRecurringDates(pattern, 10);
      
      expect(dates).toHaveLength(3); // Jan 1, 2, 3
      dates.forEach(date => {
        expect(date <= new Date("2025-01-03")).toBe(true);
      });
    });
  });

  describe("formatRecurrencePattern", () => {
    it("should format daily patterns correctly", () => {
      const pattern: RecurrencePattern = {
        type: "daily",
        interval: 1,
        startDate: "2025-01-01",
      };

      expect(formatRecurrencePattern(pattern)).toBe("Every day");

      const patternWithInterval: RecurrencePattern = {
        ...pattern,
        interval: 3,
      };

      expect(formatRecurrencePattern(patternWithInterval)).toBe("Every 3 days");
    });

    it("should format weekly patterns correctly", () => {
      const pattern: RecurrencePattern = {
        type: "weekly",
        interval: 1,
        daysOfWeek: [1, 3, 5],
        startDate: "2025-01-01",
      };

      expect(formatRecurrencePattern(pattern)).toBe("Every Mon, Wed, Fri");

      const patternWithInterval: RecurrencePattern = {
        ...pattern,
        interval: 2,
      };

      expect(formatRecurrencePattern(patternWithInterval)).toBe("Every 2 weeks on Mon, Wed, Fri");
    });

    it("should format monthly weekday patterns correctly", () => {
      const pattern: RecurrencePattern = {
        type: "monthly",
        interval: 1,
        monthlyPattern: "weekday",
        nthWeekday: { week: 2, day: 2 },
        startDate: "2025-01-01",
      };

      expect(formatRecurrencePattern(pattern)).toBe("second Tuesday of every month");
    });

    it("should format yearly patterns correctly", () => {
      const pattern: RecurrencePattern = {
        type: "yearly",
        interval: 1,
        startDate: "2025-06-15",
      };

      expect(formatRecurrencePattern(pattern)).toBe("Every June 15");
    });
  });
});
