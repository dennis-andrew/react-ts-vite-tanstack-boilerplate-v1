import axios, { AxiosHeaders } from 'axios'
import { deserialize } from 'serializr'
import { LocalStorage } from 'src/enums/localStorage'
import { User } from 'src/models/user.model'
import { ApiRoutes } from 'src/routes/routeConstants/apiRoutes'
import { AppRoutes } from 'src/routes/routeConstants/appRoutes'
import { deepClone } from 'src/shared/utils/deepClone'
import Notification from 'src/shared/components/Notification'
import { NotificationTypes } from 'src/enums/notificationTypes'
import { defaultErrorMessage } from 'src/constants/constants'

const { ACCESS_TOKEN, REFRESH_TOKEN } = LocalStorage
const { ERROR } = NotificationTypes
const {
  AUTH: { LOGIN },
} = AppRoutes
const { BASE_URL } = ApiRoutes

let isTokenValid = true
const queuedRequests: IRequestQueue[] = []

interface IRequestQueue {
  request?: unknown
  resolve: (val: unknown) => void
  reject: (reason: unknown) => void
}

const processQueue = (error?: Error, token = '') => {
  queuedRequests.forEach(({ resolve, reject }) =>
    error ? reject(error) : resolve(token),
  )

  queuedRequests.length = 0
}

/**
 * Function to set request headers.
 */

const getHeaders = () => {
  const accessToken = deepClone(localStorage.getItem(ACCESS_TOKEN))
  const headers = new AxiosHeaders()
  headers.set('Content-Type', 'application/json')
  headers.set('Authorization', `bearer ${accessToken}`)
  return headers
}

/**
 * Axios instance with a base URL.
 */
const axiosInstance = axios.create({
  baseURL: BASE_URL,
  timeout: 40000,
})

/**
 * Request interceptor - Adds Authorization header.
 */
axiosInstance.interceptors.request.use(
  async (config) => {
    config.headers = await getHeaders()
    return config
  },
  (error) => Promise.reject(error),
)

/**
 * Response interceptor - Handles 401 errors by refreshing tokens.
 */
axiosInstance.interceptors.response.use(
  (response) => {
    return {
      ...response,
      data: response.data,
      message: response.statusText,
      status: response.status,
    }
  },
  (error) => {
    const { config: originalRequest, response, _retry: RE_TRIED } = error
    const logout = () => {
      localStorage.clear()
      window.location.replace(LOGIN)
    }
    if (response?.status === 401) {
      if (RE_TRIED) return logout()

      if (!isTokenValid) {
        return new Promise((resolve, reject) => {
          queuedRequests.push({ resolve, reject })
        })

          .then((token) => {
            originalRequest.headers['Authorization'] = `bearer ${token}`

            return axios(originalRequest)
          })

          .catch((ex) => Promise.reject(ex))
      }

      originalRequest._retry = true
      isTokenValid = false
      const refreshToken = deepClone(localStorage.getItem(REFRESH_TOKEN))

      return axios
        .post(`${ApiRoutes.BASE_URL}${ApiRoutes.USER_LOGIN}`, refreshToken)
        .then((response) => {
          if (response.status >= 200 && response.status <= 299) {
            const user = deserialize(User, response.data.user)
            const refreshToken = user.refreshToken
            const accessToken = user.accessToken
            localStorage.setItem(ACCESS_TOKEN, accessToken ?? '')
            localStorage.setItem(REFRESH_TOKEN, refreshToken ?? '')
            window.dispatchEvent(
              new StorageEvent('storage', {
                key: ACCESS_TOKEN,
                newValue: accessToken,
              }),
            )
            window.dispatchEvent(
              new StorageEvent('storage', {
                key: REFRESH_TOKEN,
                newValue: refreshToken,
              }),
            )
            originalRequest.headers['Authorization'] = `bearer ${accessToken}`
            processQueue(undefined, accessToken)
            return axios(originalRequest)
          }
        })
        .catch((error) => {
          processQueue(error)
          logout()
        })
        .finally(() => {
          isTokenValid = true
        })
    } else if (response?.status === 500) {
      Notification({
        message: defaultErrorMessage,
        type: ERROR,
      })
    } else {
      Notification({
        message: response?.data?.message ?? defaultErrorMessage,
        type: ERROR,
      })
    }

    return Promise.reject(error)
  },
)

export default axiosInstance
