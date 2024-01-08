import React from "react"

import { useLocation } from "react-router-dom"
import TopNavbar from "../components/TopNavBar"
import SideNavMain from "../components/SideNavMain"

function MainLayout({ children }: { children: React.ReactNode }) {
    return (
        <>

            <TopNavbar />

            <div
                className={[
                    useLocation().pathname === "/" && "",
                    "flex justify-between mx-auto w-full lg:px-2.5 px-0",
                ].join(" ")}
            >
                <div>
                    <SideNavMain />
                </div>
                {children}
            </div>
        </>
    )
}

export default MainLayout