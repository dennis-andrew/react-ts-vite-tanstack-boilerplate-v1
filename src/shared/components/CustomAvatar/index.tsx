import React from 'react'
import { UserOutlined } from '@ant-design/icons'
import { Avatar } from 'antd'
const CustomAvatar = ({
  name,
  size,
}: {
  name: string | undefined
  size?: 'small' | 'large'
}) => {
  const getNameInitials = (name: string) =>
    name
      .split(' ')
      .filter((ele, idx, arr) => idx === 0 || idx + 1 === arr.length)
      .map((ele) => ele[0].toUpperCase())
      .join('')

  const numberFromText = (text: string) => {
    const charCodes = text
      .split('')
      .map((char) => char.charCodeAt(0))
      .join('')
    return parseInt(charCodes, 10)
  }

  const getColor = (text: string) => {
    return `avatar-bg-color--${numberFromText(getNameInitials(text)) % 18}`
  }
  return (
    <Avatar
      size={size}
      className={name ? getColor(name) : 'avatar-bg-color--1'}
    >
      {name ? getNameInitials(name) : <UserOutlined />}
    </Avatar>
  )
}

export default CustomAvatar
