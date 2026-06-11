import React, { ReactNode } from 'react'
import { message, Upload, type UploadProps, type UploadFile } from 'antd'
import {
  getFileErrorMessage,
  getFileSuccessMessage,
  SharedComponentsConstants,
} from 'src/constants/sharedComponents'
import { FILE_STATUS } from 'src/enums/fileStatus.enum'
import styles from './FileUpload.module.scss'

interface FileUploadProps {
  children?: React.ReactNode
  dragdrop?: boolean
  uploadIcon?: ReactNode
  uploadText?: ReactNode
  uploadHint?: ReactNode
  fileTypes?: string
  actionURL?: string
  multiple?: boolean
  maxCount?: number
  handleChange: (file: FileList | UploadFile<unknown>) => void
}

// Props for generic upload with a button: child component
// Props for DragnDrop:dragdrop, uploadIcon, uploadText, uploadHint, fileTypes
const FileUpload = ({
  children,
  actionURL,
  dragdrop,
  uploadIcon,
  uploadText,
  uploadHint,
  fileTypes,
  multiple,
  maxCount,
  handleChange,
}: FileUploadProps) => {
  const { Dragger } = Upload
  const propsDragDrop: UploadProps = {
    name: SharedComponentsConstants.FILE_UPLOAD.name,
    multiple: multiple ? true : false,
    action: actionURL
      ? actionURL
      : SharedComponentsConstants.FILE_UPLOAD.mockUrl, //uploading URL
    headers: {
      authorization: SharedComponentsConstants.FILE_UPLOAD.authorization,
    },
    accept: fileTypes,
    onChange(info) {
      if (info.file.status !== FILE_STATUS.UPLOADING) {
        handleChange(info.file)
      }
      if (info.file.status === FILE_STATUS.DONE) {
        message.success(getFileSuccessMessage(info.file.name))
      } else if (info.file.status === FILE_STATUS.ERROR) {
        message.error(getFileErrorMessage(info.file.name))
      }
    },
    onDrop(e) {
      handleChange(e.dataTransfer.files)
    },
  }
  const propsGeneric: UploadProps = {
    name: SharedComponentsConstants.FILE_UPLOAD.name,
    multiple: multiple ? true : false,
    action: actionURL
      ? actionURL
      : SharedComponentsConstants.FILE_UPLOAD.mockUrl, //uploading URL
    headers: {
      authorization: SharedComponentsConstants.FILE_UPLOAD.authorization,
    },
    maxCount: maxCount,
    onChange(info) {
      if (info.file.status !== FILE_STATUS.UPLOADING) {
        handleChange(info.file)
      }
      if (info.file.status === FILE_STATUS.DONE) {
        message.success(getFileSuccessMessage(info.file.name))
      } else if (info.file.status === FILE_STATUS.ERROR) {
        message.error(getFileErrorMessage(info.file.name))
      }
    },
  }
  return (
    <div className={styles['file-upload-container']}>
      {dragdrop ? (
        <Dragger {...propsDragDrop}>
          <div className={styles['ant-upload-drag-icon']}>{uploadIcon}</div>
          <div className={styles['ant-upload-text']}>{uploadText}</div>
          <div className={styles['ant-upload-hint']}>{uploadHint}</div>
        </Dragger>
      ) : (
        <Upload {...propsGeneric} className={styles['file-upload']}>
          {children}
        </Upload>
      )}
    </div>
  )
}

export default FileUpload
