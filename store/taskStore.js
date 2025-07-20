
import { create } from "zustand"

export const useTaskStore = create((set) => ({
  tasks: [],
  loading: false,
  error: null,
  
  setTasks: (tasks) => set({ tasks }),
  
  addTask: (task) => 
    set((state) => ({ tasks: [...state.tasks, task] })),
  
  updateTask: (id, updates) =>
    set((state) => ({
      tasks: state.tasks.map(task => 
        task.id === id ? { ...task, ...updates } : task
      )
    })),
  
  deleteTask: (id) =>
    set((state) => ({
      tasks: state.tasks.filter(task => task.id !== id)
    })),
  
  setLoading: (loading) => set({ loading }),
  setError: (error) => set({ error }),
}))
