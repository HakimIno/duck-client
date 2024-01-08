import React from "react"
import TextInput from "./TextInput"

import { useUserStore } from "../stores/user-store"
import { GraphQLErrorExtensions } from "graphql"
import useGeneralStore from "../stores/general-store"
import { useMutation } from "@apollo/client"
import { REGISTER_USER } from "../graphql/mutations/register"
import { Button } from "@nextui-org/react"
import confetti from "canvas-confetti"
function Register() {
    const [registerUser, { data, error, loading }] = useMutation(REGISTER_USER)

    const setUser = useUserStore((state) => state.setUser)
    const setLoginIsOpen = useGeneralStore((state) => state.setLoginIsOpen)
    //errors is an object with property of email, password, fullname, confirmPassword mapped to an error message. type it properly
    const [errors, setErrors] = React.useState<GraphQLErrorExtensions>({})

    const handleRegister = async () => {
        try {
            setErrors({})
            await registerUser({
                variables: {
                    email: loginData.email,
                    password: loginData.password,
                    fullname: loginData.fullName,
                    confirmPassword: loginData.confirmPassword,
                },
            })
            confetti({
                particleCount: 100,
                spread: 70,
                origin: { y: 0.6 }
            });
            setUser(data.register.user)
            setLoginIsOpen(false)
        } catch (_) {
            if (error && error.graphQLErrors && error.graphQLErrors[0].extensions) {
                const validationErrors = error.graphQLErrors[0].extensions
                setErrors(validationErrors)
            }
        }
    }
    const [loginData, setLoginData] = React.useState({
        email: "",
        password: "",
        fullName: "",
        confirmPassword: "",
    })

    const clearFullName = () => {
        setLoginData({ ...loginData, fullName: "" });
    };

    const clearEmail = () => {
        setLoginData({ ...loginData, email: '' });
    };

    const clearPassword = () => {
        setLoginData({ ...loginData, password: '' });
    };
    const clearConfirmPassword = () => {
        setLoginData({ ...loginData, confirmPassword: '' });
    };

    return (
        <>
            <div className="text-center text-[28px] mb-4 font-bold">Sign up</div>

            <div className="px-6 py-2">
                <TextInput
                    max={64}
                    value={loginData.fullName}
                    placeHolder="Enter your full name"
                    onChange={(e) =>
                        setLoginData({ ...loginData, fullName: e.target.value })
                    }
                    inputType="email"
                    autoFocus={true}
                    error={errors?.fullname as string}
                    onClear={clearFullName}
                />
            </div>
            <div className="px-6 py-2">
                <TextInput
                    autoFocus={false}
                    max={64}
                    value={loginData.email}
                    onChange={(e) =>
                        setLoginData({ ...loginData, email: e.target.value })
                    }
                    placeHolder="Email"
                    inputType="text"
                    error={errors?.email as string}
                    onClear={clearEmail}
                />
            </div>
            <div className="px-6 py-2">
                <TextInput
                    autoFocus={false}
                    max={64}
                    onChange={(e) =>
                        setLoginData({ ...loginData, password: e.target.value })
                    }
                    value={loginData.password}
                    placeHolder="Password"
                    inputType="password"
                    error={errors?.password as string}
                    onClear={clearPassword}
                />
            </div>
            <div className="px-6 py-2">
                <TextInput
                    autoFocus={false}
                    max={64}
                    onChange={(e) =>
                        setLoginData({ ...loginData, confirmPassword: e.target.value })
                    }
                    value={loginData.confirmPassword}
                    placeHolder="Confirm Password"
                    inputType="password"
                    error={errors?.confirmPassword as string}
                    onClear={clearConfirmPassword}
                />
            </div>
            <div className="px-6 text-[12px] text-gray-600">Forgot password?</div>
            <div className="px-6 mt-6">
                <Button
                    onClick={handleRegister}
                    fullWidth
                    isLoading={loading}
                    className={[
                        "w-full text-[17px] font-semibold text-white py-6 rounded-2xl",
                        !loginData.email ||
                            !loginData.password ||
                            !loginData.fullName ||
                            !loginData.confirmPassword
                            ? "bg-gray-200"
                            : "bg-black",
                    ].join(" ")} >
                    ลงทะเบียน
                </Button>

            </div>
        </>
    )
}

export default Register