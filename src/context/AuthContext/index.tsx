import { createContext, useState } from 'react'
import { LocalStorage } from 'src/enums/localStorage'
import { User } from 'src/models/user.model'
interface AuthState {
  authenticated?: boolean
  user?: User
}
const { ACCESS_TOKEN, REFRESH_TOKEN, USER } = LocalStorage
interface AuthContextValues extends AuthState {
  setAuthenticated?: (user?: User) => void
  setUnauthenticated?: () => void
  setUserDetails?: (updatedUser: Partial<User>) => void
}

const AuthContext = createContext<AuthContextValues>({})

const AuthProvider = (ownProps: { children: React.ReactNode }) => {
  const initialValues: AuthState = {
    authenticated: !!localStorage.getItem(ACCESS_TOKEN) || false,
    user: new User(),
  }

  const [auth, setAuth] = useState<AuthState>(initialValues)

  const { authenticated, user } = auth

  const setAuthenticated = (user?: User) => {
    const refreshToken = user?.refreshToken
    const accessToken = user?.accessToken
    if (refreshToken) localStorage.setItem(REFRESH_TOKEN, refreshToken)
    if (accessToken) localStorage.setItem(ACCESS_TOKEN, accessToken)
    if (user) localStorage.setItem(USER, JSON.stringify(user))
    setAuth((auth) => ({
      ...auth,
      authenticated: true,
      user,
    }))
  }

  const setUnauthenticated = () => {
    localStorage.clear()
    setAuth({ user: undefined, authenticated: false })
  }

  const setUserDetails = (updatedUser: Partial<User>) => {
    setAuth((auth) => ({
      ...auth,
      user: {
        ...auth.user,
        ...updatedUser,
      },
    }))
  }

  return (
    <AuthContext.Provider
      value={{
        authenticated,
        user,
        setAuthenticated,
        setUnauthenticated,
        setUserDetails,
      }}
      {...ownProps}
    />
  )
}

export { AuthContext, AuthProvider }
