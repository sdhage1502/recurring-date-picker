import { create } from "zustand";

export const useRecurrenceStore = create((set, get) => ({
    pattern: {
        type: 'daily', // 'daily', 'weekly', 'monthly', 'yearly'
        interval: 1,
        daysOfWeek: [], // for weekly: ['monday', 'tuesday', etc.]
        dayOfMonth: 1, // for monthly
        monthOfYear: 1, // for yearly
        endDate: null,
        occurrences: null
    },

    setPattern: (pattern) => set({ pattern }),

    updatePattern: (updates) => set(state => ({
        pattern: { ...state.pattern, ...updates }
    })),

    resetPattern: () => set({
        pattern: {
            type: 'daily',
            interval: 1,
            daysOfWeek: [],
            dayOfMonth: 1,
            monthOfYear: 1,
            endDate: null,
            occurrences: null
        }
    },
    getPatternSummary: () => {
        const { pattern } = get();
        switch (pattern.type) {
          case 'daily':
            return `Every ${pattern.interval} day${pattern.interval > 1 ? 's' : ''}`;
          case 'weekly':
            return `Every ${pattern.interval} week${pattern.interval > 1 ? 's' : ''}`;
          case 'monthly':
            return `Every ${pattern.interval} month${pattern.interval > 1 ? 's' : ''}`;
          case 'yearly':
            return `Every ${pattern.interval} year${pattern.interval > 1 ? 's' : ''}`;
          default:
            return 'Custom pattern';
        }
      }
    )
}));