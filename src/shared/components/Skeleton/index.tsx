import React, { FC } from 'react'
import {
  Skeleton as AntSkeleton,
  type SkeletonProps as AntSkeletonProps,
} from 'antd'
import styles from './skeleton.module.scss'
const Skeleton: FC<AntSkeletonProps> = ({ ...props }) => {
  return (
    <div className={styles.skeleton}>
      <AntSkeleton active round {...props} />
    </div>
  )
}

export default Skeleton
