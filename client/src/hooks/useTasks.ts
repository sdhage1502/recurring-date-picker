import { useEffect, useState } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useAuthStore } from "@/store/authStore";
import { useTaskStore } from "@/store/taskStore";
import { getUserTasks, timestampToDate, type TaskDocument } from "@/lib/firestore";
import type { Task } from "@shared/schema";

export function useTasks() {
  const { user } = useAuthStore();
  const { setTasks, setLoading, setError } = useTaskStore();
  
  const { data: firebaseTasks, isLoading, error } = useQuery({
    queryKey: ["tasks", user?.uid],
    queryFn: () => user ? getUserTasks(user.uid) : Promise.resolve([]),
    enabled: !!user?.uid,
    staleTime: 1000 * 60 * 5, // 5 minutes
  });

  // Convert Firebase tasks to local task format
  useEffect(() => {
    if (firebaseTasks) {
      const localTasks: Task[] = firebaseTasks.map((firebaseTask: TaskDocument) => ({
        id: parseInt(firebaseTask.id || "0"),
        userId: 1, // Local compatibility
        title: firebaseTask.title,
        description: firebaseTask.description || null,
        isCompleted: firebaseTask.isCompleted,
        priority: firebaseTask.priority,
        dueDate: firebaseTask.dueDate ? timestampToDate(firebaseTask.dueDate) : null,
        isRecurring: firebaseTask.isRecurring,
        recurrencePattern: firebaseTask.recurrencePattern,
        parentTaskId: firebaseTask.parentTaskId ? parseInt(firebaseTask.parentTaskId) : null,
        createdAt: timestampToDate(firebaseTask.createdAt),
        updatedAt: timestampToDate(firebaseTask.updatedAt),
      }));
      
      setTasks(localTasks);
    }
  }, [firebaseTasks, setTasks]);

  useEffect(() => {
    setLoading(isLoading);
  }, [isLoading, setLoading]);

  useEffect(() => {
    setError(error ? (error as Error).message : null);
  }, [error, setError]);

  return {
    tasks: firebaseTasks || [],
    isLoading,
    error,
    refetch: () => {}, // Will be provided by react-query
  };
}