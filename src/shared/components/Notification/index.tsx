import { message, notification } from 'antd'
import type { ArgsProps } from 'antd/es/message'
export interface INotification {
  message: string
  description?: string
  type: string
}

type notificationType = 'success' | 'error' | 'warning' | 'info' | 'open'

const Notification = ({
  message: msg,
  description,
  type,
}: INotification): unknown => {
  if (window.innerWidth <= 768) {
    return message[type as notificationType]({
      content: msg,
    } as ArgsProps)
  }
  return notification[type as notificationType]({
    message: msg,
    description,
  })
}

export default Notification
