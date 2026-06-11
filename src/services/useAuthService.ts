import { useContext } from 'react'
import { useMutation } from '@tanstack/react-query'
import { deserialize } from 'serializr'
import { AuthContext } from 'src/context/AuthContext'
import { NotificationTypes } from 'src/enums/notificationTypes'
import { User } from 'src/models/user.model'
import { ApiRoutes } from 'src/routes/routeConstants/apiRoutes'
import Notification from 'src/shared/components/Notification'
import axiosInstance from 'src/interceptor/axiosInstance'
// Service function declarations
const loginUser = async (data: User) => {
  const response = await axiosInstance.post(ApiRoutes.USER_LOGIN, data)
  const user = deserialize(User, response.data.user)
  return user
}

const useLoginMutation = () => {
  const { setAuthenticated } = useContext(AuthContext)
  return useMutation({
    mutationFn: loginUser,
    onSuccess: (user) => {
      Notification({
        message: 'Login',
        description: 'Logged in successfully',
        type: NotificationTypes.SUCCESS,
      })
      setAuthenticated?.(user)
    },
  })
}

export { useLoginMutation }
