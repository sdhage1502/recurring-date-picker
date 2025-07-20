
'use client'

import { useAuthStore } from '@/store/authStore'

export function ProtectedRoute({ children, fallback }) {
  const { user, loading } = useAuthStore()

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    )
  }

  if (!user) {
    return fallback
  }

  return children
}
