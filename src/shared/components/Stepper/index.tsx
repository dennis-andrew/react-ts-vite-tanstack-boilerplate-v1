import React, { FC, useState } from 'react'
import { Steps, type StepProps, type StepsProps } from 'antd'
import styles from './stepper.module.scss'
export interface StepItem extends StepProps {
  component?: React.ReactElement
}
interface StepperProps extends StepsProps {
  items: StepItem[]
  title?: string
  destroyOnChange?: boolean
}

const Stepper: FC<StepperProps> = ({ items, destroyOnChange, ...props }) => {
  const [current, setCurrent] = useState(0)

  return (
    <div className={styles['stepper']}>
      <div className={styles['stepper__header']}>
        <Steps current={current} onChange={setCurrent} {...props}>
          {items.map(({ component: _component, ...props }, index) => (
            <Steps.Step key={index} {...props} />
          ))}
        </Steps>
      </div>
      <div className={styles['stepper__content']}>
        {destroyOnChange
          ? items[current]?.component
          : items?.map(({ component = <></> }, index) => (
              <div
                key={index}
                className={index !== current ? styles['d-none'] : ''}
              >
                {component}
              </div>
            ))}
      </div>
    </div>
  )
}

export default Stepper
