
import React, { useState } from "react";
import { X, Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { DatePicker } from "@/components/ui/date-picker";
import { RecurrenceOptions } from "./RecurrenceOptions";
import { CalendarPreview } from "./CalendarPreview";
import { useRecurrenceStore } from "@/store/recurrenceStore";
import { useTaskStore } from "@/store/taskStore";
import { useAuthStore } from "@/store/authStore";
import { useToast } from "@/hooks/use-toast";
import { createTask, dateToTimestamp } from "@/lib/firestore";

export function RecurringDatePicker() {
  const { pattern, resetPattern, setVisible } = useRecurrenceStore();
  const { addTask } = useTaskStore();
  const { user } = useAuthStore();
  const { toast } = useToast();
  
  const [taskData, setTaskData] = useState({
    title: "",
    description: "",
  });
  const [startDate, setStartDate] = useState(
    pattern.startDate ? new Date(pattern.startDate) : new Date()
  );
  const [endDate, setEndDate] = useState(
    pattern.endDate ? new Date(pattern.endDate) : undefined
  );
  const [loading, setLoading] = useState(false);

  const handleClose = () => {
    resetPattern();
    setTaskData({ title: "", description: "" });
    setStartDate(new Date());
    setEndDate(undefined);
    setVisible(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!user) {
      toast({
        title: "Error",
        description: "You must be logged in to create tasks",
        variant: "destructive",
      });
      return;
    }

    if (!taskData.title.trim()) {
      toast({
        title: "Error", 
        description: "Task title is required",
        variant: "destructive",
      });
      return;
    }

    if (!pattern.type || !startDate) {
      toast({
        title: "Error",
        description: "Please configure the recurrence pattern",
        variant: "destructive",
      });
      return;
    }

    setLoading(true);

    try {
      const taskToCreate = {
        userId: user.uid,
        title: taskData.title,
        description: taskData.description || undefined,
        isCompleted: false,
        priority: "medium",
        dueDate: startDate ? dateToTimestamp(startDate) : undefined,
        isRecurring: true,
        recurrencePattern: {
          ...pattern,
          startDate: startDate.toISOString().split('T')[0],
          endDate: endDate?.toISOString().split('T')[0],
        },
      };

      // Create task in Firestore
      const createdTask = await createTask(taskToCreate);
      
      // Update local state
      const localTask = {
        id: parseInt(createdTask.id || "0"),
        userId: 1, // Local ID for compatibility
        title: createdTask.title,
        description: createdTask.description || null,
        isCompleted: createdTask.isCompleted,
        priority: createdTask.priority,
        dueDate: createdTask.dueDate ? createdTask.dueDate.toDate() : null,
        isRecurring: createdTask.isRecurring,
        recurrencePattern: createdTask.recurrencePattern,
        parentTaskId: createdTask.parentTaskId ? parseInt(createdTask.parentTaskId) : null,
        createdAt: createdTask.createdAt.toDate(),
        updatedAt: createdTask.updatedAt.toDate(),
      };

      addTask(localTask);

      toast({
        title: "Success",
        description: "Recurring task created successfully",
      });

      handleClose();
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to create recurring task",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50 overflow-y-auto">
      <Card className="w-full max-w-5xl mx-auto my-8 shadow-2xl border-0">
        <CardHeader className="flex flex-row items-center justify-between pb-6 border-b border-gray-100">
          <div>
            <CardTitle className="text-2xl font-bold text-gray-900 flex items-center">
              <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center mr-3">
                <Calendar className="h-4 w-4 text-white" />
              </div>
              Create Recurring Task
            </CardTitle>
            <p className="text-gray-600 mt-2 ml-11">
              Set up a task that repeats on a custom schedule, just like TickTick
            </p>
          </div>
          <Button variant="ghost" size="icon" onClick={handleClose} className="hover:bg-gray-100">
            <X className="h-4 w-4" />
          </Button>
        </CardHeader>

        <CardContent className="p-8">
          <form onSubmit={handleSubmit}>
            {/* Basic Task Details */}
            <div className="space-y-6 mb-8">
              <div>
                <Label htmlFor="title" className="text-base font-medium text-gray-900">Task Title</Label>
                <Input
                  id="title"
                  placeholder="e.g., Weekly team standup, Daily exercise..."
                  value={taskData.title}
                  onChange={(e) => setTaskData(prev => ({ ...prev, title: e.target.value }))}
                  className="mt-2 h-12 text-base"
                  required
                />
              </div>

              <div>
                <Label htmlFor="description" className="text-base font-medium text-gray-900">Description (Optional)</Label>
                <Textarea
                  id="description"
                  placeholder="Add additional details about this recurring task..."
                  value={taskData.description}
                  onChange={(e) => setTaskData(prev => ({ ...prev, description: e.target.value }))}
                  className="mt-2 resize-none"
                  rows={3}
                />
              </div>
            </div>

            {/* Recurrence Pattern */}
            <div className="mb-8 p-6 bg-gray-50 rounded-xl">
              <h3 className="text-lg font-semibold text-gray-900 mb-6 flex items-center">
                <Calendar className="h-5 w-5 mr-2 text-primary" />
                Recurrence Pattern
              </h3>
              <RecurrenceOptions />
            </div>

            {/* Date Range */}
            <div className="mb-8 p-6 bg-blue-50 rounded-xl">
              <h3 className="text-lg font-semibold text-gray-900 mb-6 flex items-center">
                <Calendar className="h-5 w-5 mr-2 text-blue-600" />
                Date Range
              </h3>
              
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <Label className="text-base font-medium text-gray-900">
                    Start Date <span className="text-red-500">*</span>
                  </Label>
                  <div className="mt-2">
                    <DatePicker
                      date={startDate}
                      onDateChange={setStartDate}
                      placeholder="Select start date"
                    />
                  </div>
                </div>
                <div>
                  <Label className="text-base font-medium text-gray-900">End Date (Optional)</Label>
                  <div className="mt-2">
                    <DatePicker
                      date={endDate}
                      onDateChange={setEndDate}
                      placeholder="Select end date"
                    />
                  </div>
                  <p className="text-sm text-gray-600 mt-2">Leave empty for indefinite recurrence</p>
                </div>
              </div>
            </div>

            {/* Calendar Preview */}
            <div className="mb-8">
              <CalendarPreview />
            </div>

            {/* Action Buttons */}
            <div className="flex justify-end space-x-4 pt-6 border-t border-gray-200">
              <Button 
                type="button" 
                variant="outline" 
                onClick={handleClose}
                className="px-8 py-3"
                disabled={loading}
              >
                Cancel
              </Button>
              <Button 
                type="submit" 
                disabled={loading}
                className="px-8 py-3 bg-primary hover:bg-blue-600"
              >
                {loading ? "Creating..." : "Create Recurring Task"}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
