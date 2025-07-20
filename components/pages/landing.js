
'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { AuthModal } from '@/components/auth/AuthModal'
import { Calendar, Clock, RefreshCw, Users } from 'lucide-react'

export default function Landing() {
  const [showAuthModal, setShowAuthModal] = useState(false)
  const [authMode, setAuthMode] = useState('signin')

  const features = [
    {
      icon: Calendar,
      title: "Smart Recurring Dates",
      description: "Create complex recurring patterns with ease - daily, weekly, monthly, or custom intervals."
    },
    {
      icon: Clock,
      title: "Flexible Scheduling",
      description: "Set specific days of the week, dates of the month, or create your own custom patterns."
    },
    {
      icon: RefreshCw,
      title: "Pattern Preview",
      description: "See exactly when your recurring events will occur with our interactive calendar preview."
    },
    {
      icon: Users,
      title: "Team Collaboration",
      description: "Share and manage recurring schedules with your team members seamlessly."
    }
  ]

  const handleSignIn = () => {
    setAuthMode('signin')
    setShowAuthModal(true)
  }

  const handleSignUp = () => {
    setAuthMode('signup')
    setShowAuthModal(true)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800">
      {/* Header */}
      <header className="px-4 lg:px-6 h-14 flex items-center border-b bg-white/80 backdrop-blur-sm dark:bg-gray-800/80">
        <div className="flex items-center justify-center">
          <Calendar className="h-6 w-6 text-blue-600" />
          <span className="ml-2 text-lg font-semibold">RecurPicker</span>
        </div>
        <nav className="ml-auto flex gap-4 sm:gap-6">
          <Button variant="ghost" onClick={handleSignIn}>
            Sign In
          </Button>
          <Button onClick={handleSignUp}>
            Get Started
          </Button>
        </nav>
      </header>

      {/* Hero Section */}
      <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48">
        <div className="container px-4 md:px-6 mx-auto">
          <div className="flex flex-col items-center space-y-4 text-center">
            <div className="space-y-2">
              <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none">
                Master Your Recurring Schedules
              </h1>
              <p className="mx-auto max-w-[700px] text-gray-500 md:text-xl dark:text-gray-400">
                Create, manage, and visualize complex recurring date patterns with our intuitive date picker. 
                Perfect for events, tasks, and scheduling.
              </p>
            </div>
            <div className="space-x-4">
              <Button size="lg" onClick={handleSignUp}>
                Start Free Trial
              </Button>
              <Button variant="outline" size="lg">
                View Demo
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="w-full py-12 md:py-24 lg:py-32 bg-white dark:bg-gray-800">
        <div className="container px-4 md:px-6 mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl">
              Powerful Features
            </h2>
            <p className="text-gray-500 md:text-lg dark:text-gray-400 mt-2">
              Everything you need to manage recurring dates effectively
            </p>
          </div>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {features.map((feature, index) => (
              <Card key={index} className="text-center">
                <CardHeader>
                  <feature.icon className="h-12 w-12 mx-auto text-blue-600" />
                  <CardTitle className="text-lg">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription>{feature.description}</CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <AuthModal 
        isOpen={showAuthModal}
        onClose={() => setShowAuthModal(false)}
        mode={authMode}
      />
    </div>
  )
}
