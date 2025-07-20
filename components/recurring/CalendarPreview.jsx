
import React, { useMemo } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useRecurrenceStore } from "@/store/recurrenceStore";
import { generateRecurringDates, formatRecurrencePattern } from "@/utils/recurrenceUtils";
import { format, startOfMonth, endOfMonth, eachDayOfInterval, isSameMonth, isSameDay } from "date-fns";

export function CalendarPreview() {
  const { pattern } = useRecurrenceStore();
  const [currentMonth, setCurrentMonth] = React.useState(new Date());

  const recurringDates = useMemo(() => {
    if (!pattern.type || !pattern.startDate) return [];
    
    try {
      return generateRecurringDates(pattern, 365);
    } catch (error) {
      console.error("Error generating recurring dates:", error);
      return [];
    }
  }, [pattern]);

  const monthStart = startOfMonth(currentMonth);
  const monthEnd = endOfMonth(currentMonth);
  const monthDays = eachDayOfInterval({ start: monthStart, end: monthEnd });

  const isRecurringDate = (date) => {
    return recurringDates.some(recurringDate => isSameDay(date, recurringDate));
  };

  const navigateMonth = (direction) => {
    setCurrentMonth(prev => {
      const newMonth = new Date(prev);
      if (direction === "prev") {
        newMonth.setMonth(prev.getMonth() - 1);
      } else {
        newMonth.setMonth(prev.getMonth() + 1);
      }
      return newMonth;
    });
  };

  // Create calendar grid with proper week structure
  const getCalendarGrid = () => {
    const firstDayOfMonth = monthStart.getDay();
    const daysInPrevMonth = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), 0).getDate();
    
    const grid = [];
    
    // Previous month's trailing days
    for (let i = firstDayOfMonth - 1; i >= 0; i--) {
      const date = new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1, daysInPrevMonth - i);
      grid.push({ date, isCurrentMonth: false, isToday: false });
    }
    
    // Current month's days
    monthDays.forEach(date => {
      grid.push({ 
        date, 
        isCurrentMonth: true, 
        isToday: isSameDay(date, new Date()) 
      });
    });
    
    // Next month's leading days to complete the grid
    const remainingSlots = 42 - grid.length;
    for (let i = 1; i <= remainingSlots; i++) {
      const date = new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, i);
      grid.push({ date, isCurrentMonth: false, isToday: false });
    }
    
    return grid;
  };

  const calendarGrid = getCalendarGrid();

  return (
    <div className="space-y-6">
      <h3 className="text-lg font-semibold text-gray-900">Preview Calendar</h3>
      
      <div className="bg-gray-50 rounded-xl p-6">
        {/* Calendar Header */}
        <div className="flex items-center justify-between mb-4">
          <h4 className="font-semibold text-gray-900">
            {format(currentMonth, "MMMM yyyy")}
          </h4>
          <div className="flex space-x-2">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => navigateMonth("prev")}
              className="h-8 w-8"
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => navigateMonth("next")}
              className="h-8 w-8"
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </div>

        {/* Day Headers */}
        <div className="grid grid-cols-7 gap-1 mb-2">
          {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map(day => (
            <div key={day} className="text-center text-sm font-medium text-gray-600 py-2">
              {day}
            </div>
          ))}
        </div>

        {/* Calendar Grid */}
        <div className="grid grid-cols-7 gap-1">
          {calendarGrid.map((day, index) => {
            const isRecurring = day.isCurrentMonth && isRecurringDate(day.date);
            
            return (
              <div
                key={index}
                className={`
                  text-center py-2 text-sm rounded-lg transition-colors
                  ${!day.isCurrentMonth ? "text-gray-400" : "text-gray-600"}
                  ${day.isToday ? "bg-gray-200 font-semibold" : ""}
                  ${isRecurring ? "bg-primary text-white font-semibold" : ""}
                `}
              >
                {day.date.getDate()}
              </div>
            );
          })}
        </div>

        {/* Legend */}
        <div className="mt-4 flex items-center space-x-4 text-sm">
          <div className="flex items-center space-x-2">
            <div className="w-4 h-4 bg-primary rounded"></div>
            <span className="text-gray-600">Recurring dates</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-4 h-4 bg-gray-200 rounded"></div>
            <span className="text-gray-600">Today</span>
          </div>
        </div>

        {/* Pattern Summary */}
        <div className="mt-4 p-4 bg-blue-50 rounded-lg">
          <p className="text-sm font-medium text-gray-900 mb-2">Pattern Summary</p>
          <p className="text-sm text-gray-700">
            {pattern.type ? formatRecurrencePattern(pattern) : "Select a recurrence pattern"}
          </p>
          {pattern.startDate && (
            <p className="text-xs text-gray-600 mt-1">
              Starting {format(new Date(pattern.startDate), "PPP")}
              {pattern.endDate && ` until ${format(new Date(pattern.endDate), "PPP")}`}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
