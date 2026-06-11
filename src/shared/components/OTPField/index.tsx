import { Controller, useFormContext } from 'react-hook-form'
import OTPInput, { type OTPInputProps } from 'react-otp-input'
import Error from 'src/shared/components/Error'
import styles from './otpField.module.scss'
export interface OTPFieldProps
  extends Omit<OTPInputProps, 'numInputs' | 'renderInput'> {
  numInputs?: number
  renderInput?: OTPInputProps['renderInput']
}

interface OTPFieldFormControlProps extends Partial<OTPFieldProps> {
  name: string
}

const OTPField = ({ numInputs = 6, renderInput, ...props }: OTPFieldProps) => (
  <div className={styles['otp__container']}>
    <OTPInput
      containerStyle={styles['otp-field']}
      numInputs={numInputs}
      renderInput={renderInput || ((props) => <input {...props} />)}
      {...props}
    />
  </div>
)

const OTPFieldWithFormControl = ({
  name,
  ...props
}: OTPFieldFormControlProps) => {
  const { control } = useFormContext()

  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState: { error } }) => (
        <>
          <OTPField
            value={field.value || ''}
            onChange={field.onChange}
            {...props}
          />
          {error && <Error message={error.message || ''} />}
        </>
      )}
    />
  )
}

OTPField.Formik = OTPFieldWithFormControl

export default OTPField
