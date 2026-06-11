import React from 'react'
import { Controller, useFormContext } from 'react-hook-form'
import { Switch as AntSwitch, type SwitchProps as AntSwitchProps } from 'antd'
import Error from 'src/shared/components/Error'
import styles from './switch.module.scss'
export interface SwitchProps extends AntSwitchProps {}

export interface SwitchFormControlProps extends SwitchProps {
  name: string
}

const Switch = (props: SwitchProps) => (
  <div className={styles['switch-component']}>
    <AntSwitch {...props} />
  </div>
)

const SwitchWithFormControl = ({ name, ...props }: SwitchFormControlProps) => {
  const { control } = useFormContext()

  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState: { error } }) => (
        <>
          <Switch checked={field.value} onChange={field.onChange} {...props} />
          {error && <Error message={error.message || ''} />}
        </>
      )}
    />
  )
}

Switch.Formik = SwitchWithFormControl

export default Switch
