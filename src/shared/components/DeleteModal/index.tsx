import React from 'react'
import { ExclamationCircleFilled } from '@ant-design/icons'
import { Modal } from 'antd'
import {
  getDeleteModalTitle,
  SharedComponentsConstants,
} from 'src/constants/sharedComponents'
export interface DeleteModalProps {
  children: React.ReactNode
  resource: string
  onOk?: () => void
  onCancel?: () => void
  description?: string
}
const DeleteModal: React.FC<DeleteModalProps> = ({
  children,
  onOk,
  onCancel,
  resource,
  description,
}: DeleteModalProps) => {
  const { confirm } = Modal
  const showDeleteConfirm = () => {
    confirm({
      title: getDeleteModalTitle(resource),
      icon: <ExclamationCircleFilled />,
      content: description,
      okText: SharedComponentsConstants.DELETE_MODAL.okText,
      okType: SharedComponentsConstants.DELETE_MODAL.okType,
      cancelText: SharedComponentsConstants.DELETE_MODAL.cancelText,
      onOk,
      onCancel,
    })
  }

  return <div onClick={showDeleteConfirm}>{children}</div>
}

export default DeleteModal
