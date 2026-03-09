import { Outlet } from 'react-router-dom'
import { DataProvider, useData } from './store/DataContext'
import { AuthProvider } from './auth'
import FirstRunSetup from './FirstRunSetup'

function AuthLayoutInner() {
  const { users, addUser, isLoading } = useData()

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#0a0a0f]">
        <div className="text-white/40">Loading...</div>
      </div>
    )
  }

  if (users.length === 0) {
    return (
      <FirstRunSetup
        onCreateAdmin={({ name, email, role }) => {
          const initials = name.split(' ').map((n) => n[0]).join('').toUpperCase().slice(0, 2)
          addUser({
            name,
            email,
            role,
            avatar: initials || 'AD',
            title: 'Administrator',
            brands: ['all'],
            joinedDate: new Date().toISOString().slice(0, 10),
          })
        }}
      />
    )
  }

  return (
    <AuthProvider>
      <Outlet />
    </AuthProvider>
  )
}

export default function AuthProviderLayout() {
  return (
    <DataProvider>
      <AuthLayoutInner />
    </DataProvider>
  )
}
