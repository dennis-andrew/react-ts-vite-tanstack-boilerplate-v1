import React, { ComponentProps } from 'react'
import { Controller, useFormContext } from 'react-hook-form'
import { Select, type SelectProps } from 'antd'
import type { BaseOptionType, DefaultOptionType } from 'antd/es/select'
import Error from 'src/shared/components/Error'
import styles from './dropdownField.module.scss'
interface DropdownProps<
  ValueType,
  OptionType extends BaseOptionType | DefaultOptionType = DefaultOptionType,
> extends SelectProps<ValueType, OptionType> {
  name: string
  title?: string
}

const Dropdown = <
  ValueType,
  OptionType extends BaseOptionType | DefaultOptionType = DefaultOptionType,
>({
  title,
  ...props
}: DropdownProps<ValueType, OptionType>) => (
  <div className={styles['dropdown-field']}>
    {title && <div className={styles['dropdown-field__title']}>{title}</div>}
    <Select {...props} />
  </div>
)

const DropdownWithFormControl = (props: ComponentProps<typeof Dropdown>) => {
  const { control } = useFormContext()

  return (
    <Controller
      name={props.name}
      control={control}
      render={({ field, fieldState: { error } }) => (
        <>
          <Dropdown {...props} {...field} status={error ? 'error' : ''} />
          {error && <Error message={error.message || ''} />}
        </>
      )}
    />
  )
}

Dropdown.Formik = DropdownWithFormControl

export default Dropdown
