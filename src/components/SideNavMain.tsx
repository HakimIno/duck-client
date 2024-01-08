import React, { useState } from "react"
import { useLocation, Link } from "react-router-dom"
import MenuItem from "./MenuItem"
import MenutItemFollow from "./MenuItemFollow"
import { useQuery } from "@apollo/client"
import { GET_USERS } from "../graphql/queries/getUsers"

function SideNavMain() {
    const { data, loading, fetchMore } = useQuery(GET_USERS, {})
    const [showAllUsers, setShowAllUsers] = useState(false)

    const displayedUsers = showAllUsers
        ? data?.getUsers
        : data?.getUsers.slice(0, 3) // Only show the first 3 users

    return (
        <nav
            id="SideNavMain"
            className={[
                "lg:w-[250px]",
                "fixed z-20 bg-white  h-full lg:border-r-0 border-r  overflow-auto",
            ].join(" ")}
        >
            <div className="lg:w-full w-[55px] mx-auto">
                <Link to="/">
                    <MenuItem
                        iconString="For You"
                        colorString={useLocation().pathname === "/" ? "#F02C56" : "#000000"}
                        sizeString="24"
                    />
                </Link>
                <Link to="/following">
                    <MenuItem
                        iconString="Following"
                        colorString={useLocation().pathname === "/following" ? "#F02C56" : "#000000"}
                        sizeString="24"
                    />
                </Link>
                <Link to="/live">
                    <MenuItem
                        iconString="LIVE"
                        colorString={useLocation().pathname === "/live" ? "#F02C56" : "#000000"}
                        sizeString="24"
                    />
                </Link>
                <div className="border-b lg:ml-2 mt-2" />
                <div className="lg:block hidden text-xs text-gray-600 font-semibold pt-4 pb-2 px-2">
                    Suggested accounts
                </div>
                <div className="lg:hidden block pt-3" />
                <ul>
                    {displayedUsers?.map((user: any) => (
                        <li className="cursor-pointer" key={user.id}>
                            <MenutItemFollow user={user} />
                        </li>
                    ))}
                </ul>
                <button
                    onClick={() => setShowAllUsers(!showAllUsers)}
                    className="lg:block hidden text-[#F02C56] pt-1.5 pl-2 text-[13px]"
                >
                    See more
                </button>
                <div className="border-b lg:ml-2 mt-2" />
                <div className="lg:block hidden text-xs text-gray-600 font-semibold pt-4 pb-2 px-2">
                    Following accounts
                </div>
                <div className="lg:hidden block pt-3" />
                <div className="cursor-pointer">
                    <MenutItemFollow user={{
                        __typename: undefined,
                        bio: undefined,
                        createdAt: undefined,
                        email: "",
                        fullname: "",
                        id: 0,
                        image: undefined,
                        password: "",
                        updatedAt: undefined
                    }} />
                </div>
                <button className="lg:block hidden text-[#F02C56] pt-1.5 pl-2 text-[13px]">
                    See all
                </button>
                <div className="lg:block hidden border-b lg:ml-2 mt-2" />
                <div className="lg:block hidden text-[11px] text-gray-500">
                    <div className="pt-4 px-2">
                        About Newsroom TikTok Shop Contact Careers ByteDance
                    </div>
                    <div className="pt-4 px-2">
                        TikTok for Good Advertise Developers Transperancy TikTok Rewards
                        TikTok Browse TikTok
                    </div>
                    <div className="pt-4 px-2">2023 TikTok</div>
                    <div className="pb-14"></div>
                </div>
            </div>
        </nav>
    )
}

export default SideNavMain