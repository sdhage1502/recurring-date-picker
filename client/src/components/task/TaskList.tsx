import React from "react";
import { Plus, Edit, FolderSync, Calendar, CalendarDays } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { useTaskStore } from "@/store/taskStore";
import { useRecurrenceStore } from "@/store/recurrenceStore";
import { formatRecurrencePattern } from "@/utils/recurrenceUtils";
import { format } from "date-fns";

export function TaskList() {
  const { tasks, updateTask } = useTaskStore();
  const { setVisible } = useRecurrenceStore();

  const handleTaskComplete = (taskId: number, completed: boolean) => {
    updateTask(taskId, { isCompleted: completed });
  };

  const recurringTasks = tasks.filter(task => task.isRecurring);

  const getRecurrenceIcon = (pattern: any) => {
    switch (pattern?.type) {
      case "daily":
        return <FolderSync className="h-4 w-4" />;
      case "weekly":
        return <CalendarDays className="h-4 w-4" />;
      case "monthly":
      case "yearly":
        return <Calendar className="h-4 w-4" />;
      default:
        return <FolderSync className="h-4 w-4" />;
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high":
        return "border-red-500 bg-red-50";
      case "medium":
        return "border-blue-500 bg-blue-50";
      case "low":
        return "border-green-500 bg-green-50";
      default:
        return "border-gray-200 bg-gray-50";
    }
  };

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="text-lg font-semibold text-gray-900">
          My Recurring Tasks
        </CardTitle>
        <Button onClick={() => setVisible(true)} size="sm">
          <Plus className="h-4 w-4 mr-2" />
          Add Recurring
        </Button>
      </CardHeader>

      <CardContent className="space-y-4">
        {recurringTasks.length === 0 ? (
          <div className="text-center py-8">
            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Calendar className="h-8 w-8 text-gray-400" />
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">No recurring tasks yet</h3>
            <p className="text-gray-600 mb-4">Create your first recurring task to get started</p>
            <Button onClick={() => setVisible(true)}>
              <Plus className="h-4 w-4 mr-2" />
              Create Recurring Task
            </Button>
          </div>
        ) : (
          <>
            {recurringTasks.map(task => (
              <div
                key={task.id}
                className={`p-4 rounded-lg border-l-4 ${getPriorityColor(task.priority)}`}
              >
                <div className="flex items-start space-x-3">
                  <Checkbox
                    checked={task.isCompleted}
                    onCheckedChange={(checked) => 
                      handleTaskComplete(task.id, checked as boolean)
                    }
                    className="mt-1"
                  />
                  <div className="flex-1">
                    <h4 className={`font-medium text-gray-900 ${task.isCompleted ? 'line-through' : ''}`}>
                      {task.title}
                    </h4>
                    {task.description && (
                      <p className="text-sm text-gray-600 mt-1">{task.description}</p>
                    )}
                    <div className="flex items-center space-x-4 mt-2 text-sm text-gray-500">
                      <div className="flex items-center space-x-1">
                        {getRecurrenceIcon(task.recurrencePattern)}
                        <span>
                          {task.recurrencePattern 
                            ? formatRecurrencePattern(task.recurrencePattern as any)
                            : "Custom pattern"
                          }
                        </span>
                      </div>
                      {task.dueDate && (
                        <span>Next: {format(new Date(task.dueDate), "MMM d, yyyy")}</span>
                      )}
                    </div>
                  </div>
                  <Button variant="ghost" size="icon" className="text-gray-400 hover:text-gray-600">
                    <Edit className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            ))}

            <div className="pt-4 border-t border-gray-200">
              <Button variant="ghost" className="w-full justify-start text-gray-600">
                <Plus className="h-4 w-4 mr-2" />
                Add regular task
              </Button>
            </div>
          </>
        )}
      </CardContent>
    </Card>
  );
}
