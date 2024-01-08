import { ReactNode, useEffect } from "react";
import { useUserStore } from "../stores/user-store";
import { useNavigate } from "react-router-dom";
import useGeneralStore from "../stores/general-store";
import Feed from "../page/Feed";

const ProtectedRoutes = ({ children }: { children: ReactNode }) => {
    const user = useUserStore((state) => state)
    const navigate = useNavigate()
    const setLoginIsOpen = useGeneralStore((state) => state.setLoginIsOpen)
    useEffect(() => {
        if (!user.id) {
            navigate("/")
            setLoginIsOpen(true)
        }
    }, [user.id, navigate, setLoginIsOpen])

    if (!user.id) {
        return <Feed />
    }

    return children
}

export default ProtectedRoutes