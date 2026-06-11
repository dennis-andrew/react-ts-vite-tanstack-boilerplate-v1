import React from 'react'
import { SharedComponentsConstants } from 'src/constants/sharedComponents'
import styles from './offline.module.scss'
interface OfflineProps {
  isOffline: boolean
}

const Offline = ({ isOffline }: OfflineProps) => {
  return isOffline ? (
    <div className={styles.offline}>
      <span className={styles.offline__text}>
        {SharedComponentsConstants.OFFLINE_TEXT}
      </span>
    </div>
  ) : null
}

export default Offline
