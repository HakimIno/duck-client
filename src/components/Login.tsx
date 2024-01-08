import React from 'react'
import TextInput from './TextInput'
import { useUserStore } from '../stores/user-store'
import useGeneralStore from '../stores/general-store'
import { useMutation } from '@apollo/client'
import { LOGIN_USER } from '../graphql/mutations/login'
import { Button } from '@nextui-org/react'
import { GraphQLErrorExtensions } from 'graphql/error'

function Login() {
  const [loginData, setLoginData] = React.useState({
    email: "kimsnow@gmail.com",
    password: "kim0878744635",
  })
  const setUser = useUserStore((state) => state.setUser)
  const setLoginIsOpen = useGeneralStore((state) => state.setLoginIsOpen)

  const [loginUser, { error, loading }] = useMutation(LOGIN_USER, {
    variables: {
      email: loginData.email,
      password: loginData.password,
    },
  })

  const [errors, setErrors] = React.useState<GraphQLErrorExtensions>({})

  const handleLogin = async () => {
    try {
      const response = await loginUser()
      setUser(response.data.login.user)
      setLoginIsOpen(false)
    } catch (_) {
      if (error && error.graphQLErrors && error.graphQLErrors[0].extensions) {
        const validationErrors = error.graphQLErrors[0].extensions
        setErrors(validationErrors)
      }
    }
  }
  const clearEmail = () => {
    setLoginData({ ...loginData, email: '' });
  };

  const clearPassword = () => {
    setLoginData({ ...loginData, password: '' });
  };

  return (
    <>
      <div className="text-center text-[28px] mb-4 font-bold">Login</div>

      <div className="px-6 py-2">
        <TextInput
          max={64}
          placeHolder="Enter your email address"
          value={loginData.email}
          onChange={(e) =>
            setLoginData({ ...loginData, email: e.target.value })
          }
          inputType="email"
          autoFocus={true}
          error={errors?.email as string}
          onClear={clearEmail}
        />
      </div>
      <div className="px-6 py-2">
        <TextInput
          autoFocus={false}
          value={loginData.password}
          max={64}
          onChange={(e) =>
            setLoginData({ ...loginData, password: e.target.value })
          }
          placeHolder="Password"
          inputType="password"
          error={errors?.password as string}
          onClear={clearPassword}
        />
      </div>
      <div className="px-6 text-[12px] py-2 text-gray-600">Forgot password?</div>
      <div className="px-6 mt-6">
        <Button
          disabled={!loginData.email || !loginData.password}
          onClick={handleLogin}
          isLoading={loading}
          fullWidth
          variant="flat"
          className={[
            "w-full text-[17px] bg-black text-white font-semibold py-6 rounded-2xl ",
          ].join(" ")} >
          Login
        </Button>

      </div>
    </>
  )
}

export default Login