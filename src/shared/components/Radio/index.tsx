import React, { ComponentProps } from 'react'
import { Controller, useFormContext } from 'react-hook-form'
import { Radio, Space } from 'antd'
import styles from './radio.module.scss'
interface RadioButtonProps {
  label?: string
  name: string
}

export type Props = RadioButtonProps & ComponentProps<typeof Radio.Group>

const RadioButton = ({ label, ...props }: Props) => (
  <Space className={styles['radio-component']}>
    {label && <span className={styles['radio-component__label']}>{label}</span>}
    <Radio.Group {...props} />
  </Space>
)

const RadioButtonWithFormControl = ({ name, ...props }: Props) => {
  const { control } = useFormContext()

  return (
    <Controller
      name={name}
      control={control}
      render={({ field }) => (
        <RadioButton
          name={name}
          value={field.value}
          onChange={field.onChange}
          {...props}
        />
      )}
    />
  )
}

RadioButton.Formik = RadioButtonWithFormControl

export default RadioButton
