
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export const useThemeStore = create(
  persist(
    (set, get) => ({
      // Theme settings
      accentColor: 'blue',
      compactMode: false,
      showTaskPreviews: true,
      
      // Notification settings
      notifications: true,
      autoSave: true,
      showCompleted: true,
      
      // Language and locale
      language: 'en',
      dateFormat: 'MM/dd/yyyy',
      timeFormat: '12h',
      
      // Actions
      setAccentColor: (color) => set({ accentColor: color }),
      setCompactMode: (compact) => set({ compactMode: compact }),
      setShowTaskPreviews: (show) => set({ showTaskPreviews: show }),
      setNotifications: (enabled) => set({ notifications: enabled }),
      setAutoSave: (enabled) => set({ autoSave: enabled }),
      setShowCompleted: (show) => set({ showCompleted: show }),
      setLanguage: (lang) => set({ language: lang }),
      setDateFormat: (format) => set({ dateFormat: format }),
      setTimeFormat: (format) => set({ timeFormat: format }),
      
      // Reset to defaults
      resetSettings: () => set({
        accentColor: 'blue',
        compactMode: false,
        showTaskPreviews: true,
        notifications: true,
        autoSave: true,
        showCompleted: true,
        language: 'en',
        dateFormat: 'MM/dd/yyyy',
        timeFormat: '12h',
      }),
    }),
    {
      name: 'theme-settings',
      partialize: (state) => ({
        accentColor: state.accentColor,
        compactMode: state.compactMode,
        showTaskPreviews: state.showTaskPreviews,
        notifications: state.notifications,
        autoSave: state.autoSave,
        showCompleted: state.showCompleted,
        language: state.language,
        dateFormat: state.dateFormat,
        timeFormat: state.timeFormat,
      }),
    }
  )
);
