import React, { ReactElement } from 'react'
import { LoadingOutlined } from '@ant-design/icons'
import { Spin } from 'antd'
import styles from './Loader.module.scss'
import { LoaderSizes } from 'src/enums/LoaderSizes'
interface Props {
  icon?: ReactElement
  size?: LoaderSizes.SMALL | LoaderSizes.LARGE | LoaderSizes.DEFAULT
  tip?: string
}

const Loader: React.FC<Props> = ({ icon, size, tip }: Props) => {
  let antIcon = icon ? icon : <LoadingOutlined style={{ fontSize: 24 }} spin />
  return (
    <div className={styles['loader-container']}>
      <Spin
        indicator={antIcon}
        size={size ? size : LoaderSizes.DEFAULT}
        tip={tip}
      >
        {tip && <div />}
      </Spin>
    </div>
  )
}
export default Loader
