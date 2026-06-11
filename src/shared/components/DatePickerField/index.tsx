import React from 'react'
import { Controller, useFormContext } from 'react-hook-form'
import {
  DatePicker as AntDatePicker,
  type DatePickerProps as AntDatePickerProps,
} from 'antd'
import dayjs from 'dayjs'
import { SharedComponentsConstants } from 'src/constants/sharedComponents'
import Error from 'src/shared/components/Error'
import styles from './datePickerField.module.scss'
interface DatePickerProps {
  name: string
  title?: string
}

const DatePicker = ({
  title,
  ...props
}: DatePickerProps & AntDatePickerProps) => {
  return (
    <div className={styles['datepicker-field']}>
      {title && <div className={styles['dropdown-field__title']}>{title}</div>}
      <AntDatePicker {...props} />
    </div>
  )
}

const DatePickerWithFormControl = (
  props: DatePickerProps & AntDatePickerProps,
) => {
  const { control } = useFormContext()

  return (
    <Controller
      name={props.name}
      control={control}
      render={({ field, fieldState: { error } }) => (
        <>
          <DatePicker
            {...props}
            value={field.value ? dayjs(field.value) : null}
            onChange={(date) => {
              field.onChange(
                date?.format(SharedComponentsConstants.DATE_FORMAT),
              )
            }}
            status={error ? 'error' : ''}
          />
          {error && <Error message={error.message || ''} />}
        </>
      )}
    />
  )
}

DatePicker.Formik = DatePickerWithFormControl

export default DatePicker
