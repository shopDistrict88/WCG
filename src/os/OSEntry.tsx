import { Navigate } from 'react-router-dom'
import { useAuth } from './auth'
import { BrandsProvider } from './context/BrandsContext'
import OSLayout from './OSLayout'

export default function OSEntry() {
  const { user } = useAuth()

  if (!user) {
    return <Navigate to="/os/login" replace />
  }

  return (
    <BrandsProvider>
      <OSLayout />
    </BrandsProvider>
  )
}
