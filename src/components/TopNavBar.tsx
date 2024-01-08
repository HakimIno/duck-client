import React from "react";
import { Navbar, NavbarBrand, NavbarContent, NavbarItem, Button, NavbarMenuToggle, NavbarMenu, NavbarMenuItem, Input, Avatar } from "@nextui-org/react";
import { MessageSquareText, Search, Send, Upload } from "lucide-react";
import { Logo } from "./Logo";
import { Link } from "react-router-dom"
import SearchBar from "./SearchBar";

import { useUserStore } from "../stores/user-store";
import useGeneralStore from "../stores/general-store";
import ProfileDropDown from "./ProfileDropdown";

export default function TopNavbar() {
    const [isMenuOpen, setIsMenuOpen] = React.useState(false);
    const user = useUserStore((state) => state)
    const setUser = useUserStore((state) => state.setUser)

    const setLoginIsOpen = useGeneralStore((state) => state.setLoginIsOpen)

    const menuItems = [
        "Log Out",
    ];

    return (
        <Navbar onMenuOpenChange={setIsMenuOpen} isBordered maxWidth="full">
            <NavbarContent>
                <NavbarMenuToggle
                    aria-label={isMenuOpen ? "Close menu" : "Open menu"}
                    className="sm:hidden"
                />
                <Link to="/">
                    <NavbarBrand>
                        <Logo />
                        <p className="font-bold text-inherit">Duck</p>
                    </NavbarBrand>
                </Link>
            </NavbarContent>

            <NavbarContent className="hidden sm:flex gap-4" justify="center">
                <SearchBar />
            </NavbarContent>

            <NavbarContent justify="end">
                {!user.id ?
                    <NavbarItem className="hidden lg:flex">
                        <Button className=" border-black text-black shadow-lg" variant="bordered" startContent={<Upload size={20} color="black" />}>
                            อัปโหลด
                        </Button>
                    </NavbarItem> :
                    <NavbarItem className="hidden lg:flex" >
                        <Link to="/upload">
                            <Button isIconOnly variant="light" size="md" radius="full">
                                <Upload />
                            </Button>
                        </Link>
                    </NavbarItem>}
                {!user.id ?
                    <NavbarItem className="hidden lg:flex" >
                        <Button className="bg-black text-white shadow-lg"
                            onPress={() => setLoginIsOpen(true)}>
                            เข้าสู่ระบบ
                        </Button>
                    </NavbarItem>
                    :
                    (
                        <>
                            <NavbarItem className="hidden lg:flex" >
                                <Button isIconOnly variant="light" size="md" radius="full">
                                    <Send />
                                </Button>
                            </NavbarItem>
                            <NavbarItem className="hidden lg:flex" >
                                <Button isIconOnly variant="light" size="md" radius="full">
                                    <MessageSquareText />
                                </Button>
                            </NavbarItem>
                            <NavbarItem className="hidden lg:flex" >
                                <ProfileDropDown />
                            </NavbarItem>
                        </>

                    )}
            </NavbarContent>
            <NavbarMenu>
                {menuItems.map((item, index) => (
                    <NavbarMenuItem key={`${item}-${index}`}>
                        <Link
                            color={
                                index === 2 ? "primary" : index === menuItems.length - 1 ? "danger" : "foreground"
                            }
                            className="w-full"
                            to="#"
                        >
                            {item}
                        </Link>
                    </NavbarMenuItem>
                ))}
            </NavbarMenu>
        </Navbar>
    );
}
