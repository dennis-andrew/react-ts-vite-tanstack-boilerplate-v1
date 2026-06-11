import { FC, MouseEvent, ReactNode } from 'react'
import { Button as AntButton } from 'antd'
import type { ButtonType } from 'antd/es/button'
import { styledClassnames } from 'src/shared/utils/styledClassnames'
import styles from './button.module.scss'
interface ButtonProps {
  clickHandler?: (event: MouseEvent) => void
  children: ReactNode
  htmlType?: 'reset' | 'submit' | 'button'
  type?: ButtonType
  className?: string
  moduleClassName?: string
  icon?: ReactNode
  disabled?: boolean
  size?: 'small' | 'medium'
  loading?: boolean
  name?: string
  target?: string
  href?: string
}

const Button: FC<ButtonProps> = (props) => {
  const {
    clickHandler,
    children,
    htmlType = 'button',
    className,
    moduleClassName,
    icon,
    disabled,
    size,
    loading,
    name,
    target,
    href,
    type,
  } = props

  const globalClassnames = className && [className].join(' ')
  const moduleClassnames =
    moduleClassName && styledClassnames(moduleClassName, styles)

  return (
    <div className={`button ${moduleClassnames} ${globalClassnames}`}>
      <AntButton
        loading={!!loading}
        disabled={disabled}
        icon={icon}
        className={`${type} ${size}`}
        htmlType={htmlType}
        onClick={clickHandler}
        name={name}
        target={target}
        href={href}
        type={type}
      >
        {children}
      </AntButton>
    </div>
  )
}

export default Button
