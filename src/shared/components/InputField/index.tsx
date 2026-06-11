import React, { FC } from 'react'
import { Controller, useFormContext } from 'react-hook-form'
import { Input, type InputProps } from 'antd'
import Error from 'src/shared/components/Error'
interface InputFieldProps extends InputProps {
  name: string
}

const InputField: FC<InputFieldProps> = ({
  name,
  type,
  placeholder,
  ...props
}) => {
  const { control } = useFormContext()

  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState: { error } }) => (
        <div>
          <Input
            {...field}
            type={type}
            placeholder={placeholder}
            status={error ? 'error' : ''}
            {...props}
          />
          {error && <Error message={error.message || ''} />}
        </div>
      )}
    />
  )
}

export default InputField
