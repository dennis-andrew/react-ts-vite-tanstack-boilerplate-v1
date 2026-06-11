import React from 'react'
import { Menu } from 'antd'
import { SharedComponentsConstants } from 'src/constants/sharedComponents'
import Notification from 'src/shared/components/Notification'
import styles from './navbar.module.scss'
const Navbar = () => {
  const handleClick = () =>
    Notification(SharedComponentsConstants.LOGOUT_NOTIFICATION)
  return (
    <Menu onClick={handleClick} mode={SharedComponentsConstants.NAVBAR.MODE}>
      <Menu.Item className={styles['navbar-item']}>
        {SharedComponentsConstants.LOGOUT_TEXT}
      </Menu.Item>
    </Menu>
  )
}

export default Navbar
