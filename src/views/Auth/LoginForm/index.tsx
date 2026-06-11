import { useContext, useEffect, useState } from 'react'
import { Button } from 'antd'
import { useSearch } from '@tanstack/react-router'
import { AuthConstants } from 'src/constants/auth'
import { AuthContext } from 'src/context/AuthContext'
import { getSafeRedirect } from 'src/routes/redirectSearch'
import { useLoginMutation } from 'src/services/useAuthService'
import useRedirect from 'src/shared/hooks/useRedirect'
import Form from 'src/shared/components/Form'
import InputField from 'src/shared/components/InputField'
import { validationSchema } from './LoginValidation'
interface User {
  email: string
  password: string
}

const { INITIAL_VALUES, INPUT_FIELDS, BUTTON } = AuthConstants.LOGIN_FORM
const LoginForm = () => {
  const search = useSearch({ from: '/auth/login', shouldThrow: false })
  const { authenticated } = useContext(AuthContext)
  const { redirect, redirectToHome } = useRedirect()
  const { mutate: login, isPending: loading } = useLoginMutation()
  const [shouldRedirectAfterLogin, setShouldRedirectAfterLogin] =
    useState(false)
  const redirectAfterLogin = getSafeRedirect(search?.redirect)

  useEffect(() => {
    if (!shouldRedirectAfterLogin || !authenticated) return

    setShouldRedirectAfterLogin(false)

    if (redirectAfterLogin) {
      redirect({ href: redirectAfterLogin, replace: true })
      return
    }

    redirectToHome()
  }, [
    authenticated,
    redirect,
    redirectAfterLogin,
    redirectToHome,
    shouldRedirectAfterLogin,
  ])

  const onSubmit = (user: User) => {
    login(user, {
      onSuccess: () => {
        setShouldRedirectAfterLogin(true)
      },
    })
  }

  return (
    <div>
      <Form
        defaultValues={INITIAL_VALUES}
        onSubmit={onSubmit}
        validationSchema={validationSchema}
      >
        {() => (
          <>
            {INPUT_FIELDS.map(({ TYPE, NAME, PLACEHOLDER }) => (
              <InputField
                key={NAME}
                type={TYPE}
                name={NAME}
                placeholder={PLACEHOLDER}
              />
            ))}
            <Button htmlType={BUTTON.TYPE} loading={loading}>
              {BUTTON.TEXT}
            </Button>
          </>
        )}
      </Form>
    </div>
  )
}

export default LoginForm
