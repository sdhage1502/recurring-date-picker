
'use client'

import { useState, useEffect } from 'react'
import { useAuthStore } from '@/store/authStore'
import { useThemeStore } from '@/store/themeStore'
import Header from '@/components/layout/Header'
import { TaskList } from '@/components/task/TaskList'
import { RecurringDatePicker } from '@/components/recurring/RecurringDatePicker'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { 
  Plus, 
  Search, 
  Filter, 
  Calendar,
  Clock,
  Star,
  CheckCircle2,
  Circle,
  MoreVertical,
  Inbox,
  Today,
  CalendarDays,
  BarChart3
} from 'lucide-react'

export default function Dashboard() {
  const { user, initializeAuth } = useAuthStore()
  const { compactMode, showCompleted } = useThemeStore()
  const [showDatePicker, setShowDatePicker] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedView, setSelectedView] = useState('inbox')
  const [quickAddTask, setQuickAddTask] = useState('')

  useEffect(() => {
    const unsubscribe = initializeAuth()
    return () => {
      if (typeof unsubscribe === 'function') {
        unsubscribe()
      }
    }
  }, [initializeAuth])

  const handleQuickAdd = (e) => {
    if (e.key === 'Enter' && quickAddTask.trim()) {
      // Handle quick task creation
      console.log('Quick add task:', quickAddTask)
      setQuickAddTask('')
    }
  }

  const sidebarItems = [
    {
      id: 'inbox',
      label: 'Inbox',
      icon: <Inbox className="h-4 w-4" />,
      count: 12,
      active: selectedView === 'inbox'
    },
    {
      id: 'today',
      label: 'Today',
      icon: <Today className="h-4 w-4" />,
      count: 5,
      active: selectedView === 'today'
    },
    {
      id: 'upcoming',
      label: 'Upcoming',
      icon: <CalendarDays className="h-4 w-4" />,
      count: 8,
      active: selectedView === 'upcoming'
    },
    {
      id: 'completed',
      label: 'Completed',
      icon: <CheckCircle2 className="h-4 w-4" />,
      count: 24,
      active: selectedView === 'completed'
    }
  ]

  const projects = [
    { id: 'work', name: 'Work', color: 'bg-blue-500', count: 7 },
    { id: 'personal', name: 'Personal', color: 'bg-green-500', count: 3 },
    { id: 'health', name: 'Health', color: 'bg-purple-500', count: 2 }
  ]

  if (!user) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="flex items-center justify-center min-h-[calc(100vh-4rem)]">
          <div className="text-center space-y-4">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto"></div>
            <p className="text-muted-foreground">Loading your workspace...</p>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <div className="flex h-[calc(100vh-4rem)]">
        {/* Sidebar */}
        <aside className="w-64 border-r bg-background/50 backdrop-blur">
          <div className="p-4 space-y-6">
            {/* Quick Add */}
            <div className="space-y-2">
              <Input
                placeholder="Quick add task..."
                value={quickAddTask}
                onChange={(e) => setQuickAddTask(e.target.value)}
                onKeyPress={handleQuickAdd}
                className="border-dashed"
              />
              <Button 
                onClick={() => setShowDatePicker(true)}
                variant="outline" 
                size="sm" 
                className="w-full"
              >
                <Plus className="h-4 w-4 mr-2" />
                New Recurring Task
              </Button>
            </div>

            {/* Main Views */}
            <div className="space-y-1">
              <h3 className="text-sm font-semibold text-muted-foreground px-2 mb-2">
                Main
              </h3>
              {sidebarItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => setSelectedView(item.id)}
                  className={`w-full flex items-center justify-between px-2 py-2 rounded-md text-sm transition-colors ${
                    item.active 
                      ? 'bg-primary/10 text-primary font-medium' 
                      : 'hover:bg-accent text-muted-foreground hover:text-foreground'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    {item.icon}
                    <span>{item.label}</span>
                  </div>
                  {item.count > 0 && (
                    <Badge variant={item.active ? "default" : "secondary"} className="text-xs">
                      {item.count}
                    </Badge>
                  )}
                </button>
              ))}
            </div>

            {/* Projects */}
            <div className="space-y-1">
              <h3 className="text-sm font-semibold text-muted-foreground px-2 mb-2">
                Projects
              </h3>
              {projects.map((project) => (
                <button
                  key={project.id}
                  className="w-full flex items-center justify-between px-2 py-2 rounded-md text-sm transition-colors hover:bg-accent text-muted-foreground hover:text-foreground"
                >
                  <div className="flex items-center gap-3">
                    <div className={`w-3 h-3 rounded-full ${project.color}`} />
                    <span>{project.name}</span>
                  </div>
                  {project.count > 0 && (
                    <Badge variant="secondary" className="text-xs">
                      {project.count}
                    </Badge>
                  )}
                </button>
              ))}
              <Button variant="ghost" size="sm" className="w-full justify-start px-2 text-muted-foreground">
                <Plus className="h-4 w-4 mr-3" />
                Add Project
              </Button>
            </div>
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1 flex flex-col">
          {/* Search and Filters */}
          <div className="border-b p-4">
            <div className="flex items-center gap-4">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search tasks..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>
              <Button variant="outline" size="sm">
                <Filter className="h-4 w-4 mr-2" />
                Filter
              </Button>
              <Button variant="outline" size="sm">
                <BarChart3 className="h-4 w-4 mr-2" />
                View
              </Button>
            </div>
          </div>

          {/* Task Content */}
          <div className="flex-1 p-6">
            <div className="max-w-4xl mx-auto space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <h1 className="text-2xl font-bold capitalize">{selectedView}</h1>
                  <p className="text-muted-foreground">
                    {selectedView === 'inbox' && 'All your tasks in one place'}
                    {selectedView === 'today' && 'Tasks due today'}
                    {selectedView === 'upcoming' && 'Tasks due soon'}
                    {selectedView === 'completed' && 'Recently completed tasks'}
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <Button variant="outline" size="sm">
                    <Calendar className="h-4 w-4 mr-2" />
                    Calendar View
                  </Button>
                </div>
              </div>

              {/* Task Stats */}
              <div className="grid grid-cols-4 gap-4">
                <Card>
                  <CardContent className="p-4">
                    <div className="flex items-center gap-2">
                      <Circle className="h-4 w-4 text-muted-foreground" />
                      <div>
                        <p className="text-sm text-muted-foreground">Active</p>
                        <p className="text-xl font-bold">12</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="p-4">
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="h-4 w-4 text-green-500" />
                      <div>
                        <p className="text-sm text-muted-foreground">Completed</p>
                        <p className="text-xl font-bold">24</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="p-4">
                    <div className="flex items-center gap-2">
                      <Clock className="h-4 w-4 text-orange-500" />
                      <div>
                        <p className="text-sm text-muted-foreground">Overdue</p>
                        <p className="text-xl font-bold">3</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="p-4">
                    <div className="flex items-center gap-2">
                      <Star className="h-4 w-4 text-yellow-500" />
                      <div>
                        <p className="text-sm text-muted-foreground">Priority</p>
                        <p className="text-xl font-bold">5</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Task List */}
              <TaskList 
                searchQuery={searchQuery} 
                selectedView={selectedView}
                compactMode={compactMode}
                showCompleted={showCompleted}
              />
            </div>
          </div>
        </main>
      </div>

      {/* Recurring Date Picker Modal */}
      {showDatePicker && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-background rounded-lg max-w-4xl w-full mx-4 max-h-[90vh] overflow-y-auto">
            <RecurringDatePicker onClose={() => setShowDatePicker(false)} />
          </div>
        </div>
      )}
    </div>
  )
}
