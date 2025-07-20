import React, { useState } from "react";
import { Check, Calendar, CalendarDays, CalendarCheck, Eye, FolderSync, Filter, Keyboard, Users, BarChart3, Palette, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { AuthModal } from "@/components/auth/AuthModal";

export default function Landing() {
  const [authModal, setAuthModal] = useState<{ isOpen: boolean; mode: "login" | "signup" }>({
    isOpen: false,
    mode: "login",
  });

  const showAuthModal = (mode: "login" | "signup") => {
    setAuthModal({ isOpen: true, mode });
  };

  const hideAuthModal = () => {
    setAuthModal({ isOpen: false, mode: "login" });
  };

  const features = [
    {
      icon: Calendar,
      title: "Daily Patterns",
      description: "Set tasks to repeat every day, weekdays only, or custom intervals",
      color: "bg-blue-100 text-blue-600",
    },
    {
      icon: CalendarDays,
      title: "Weekly Schedules", 
      description: "Choose specific days of the week with flexible scheduling",
      color: "bg-green-100 text-green-600",
    },
    {
      icon: CalendarCheck,
      title: "Monthly Rules",
      description: 'Complex patterns like "2nd Tuesday" or "last Friday of month"',
      color: "bg-purple-100 text-purple-600",
    },
    {
      icon: Eye,
      title: "Calendar Preview",
      description: "Visual preview of your recurring pattern before saving",
      color: "bg-orange-100 text-orange-600",
    },
  ];

  const additionalFeatures = [
    { icon: FolderSync, title: "Constant Reminder", description: "Notifications keep ringing until you handle them" },
    { icon: Calendar, title: "Repeat Reminder", description: "Recurring rules like weekly, monthly, yearly and custom ones" },
    { icon: Filter, title: "Filter", description: "Easily customize filters like 'high-priority tasks for this week'" },
    { icon: Keyboard, title: "Keyboard Shortcuts", description: "Use shortcuts and command menus for quick operations" },
    { icon: Users, title: "Collaboration", description: "Share lists with friends and colleagues, assign tasks" },
    { icon: BarChart3, title: "Statistics", description: "Track tasks, focus duration, and habit logs comprehensively" },
    { icon: Palette, title: "Theme", description: "Choose from 40+ themes to customize your productivity tool" },
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Navigation */}
      <nav className="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                  <Check className="text-white h-5 w-5" />
                </div>
                <h1 className="text-xl font-bold text-gray-900">TickTick Pro</h1>
              </div>
            </div>
            <div className="hidden md:flex items-center space-x-6">
              <a href="#features" className="text-gray-600 hover:text-primary transition-colors">Features</a>
              <a href="#download" className="text-gray-600 hover:text-primary transition-colors">Download</a>
              <a href="#premium" className="text-gray-600 hover:text-primary transition-colors">Premium</a>
              <Button
                variant="ghost"
                onClick={() => showAuthModal("login")}
                className="text-gray-600 hover:text-primary"
              >
                Sign In
              </Button>
              <Button onClick={() => showAuthModal("signup")}>
                Get Started Free
              </Button>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-50 via-white to-green-50 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <div className="space-y-4">
                <h1 className="text-4xl md:text-5xl font-bold text-gray-900 leading-tight">
                  Stay Organized,<br />
                  <span className="text-primary">Stay Creative.</span>
                </h1>
                <p className="text-xl text-gray-600 leading-relaxed">
                  Join millions of people to capture ideas, organize life, and do something creative with our advanced recurring task system.
                </p>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-4">
                <Button 
                  onClick={() => showAuthModal("signup")} 
                  className="bg-primary text-white px-8 py-4 rounded-xl font-semibold hover:bg-blue-600 transition-all duration-300 transform hover:scale-105 shadow-lg"
                >
                  Get Started Free
                </Button>
                <Button 
                  variant="outline"
                  onClick={() => showAuthModal("signup")}
                  className="border-2 border-gray-300 text-gray-700 px-8 py-4 rounded-xl font-semibold hover:border-primary hover:text-primary transition-all duration-300"
                >
                  Try Demo
                </Button>
              </div>

              <div className="flex items-center space-x-6 text-sm text-gray-500">
                <div className="flex items-center space-x-2">
                  <Check className="h-4 w-4 text-green-600" />
                  <span>Free Forever</span>
                </div>
                <div className="flex items-center space-x-2">
                  <FolderSync className="h-4 w-4 text-green-600" />
                  <span>FolderSync Across All Platforms</span>
                </div>
              </div>
            </div>

            <div className="relative">
              {/* Mock Dashboard */}
              <div className="bg-white rounded-2xl shadow-2xl p-6 border border-gray-200">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold text-gray-900">Today's Tasks</h3>
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <div className="w-2 h-2 bg-gray-300 rounded-full"></div>
                    <div className="w-2 h-2 bg-gray-300 rounded-full"></div>
                  </div>
                </div>
                
                <div className="space-y-3">
                  <div className="flex items-center space-x-3 p-3 bg-blue-50 rounded-lg">
                    <input type="checkbox" className="w-4 h-4 text-primary rounded" />
                    <div className="flex-1">
                      <p className="text-gray-900 font-medium">Team standup meeting</p>
                      <p className="text-sm text-gray-500">
                        <FolderSync className="inline h-3 w-3 mr-1" />
                        Daily at 9:00 AM
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                    <input type="checkbox" className="w-4 h-4 text-primary rounded" />
                    <div className="flex-1">
                      <p className="text-gray-900 font-medium">Weekly progress review</p>
                      <p className="text-sm text-gray-500">
                        <CalendarDays className="inline h-3 w-3 mr-1" />
                        Every Friday
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-3 p-3 bg-green-50 rounded-lg">
                    <input type="checkbox" defaultChecked readOnly className="w-4 h-4 text-primary rounded" />
                    <div className="flex-1">
                      <p className="text-gray-900 font-medium line-through">Monthly report submission</p>
                      <p className="text-sm text-gray-500">
                        <Calendar className="inline h-3 w-3 mr-1" />
                        1st of every month
                      </p>
                    </div>
                  </div>
                </div>
                
                <Button variant="ghost" className="w-full mt-4 text-primary font-medium py-2 hover:bg-blue-50 rounded-lg transition-colors">
                  + Add Recurring Task
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Powerful Recurring Task Features
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Advanced scheduling patterns that adapt to your workflow
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="text-center space-y-4">
                <div className={`w-16 h-16 ${feature.color} rounded-2xl flex items-center justify-center mx-auto`}>
                  <feature.icon className="h-8 w-8" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Additional Features */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Rich and Diverse Features
            </h2>
            <p className="text-xl text-gray-600">Meet your unique productivity needs</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {additionalFeatures.map((feature, index) => (
              <div key={index} className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 hover:shadow-md transition-shadow">
                <div className="flex items-start space-x-4">
                  <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                    <feature.icon className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-2">{feature.title}</h3>
                    <p className="text-gray-600 text-sm">{feature.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-primary">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Ready to be more productive?
          </h2>
          <p className="text-xl text-blue-100 mb-8">
            Join millions of users who trust TickTick to organize their lives
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              onClick={() => showAuthModal("signup")}
              className="bg-white text-primary px-8 py-4 rounded-xl font-semibold hover:bg-gray-100 transition-all duration-300"
            >
              Get Started Free
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
            <Button 
              variant="outline"
              onClick={() => showAuthModal("login")}
              className="border-2 border-white text-white px-8 py-4 rounded-xl font-semibold hover:bg-white hover:text-primary transition-all duration-300"
            >
              Sign In
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-300 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                  <Check className="text-white h-5 w-5" />
                </div>
                <span className="text-white font-semibold">TickTick Pro</span>
              </div>
              <p className="text-gray-400">
                The most powerful task management and productivity app.
              </p>
            </div>
            
            <div>
              <h3 className="text-white font-semibold mb-4">Products</h3>
              <ul className="space-y-2">
                <li><a href="#" className="hover:text-white transition-colors">Features</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Download Apps</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Premium</a></li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-white font-semibold mb-4">Support</h3>
              <ul className="space-y-2">
                <li><a href="#" className="hover:text-white transition-colors">Help Center</a></li>
                <li><a href="#" className="hover:text-white transition-colors">FAQ</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Contact</a></li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-white font-semibold mb-4">Legal</h3>
              <ul className="space-y-2">
                <li><a href="#" className="hover:text-white transition-colors">Terms</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Privacy</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Security</a></li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-gray-800 mt-8 pt-8 text-center">
            <p>&copy; 2025 TickTick Pro. All rights reserved.</p>
          </div>
        </div>
      </footer>

      {/* Auth Modal */}
      <AuthModal
        isOpen={authModal.isOpen}
        onClose={hideAuthModal}
        defaultMode={authModal.mode}
      />
    </div>
  );
}
