import React, { useEffect } from "react";
import { Calendar, Plus, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Header } from "@/components/layout/Header";
import { TaskList } from "@/components/task/TaskList";
import { RecurringDatePicker } from "@/components/recurring/RecurringDatePicker";
import { useRecurrenceStore } from "@/store/recurrenceStore";
import { useAuthStore } from "@/store/authStore";
import { useTasks } from "@/hooks/useTasks";
import { useToast } from "@/hooks/use-toast";

export default function Dashboard() {
  const { isVisible, showRecurringPicker } = useRecurrenceStore();
  const { user } = useAuthStore();
  const { toast } = useToast();
  
  // Load user's tasks from Firestore
  useTasks();

  // Welcome message on first login
  useEffect(() => {
    if (user) {
      const hasShownWelcome = localStorage.getItem('welcome-shown');
      if (!hasShownWelcome) {
        setTimeout(() => {
          toast({
            title: `Welcome${user.displayName ? `, ${user.displayName.split(' ')[0]}` : ''}!`,
            description: "Your workspace is ready. Start creating recurring tasks to stay organized.",
            duration: 5000,
          });
          localStorage.setItem('welcome-shown', 'true');
        }, 1000);
      }
    }
  }, [user, toast]);

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Task List Sidebar */}
          <div className="lg:col-span-1">
            <TaskList />
          </div>

          {/* Main Content Area */}
          <div className="lg:col-span-2">
            {isVisible ? (
              <RecurringDatePicker />
            ) : (
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8">
                <div className="text-center space-y-6">
                  <div className="w-20 h-20 bg-blue-50 rounded-full flex items-center justify-center mx-auto">
                    <Calendar className="h-10 w-10 text-primary" />
                  </div>
                  
                  <div className="space-y-3">
                    <h3 className="text-xl font-semibold text-gray-900">
                      Welcome to Your Task Dashboard
                    </h3>
                    <p className="text-gray-600 max-w-md mx-auto">
                      Create recurring tasks with advanced scheduling patterns. 
                      Perfect for daily standups, weekly reviews, or monthly reports.
                    </p>
                  </div>

                  <div className="grid md:grid-cols-2 gap-4 max-w-lg mx-auto">
                    <Button 
                      onClick={showRecurringPicker}
                      className="flex items-center justify-center space-x-2 h-12 bg-primary hover:bg-blue-600"
                    >
                      <Plus className="h-4 w-4" />
                      <span>Create Recurring Task</span>
                    </Button>
                    
                    <Button 
                      variant="outline"
                      className="flex items-center justify-center space-x-2 h-12 border-gray-300 hover:border-primary hover:text-primary"
                    >
                      <CheckCircle2 className="h-4 w-4" />
                      <span>View Examples</span>
                    </Button>
                  </div>

                  <div className="bg-blue-50 rounded-lg p-4 max-w-md mx-auto">
                    <p className="text-sm text-blue-800 font-medium mb-2">💡 Pro Tip</p>
                    <p className="text-sm text-blue-700">
                      Try creating a task like "Team standup every Monday and Wednesday" 
                      or "Monthly report on the 1st of every month"
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
