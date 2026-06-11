import React, { FC } from 'react'
import styles from './error.module.scss'
interface ErrorMessageProps {
  message: string
}

const ErrorMessage: FC<ErrorMessageProps> = ({ message }) => {
  return <div className={styles['input__error']}>{message}</div>
}

export default ErrorMessage
