import type { ButtonProps } from 'antd'
import { INPUT_TYPE } from 'src/enums/inputType'

type ButtonHTMLType = ButtonProps['htmlType']
export const AuthConstants = {
  LOGIN_FORM: {
    TITLE: 'Welcome',
    INITIAL_VALUES: {
      email: 'abc@123.com',
      password: 'test@1234',
    },
    INPUT_FIELDS: [
      { TYPE: INPUT_TYPE.EMAIL, NAME: 'email', PLACEHOLDER: 'Enter email' },
      {
        TYPE: INPUT_TYPE.PASSWORD,
        NAME: 'password',
        PLACEHOLDER: 'Enter password',
      },
    ],
    BUTTON: {
      TYPE: 'submit' as ButtonHTMLType,
      TEXT: 'Login',
    },
  },
}
