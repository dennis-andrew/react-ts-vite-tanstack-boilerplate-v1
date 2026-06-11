import type { MenuProps, ModalFuncProps } from 'antd'
import { NotificationTypes } from 'src/enums/notificationTypes'
type MenuMode = MenuProps['mode']
type LegacyButtonType = ModalFuncProps['okType']

export const SharedComponentsConstants = {
  DELETE_MODAL: {
    okText: 'Yes',
    okType: 'danger' as LegacyButtonType,
    cancelText: 'No',
  },

  SELECT_PLACEHOLDER: 'Select',

  NAVBAR: {
    MODE: 'horizontal' as MenuMode,
  },

  LOGOUT_TEXT: 'Logout',

  LOGOUT_NOTIFICATION: {
    message: 'Logout',
    description: 'user loggedout successfully',
    type: NotificationTypes.SUCCESS,
  },

  OFFLINE_TEXT: 'No Internet Connection',

  RESTRICTED_ACCESS_TEXT: 'You are not authorised to view this route !!',

  SEARCH_PLACEHOLDER: 'Search...',

  DATE_FORMAT: 'YYYY-MM-DD',

  FILE_UPLOAD: {
    name: 'file',
    mockUrl: 'https://www.mocky.io/v2/5cc8019d300000980a055e76',
    authorization: 'authorization-text',
  },
}

export const getDeleteModalTitle = (resource: string) =>
  `Are you sure delete this ${resource}?`

export const getFileSuccessMessage = (name?: string) =>
  `${name} file uploaded successfully`

export const getFileErrorMessage = (name?: string) =>
  `${name} file upload failed.`
