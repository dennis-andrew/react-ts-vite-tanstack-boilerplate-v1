import { Outlet } from '@tanstack/react-router'
const AuthWrapper = () => {
  return (
    <div>
      AuthLayout
      <Outlet />
    </div>
  )
}

export default AuthWrapper
