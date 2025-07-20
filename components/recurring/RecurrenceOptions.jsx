
import React from "react";
import { Calendar, CalendarDays, CalendarCheck, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useRecurrenceStore } from "@/store/recurrenceStore";
import { cn } from "@/lib/utils";

export function RecurrenceOptions() {
  const { pattern, updatePattern } = useRecurrenceStore();

  const recurrenceTypes = [
    { id: "daily", label: "Daily", icon: Calendar },
    { id: "weekly", label: "Weekly", icon: CalendarDays },
    { id: "monthly", label: "Monthly", icon: CalendarCheck },
    { id: "yearly", label: "Yearly", icon: Clock },
  ];

  const dayNames = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  const weekOptions = [
    { value: 1, label: "First" },
    { value: 2, label: "Second" },
    { value: 3, label: "Third" },
    { value: 4, label: "Fourth" },
    { value: 5, label: "Last" },
  ];

  const toggleDay = (dayIndex) => {
    const currentDays = pattern.daysOfWeek || [];
    const newDays = currentDays.includes(dayIndex)
      ? currentDays.filter(d => d !== dayIndex)
      : [...currentDays, dayIndex].sort();
    updatePattern({ daysOfWeek: newDays });
  };

  return (
    <div className="space-y-6">
      {/* Recurrence Type Selection */}
      <div>
        <Label className="text-sm font-medium text-gray-700 mb-3 block">Repeat</Label>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {recurrenceTypes.map(({ id, label, icon: Icon }) => (
            <Button
              key={id}
              variant={pattern.type === id ? "default" : "outline"}
              className={cn(
                "justify-start font-medium transition-all",
                pattern.type === id && "bg-primary text-white"
              )}
              onClick={() => updatePattern({ type: id })}
            >
              <Icon className="mr-2 h-4 w-4" />
              {label}
            </Button>
          ))}
        </div>
      </div>

      {/* Daily Options */}
      {pattern.type === "daily" && (
        <div className="bg-blue-50 rounded-lg p-6 space-y-4">
          <h4 className="font-medium text-gray-900">Daily Settings</h4>
          
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <Label className="text-sm font-medium text-gray-700 mb-3 block">Frequency</Label>
              <div className="flex items-center space-x-3">
                <span className="text-gray-700">Every</span>
                <Input
                  type="number"
                  min="1"
                  max="365"
                  value={pattern.interval || 1}
                  onChange={(e) => updatePattern({ interval: parseInt(e.target.value) || 1 })}
                  className="w-16 text-center"
                />
                <span className="text-gray-700">day(s)</span>
              </div>
            </div>

            <div>
              <Label className="text-sm font-medium text-gray-700 mb-3 block">Options</Label>
              <RadioGroup value="all" className="space-y-2">
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="all" id="all-days" />
                  <Label htmlFor="all-days" className="text-gray-700">All days</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="weekdays" id="weekdays" />
                  <Label htmlFor="weekdays" className="text-gray-700">Weekdays only</Label>
                </div>
              </RadioGroup>
            </div>
          </div>
        </div>
      )}

      {/* Weekly Options */}
      {pattern.type === "weekly" && (
        <div className="bg-green-50 rounded-lg p-6 space-y-4">
          <h4 className="font-medium text-gray-900">Weekly Settings</h4>
          
          <div>
            <Label className="text-sm font-medium text-gray-700 mb-3 block">Frequency</Label>
            <div className="flex items-center space-x-3">
              <span className="text-gray-700">Every</span>
              <Input
                type="number"
                min="1"
                max="52"
                value={pattern.interval || 1}
                onChange={(e) => updatePattern({ interval: parseInt(e.target.value) || 1 })}
                className="w-16 text-center"
              />
              <span className="text-gray-700">week(s)</span>
            </div>
          </div>

          <div>
            <Label className="text-sm font-medium text-gray-700 mb-3 block">Days of the Week</Label>
            <div className="grid grid-cols-7 gap-2">
              {dayNames.map((day, index) => (
                <Button
                  key={day}
                  variant={pattern.daysOfWeek?.includes(index) ? "default" : "outline"}
                  size="sm"
                  onClick={() => toggleDay(index)}
                  className="text-sm"
                >
                  {day}
                </Button>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Monthly Options */}
      {pattern.type === "monthly" && (
        <div className="bg-purple-50 rounded-lg p-6 space-y-4">
          <h4 className="font-medium text-gray-900">Monthly Settings</h4>
          
          <div>
            <Label className="text-sm font-medium text-gray-700 mb-3 block">Frequency</Label>
            <div className="flex items-center space-x-3">
              <span className="text-gray-700">Every</span>
              <Input
                type="number"
                min="1"
                max="12"
                value={pattern.interval || 1}
                onChange={(e) => updatePattern({ interval: parseInt(e.target.value) || 1 })}
                className="w-16 text-center"
              />
              <span className="text-gray-700">month(s)</span>
            </div>
          </div>

          <div>
            <Label className="text-sm font-medium text-gray-700 mb-3 block">Pattern Type</Label>
            <RadioGroup 
              value={pattern.monthlyPattern || "date"}
              onValueChange={(value) => updatePattern({ monthlyPattern: value })}
              className="space-y-3"
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="date" id="same-date" />
                <Label htmlFor="same-date" className="text-gray-700">On the same date each month</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="weekday" id="specific-weekday" />
                <Label htmlFor="specific-weekday" className="text-gray-700">On a specific weekday</Label>
              </div>
            </RadioGroup>
          </div>

          {pattern.monthlyPattern === "weekday" && (
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <Label className="text-sm text-gray-600 mb-2 block">Week</Label>
                <Select 
                  value={pattern.nthWeekday?.week?.toString() || "2"}
                  onValueChange={(value) => updatePattern({
                    nthWeekday: { ...pattern.nthWeekday, week: parseInt(value) }
                  })}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {weekOptions.map(option => (
                      <SelectItem key={option.value} value={option.value.toString()}>
                        {option.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label className="text-sm text-gray-600 mb-2 block">Day</Label>
                <Select 
                  value={pattern.nthWeekday?.day?.toString() || "1"}
                  onValueChange={(value) => updatePattern({
                    nthWeekday: { ...pattern.nthWeekday, day: parseInt(value) }
                  })}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"].map((day, index) => (
                      <SelectItem key={index} value={(index + 1).toString()}>
                        {day}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Yearly Options */}
      {pattern.type === "yearly" && (
        <div className="bg-orange-50 rounded-lg p-6">
          <h4 className="font-medium text-gray-900 mb-4">Yearly Settings</h4>
          
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <Label className="text-sm font-medium text-gray-700 mb-2 block">Month</Label>
              <Select defaultValue="5">
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {["January", "February", "March", "April", "May", "June", 
                    "July", "August", "September", "October", "November", "December"].map((month, index) => (
                    <SelectItem key={index} value={index.toString()}>
                      {month}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label className="text-sm font-medium text-gray-700 mb-2 block">Day</Label>
              <Input type="number" min="1" max="31" defaultValue="15" />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
