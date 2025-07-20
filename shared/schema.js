
import { z } from 'zod'

export const RecurrencePatternSchema = z.object({
  type: z.enum(['daily', 'weekly', 'monthly', 'yearly', 'none']),
  interval: z.number().min(1).optional(),
  daysOfWeek: z.array(z.number().min(0).max(6)).optional(),
  dayOfMonth: z.number().min(1).max(31).optional(),
  endDate: z.string().optional(),
  count: z.number().min(1).optional(),
})

export const TaskSchema = z.object({
  id: z.string().optional(),
  title: z.string().min(1, 'Title is required'),
  description: z.string().optional(),
  startDate: z.string(),
  endDate: z.string().optional(),
  recurrencePattern: RecurrencePatternSchema.optional(),
  userId: z.string(),
  completed: z.boolean().default(false),
  createdAt: z.date().optional(),
  updatedAt: z.date().optional(),
})

export const InsertTask = TaskSchema.omit({ id: true, createdAt: true, updatedAt: true })
export const UpdateTask = TaskSchema.partial().omit({ createdAt: true })
