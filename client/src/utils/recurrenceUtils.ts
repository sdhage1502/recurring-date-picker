import { RecurrencePattern } from "@shared/schema";
import { addDays, addWeeks, addMonths, addYears, format, getDay, startOfMonth, getDate, isSameDay } from "date-fns";

export function generateRecurringDates(
  pattern: RecurrencePattern,
  maxDates: number = 50
): Date[] {
  const dates: Date[] = [];
  const startDate = new Date(pattern.startDate);
  const endDate = pattern.endDate ? new Date(pattern.endDate) : null;
  
  let currentDate = new Date(startDate);
  let count = 0;
  
  while (count < maxDates) {
    if (endDate && currentDate > endDate) break;
    
    if (shouldIncludeDate(currentDate, pattern, startDate)) {
      dates.push(new Date(currentDate));
      count++;
    }
    
    currentDate = getNextDate(currentDate, pattern);
    
    // Prevent infinite loops
    if (count === 0 && dates.length === 0) {
      currentDate = addDays(currentDate, 1);
    }
  }
  
  return dates;
}

function shouldIncludeDate(
  date: Date, 
  pattern: RecurrencePattern, 
  startDate: Date
): boolean {
  switch (pattern.type) {
    case "daily":
      return shouldIncludeDailyDate(date, pattern, startDate);
    case "weekly":
      return shouldIncludeWeeklyDate(date, pattern);
    case "monthly":
      return shouldIncludeMonthlyDate(date, pattern, startDate);
    case "yearly":
      return shouldIncludeYearlyDate(date, pattern, startDate);
    default:
      return false;
  }
}

function shouldIncludeDailyDate(
  date: Date, 
  pattern: RecurrencePattern, 
  startDate: Date
): boolean {
  const daysDiff = Math.floor((date.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24));
  return daysDiff >= 0 && daysDiff % pattern.interval === 0;
}

function shouldIncludeWeeklyDate(
  date: Date, 
  pattern: RecurrencePattern
): boolean {
  if (!pattern.daysOfWeek || pattern.daysOfWeek.length === 0) {
    return false;
  }
  
  const dayOfWeek = getDay(date);
  return pattern.daysOfWeek.includes(dayOfWeek);
}

function shouldIncludeMonthlyDate(
  date: Date, 
  pattern: RecurrencePattern, 
  startDate: Date
): boolean {
  if (pattern.monthlyPattern === "date") {
    return getDate(date) === getDate(startDate);
  } else if (pattern.monthlyPattern === "weekday" && pattern.nthWeekday) {
    return isNthWeekdayOfMonth(date, pattern.nthWeekday.week, pattern.nthWeekday.day);
  }
  
  return false;
}

function shouldIncludeYearlyDate(
  date: Date, 
  pattern: RecurrencePattern, 
  startDate: Date
): boolean {
  return (
    date.getMonth() === startDate.getMonth() &&
    getDate(date) === getDate(startDate)
  );
}

function getNextDate(currentDate: Date, pattern: RecurrencePattern): Date {
  switch (pattern.type) {
    case "daily":
      return addDays(currentDate, pattern.interval);
    case "weekly":
      return addDays(currentDate, 1);
    case "monthly":
      return addDays(currentDate, 1);
    case "yearly":
      return addDays(currentDate, 1);
    default:
      return addDays(currentDate, 1);
  }
}

function isNthWeekdayOfMonth(date: Date, nthWeek: number, targetDay: number): boolean {
  const dayOfWeek = getDay(date);
  if (dayOfWeek !== targetDay) return false;
  
  const dateOfMonth = getDate(date);
  const firstDayOfMonth = startOfMonth(date);
  const firstTargetDay = getDay(firstDayOfMonth);
  
  let firstOccurrence = 1 + ((targetDay - firstTargetDay + 7) % 7);
  let nthOccurrence = firstOccurrence + (nthWeek - 1) * 7;
  
  // Handle "last" occurrence (nthWeek = 5)
  if (nthWeek === 5) {
    const lastDayOfMonth = new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
    const fourthOccurrence = firstOccurrence + 3 * 7;
    
    if (fourthOccurrence + 7 > lastDayOfMonth) {
      nthOccurrence = fourthOccurrence;
    } else {
      nthOccurrence = fourthOccurrence + 7;
    }
  }
  
  return dateOfMonth === nthOccurrence;
}

export function formatRecurrencePattern(pattern: RecurrencePattern): string {
  switch (pattern.type) {
    case "daily":
      return pattern.interval === 1 
        ? "Every day" 
        : `Every ${pattern.interval} days`;
    
    case "weekly":
      if (!pattern.daysOfWeek || pattern.daysOfWeek.length === 0) {
        return "Weekly (no days selected)";
      }
      
      const dayNames = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
      const selectedDays = pattern.daysOfWeek.map(day => dayNames[day]).join(", ");
      
      return pattern.interval === 1
        ? `Every ${selectedDays}`
        : `Every ${pattern.interval} weeks on ${selectedDays}`;
    
    case "monthly":
      if (pattern.monthlyPattern === "weekday" && pattern.nthWeekday) {
        const weekNames = ["", "first", "second", "third", "fourth", "last"];
        const dayNames = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
        
        return `${weekNames[pattern.nthWeekday.week]} ${dayNames[pattern.nthWeekday.day]} of every month`;
      }
      
      return pattern.interval === 1
        ? "Same date every month"
        : `Same date every ${pattern.interval} months`;
    
    case "yearly":
      const startDate = new Date(pattern.startDate);
      return `Every ${format(startDate, "MMMM d")}`;
    
    default:
      return "Custom pattern";
  }
}
