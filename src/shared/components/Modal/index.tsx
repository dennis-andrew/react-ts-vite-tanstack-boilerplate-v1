import React from 'react'
import { Modal as AntModal } from 'antd'
import styles from './Modal.module.scss'
export interface ModalProps {
  children?: React.ReactNode
  closeModal: () => void
  handleOk?: () => void
  visible: boolean
  width?: number
  title?: string
  footer?: React.ReactNode[]
  confirmLoading?: boolean
}

/* Pass in the following props: 
child component, 
closeModal function,
open/close state for the modal
modal Title (optional)
width (optional)
footer (optional) - pass array of JSX.Element like buttons for the footer
handleOk (optional) - pass an async function: to be used for executing async operationsw
confirmLoading(optional) - Boolean value to set loading indicator for confirm button in a modal
*/
const Modal: React.FC<ModalProps> = ({
  children,
  closeModal,
  visible,
  title,
  width,
  handleOk,
  footer,
  confirmLoading,
}: ModalProps) => {
  return (
    <div className={styles['modal-container']}>
      <AntModal
        width={width ?? width}
        footer={footer ?? footer}
        title={title ? title : ''}
        open={visible}
        onOk={handleOk ? handleOk : closeModal}
        onCancel={closeModal}
        confirmLoading={confirmLoading}
      >
        {children}
      </AntModal>
    </div>
  )
}

export default Modal
