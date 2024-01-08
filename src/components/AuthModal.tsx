import { useState } from 'react'
import { X } from 'lucide-react';
import useGeneralStore from '../stores/general-store'
import Login from './Login';
import Register from './Register';

const AuthModal = () => {
    const [isRegistered, setIsRegistered] = useState(true)
    const setLoginIsOpen = useGeneralStore((state) => state.setLoginIsOpen)
    const isLoginIsOpen = useGeneralStore((state) => state.isLoginOpen)
    console.log(isLoginIsOpen);

    return (
        <div
            id="AuthOverlay"
            className="fixed flex items-center justify-center z-50 top-0 left-0 w-full h-full bg-black bg-opacity-50"
        >
            <div className="relative bg-white  max-w-[470px] w-[90%] lg-w-full h-[70%] p-4 rounded-lg">
                <div className="w-full flex justify-end">
                    <button
                        onClick={() => setLoginIsOpen(!isLoginIsOpen)}
                        className="p-1.5 rounded-full bg-gray-100"
                    >
                        <X color="#000000" size="26" />
                    </button>
                </div>
                {isRegistered ? <Login /> : <Register />}
                <div className="absolute flex items-center justify-center py-5 left-0 bottom-0 border-t w-full">
                    <span className="text-[14px] text-gray-600">
                        Don't have an account?
                    </span>
                    <button
                        onClick={() => setIsRegistered(!isRegistered)}
                        className="text-[14px] text-[#F02C56] font-semibold pl-1"
                    >
                        {isRegistered ? <span>Sign up</span> : <span>Log in </span>}
                    </button>
                </div>
            </div>
        </div>
    )
}

export default AuthModal