import { addDays, addWeeks, addMonths, addYears, format, isBefore, isAfter } from "date-fns";

export function generateRecurringDates(pattern, startDate, count = 10) {
    const dates = [];
    let currentDate = new Date(startDate);
    let iterations = 0;
    const maxIterations = count * 10; // Safety limit

    while (dates.length < count && iterations < maxIterations) {
        iterations++;

        // Check if we should include this date
        let shouldInclude = false;

        switch (pattern.type) {
            case 'daily':
                shouldInclude = true;
                break;

            case 'weekly':
                if (pattern.daysOfWeek && pattern.daysOfWeek.length > 0) {
                    const dayName = format(currentDate, 'EEEE').toLowerCase();
                    shouldInclude = pattern.daysOfWeek.includes(dayName);
                } else {
                    shouldInclude = true;
                }
                break;

            case 'monthly':
                shouldInclude = currentDate.getDate() === pattern.dayOfMonth;
                break;

            case 'yearly':
                shouldInclude = currentDate.getDate() === pattern.dayOfMonth && 
                              currentDate.getMonth() + 1 === pattern.monthOfYear;
                break;
        }

        if (shouldInclude) {
            // Check end date
            if (pattern.endDate && isAfter(currentDate, pattern.endDate)) {
                break;
            }

            dates.push(new Date(currentDate));
        }

        // Move to next date based on pattern
        switch (pattern.type) {
            case 'daily':
                currentDate = addDays(currentDate, pattern.interval || 1);
                break;
            case 'weekly':
                currentDate = addWeeks(currentDate, pattern.interval || 1);
                break;
            case 'monthly':
                currentDate = addMonths(currentDate, pattern.interval || 1);
                break;
            case 'yearly':
                currentDate = addYears(currentDate, pattern.interval || 1);
                break;
        }
    }

    return dates;
}

export function getNextOccurrence(pattern, startDate, fromDate = new Date()) {
    const dates = generateRecurringDates(pattern, startDate, 100);
    return dates.find(date => isAfter(date, fromDate)) || null;
}

export function formatRecurrencePattern(pattern) {
    const { type, interval, daysOfWeek, dayOfMonth, monthOfYear } = pattern;

    switch (type) {
        case 'daily':
            return interval === 1 ? 'Daily' : `Every ${interval} days`;

        case 'weekly':
            if (daysOfWeek && daysOfWeek.length > 0) {
                const dayNames = daysOfWeek.map(day => day.charAt(0).toUpperCase() + day.slice(1));
                const prefix = interval === 1 ? 'Weekly on' : `Every ${interval} weeks on`;
                return `${prefix} ${dayNames.join(', ')}`;
            }
            return interval === 1 ? 'Weekly' : `Every ${interval} weeks`;

        case 'monthly':
            const suffix = getOrdinalSuffix(dayOfMonth);
            const prefix = interval === 1 ? 'Monthly on the' : `Every ${interval} months on the`;
            return `${prefix} ${dayOfMonth}${suffix}`;

        case 'yearly':
            const monthNames = [
                'January', 'February', 'March', 'April', 'May', 'June',
                'July', 'August', 'September', 'October', 'November', 'December'
            ];
            const monthName = monthNames[monthOfYear - 1];
            const daySuffix = getOrdinalSuffix(dayOfMonth);
            return `Annually on ${monthName} ${dayOfMonth}${daySuffix}`;

        default:
            return 'Custom pattern';
    }
}

function getOrdinalSuffix(num) {
    const lastDigit = num % 10;
    const lastTwoDigits = num % 100;

    if (lastTwoDigits >= 11 && lastTwoDigits <= 13) {
        return 'th';
    }

    switch (lastDigit) {
        case 1: return 'st';
        case 2: return 'nd';
        case 3: return 'rd';
        default: return 'th';
    }
}

export function validateRecurrencePattern(pattern) {
  const errors = [];

  if (!pattern) {
    errors.push('Pattern is required');
    return errors;
  }

  if (!pattern.type) {
    errors.push('Recurrence type is required');
  }

  if (!pattern.startDate) {
    errors.push('Start date is required');
  }

  if (pattern.interval && (pattern.interval < 1 || pattern.interval > 999)) {
    errors.push('Interval must be between 1 and 999');
  }

  if (pattern.type === 'weekly' && pattern.daysOfWeek) {
    if (!Array.isArray(pattern.daysOfWeek)) {
      errors.push('Days of week must be an array');
    } else if (pattern.daysOfWeek.some(day => day < 0 || day > 6)) {
      errors.push('Days of week must be between 0 (Sunday) and 6 (Saturday)');
    }
  }

  if (pattern.endDate && pattern.startDate) {
    const startDate = new Date(pattern.startDate);
    const endDate = new Date(pattern.endDate);
    if (isAfter(startDate, endDate)) {
      errors.push('End date must be after start date');
    }
  }

  return errors;
}