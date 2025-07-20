
'use client'

import { useAuthStore } from '@/store/authStore'
import { useEffect } from 'react'
import Landing from '@/components/pages/landing'
import Dashboard from '@/components/pages/dashboard'

export default function HomePage() {
  const { user, loading, initializeAuth } = useAuthStore()

  useEffect(() => {
    initializeAuth()
  }, [initializeAuth])

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    )
  }

  return user ? <Dashboard /> : <Landing />
}
