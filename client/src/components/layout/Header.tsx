import React from "react";
import { Check, Search, Bell } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAuthStore } from "@/store/authStore";
import { getUserInitials, signOut } from "@/lib/auth";
import { useToast } from "@/hooks/use-toast";

export function Header() {
  const { user } = useAuthStore();
  const { toast } = useToast();

  const handleSignOut = async () => {
    const result = await signOut();
    if (result.error) {
      toast({
        title: "Error",
        description: result.error,
        variant: "destructive",
      });
    }
  };

  return (
    <header className="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                <Check className="text-white h-5 w-5" />
              </div>
              <h1 className="text-xl font-bold text-gray-900">TickTick Pro</h1>
            </div>
            <nav className="hidden md:flex space-x-8">
              <button className="text-primary font-medium border-b-2 border-primary pb-1">
                Tasks
              </button>
              <button className="text-gray-600 hover:text-primary transition-colors">
                Calendar
              </button>
              <button className="text-gray-600 hover:text-primary transition-colors">
                Habits
              </button>
            </nav>
          </div>
          
          <div className="flex items-center space-x-4">
            <Button variant="ghost" size="icon" className="text-gray-600 hover:text-primary">
              <Search className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="icon" className="text-gray-600 hover:text-primary">
              <Bell className="h-4 w-4" />
            </Button>
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center">
                <span className="text-sm font-medium text-gray-700">
                  {getUserInitials(user)}
                </span>
              </div>
              <Button
                variant="ghost"
                onClick={handleSignOut}
                className="text-gray-600 hover:text-primary text-sm"
              >
                Logout
              </Button>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
