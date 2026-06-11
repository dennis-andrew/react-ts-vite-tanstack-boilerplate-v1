import React from 'react'
import { Checkbox as CustomCheckbox } from 'antd'
import type { CheckboxChangeEvent, CheckboxOptionType } from 'antd/es/checkbox'
import styles from './Checkbox.module.scss'
interface CheckboxProps {
  children?: React.ReactNode
  disabled?: boolean
  indeterminate?: boolean
  defaultChecked?: boolean
  group?: boolean
  onChange: (event: CheckboxChangeEvent | (string | number)[]) => void
  options?: Array<CheckboxOptionType | string | number>
  checked?: boolean
}

/*
Features included: 
- Single Checkbox
  - Pass Label as a child
- Checkbox Group
  - Pass list of options as an array
  - onChange function - to handle checked changes
*/

const Checkbox = ({
  children,
  group,
  options,
  disabled,
  indeterminate,
  defaultChecked,
  onChange,
  checked,
}: CheckboxProps) => {
  return (
    <div className={styles['checkbox-container']}>
      {group ? (
        <CustomCheckbox.Group options={options} onChange={onChange} />
      ) : (
        <CustomCheckbox
          indeterminate={indeterminate}
          defaultChecked={defaultChecked}
          disabled={disabled}
          checked={checked}
          onChange={onChange as (e: CheckboxChangeEvent) => void}
        >
          {children}
        </CustomCheckbox>
      )}
    </div>
  )
}

export default Checkbox
