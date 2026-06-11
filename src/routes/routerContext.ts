import { User } from 'src/models/user.model'

export interface RouterAuthContext {
  authenticated?: boolean
  user?: User
  setAuthenticated?: (user?: User) => void
  setUnauthenticated?: () => void
  setUserDetails?: (updatedUser: Partial<User>) => void
}

export interface RouterContext {
  auth: RouterAuthContext
}
