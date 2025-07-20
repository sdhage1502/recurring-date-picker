import { create } from "zustand";
import { RecurrencePattern } from "@shared/schema";

interface RecurrenceState {
  pattern: Partial<RecurrencePattern>;
  isVisible: boolean;
  updatePattern: (updates: Partial<RecurrencePattern>) => void;
  resetPattern: () => void;
  setVisible: (visible: boolean) => void;
  showRecurringPicker: () => void;
  hideRecurringPicker: () => void;
}

const defaultPattern: Partial<RecurrencePattern> = {
  type: "daily",
  interval: 1,
  daysOfWeek: [],
  monthlyPattern: "date",
  startDate: new Date().toISOString().split('T')[0],
};

export const useRecurrenceStore = create<RecurrenceState>((set, get) => ({
  pattern: defaultPattern,
  isVisible: false,
  
  updatePattern: (updates) => 
    set((state) => ({ 
      pattern: { ...state.pattern, ...updates } 
    })),
  
  resetPattern: () => 
    set({ pattern: defaultPattern }),
  
  setVisible: (visible) => 
    set({ isVisible: visible }),
  
  showRecurringPicker: () => 
    set({ isVisible: true }),
  
  hideRecurringPicker: () => 
    set({ isVisible: false }),
}));
