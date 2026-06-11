import React from 'react'
import {
  FieldValues,
  FormProvider,
  Mode,
  Resolver,
  SubmitErrorHandler,
  useForm,
  UseFormProps,
  UseFormReturn,
} from 'react-hook-form'

import { yupResolver } from '@hookform/resolvers/yup'
import { Form as AntdForm } from 'antd'
import * as Yup from 'yup'

import { ValidationMode } from 'src/enums/validationMode'

const { onBlur } = ValidationMode

export interface FormProps<T extends FieldValues>
  extends Pick<UseFormProps<T>, 'defaultValues' | 'values' | 'resolver'> {
  children: (props: UseFormReturn<T>) => React.ReactNode
  onSubmit?: (value: T) => void
  onError?: SubmitErrorHandler<T>
  validationSchema?: Yup.ObjectSchema<T>
  mode?: Mode
}

const Form = <T extends FieldValues>({
  children,
  defaultValues,
  onSubmit,
  validationSchema,
  mode = onBlur,
  values,
  resolver,
  onError,
  ...props
}: FormProps<T>) => {
  const resolvedResolver =
    resolver ?? (validationSchema ? yupResolver(validationSchema) : undefined)

  const methods = useForm<T>({
    resolver: resolvedResolver as Resolver<T, unknown>,
    defaultValues,
    values,
    mode,
  })

  const { handleSubmit } = methods

  return (
    <FormProvider {...methods}>
      {/* Used AntdForm since Button inside the form can just be given submit prop as true 
      and submit will automatically be called onClick 

      Note: onSubmit needs to be provided to this Form for the above functionality to work properly
      */}
      <AntdForm
        onFinish={onSubmit && handleSubmit(onSubmit, onError)}
        {...props}
      >
        {children(methods)}
      </AntdForm>
    </FormProvider>
  )
}

export default Form
