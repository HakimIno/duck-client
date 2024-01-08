import { Avatar, Dropdown, DropdownItem, DropdownMenu, DropdownSection, DropdownTrigger, cn } from '@nextui-org/react'
import { LogOut, User2 } from 'lucide-react'
import useGeneralStore from '../stores/general-store';
import { useUserStore } from '../stores/user-store';
import { useMutation } from '@apollo/client';

import { LOGOUT_USER } from '../graphql/mutations/logout';
import confetti from 'canvas-confetti';

const ProfileDropDown = () => {
    const iconClasses = "text-xl text-default-500 pointer-events-none flex-shrink-0";

    const setIsLoginOpen = useGeneralStore((state) => state.setLoginIsOpen)
    const setUser = useUserStore((state) => state.setUser)
    const [logoutUser] = useMutation(LOGOUT_USER)

    const handleLogout = async () => {
        try {
            await logoutUser()
            setUser({
                id: "",
                fullname: "",
                email: "",
                bio: "",
                image: "",
            })
            confetti({
                particleCount: 100,
                spread: 70,
                origin: { y: 0.6 }
            });
            setIsLoginOpen(true)
        } catch (err) {
            console.log(err)
        }
    }
    return (
        <Dropdown>
            <DropdownTrigger>
                <Avatar isBordered src="https://i.pravatar.cc/150?u=a04258a2462d826712d" />
            </DropdownTrigger>
            <DropdownMenu variant="faded" aria-label="Dropdown menu with description">
                <DropdownSection title="Menu" showDivider>
                    <DropdownItem
                        key="new"
                        startContent={<User2 className={iconClasses} />}
                    >
                        Profile
                    </DropdownItem>
                </DropdownSection>
                <DropdownSection>
                    <DropdownItem
                        key="logout"
                        className="text-red-500"
                        color="danger"
                        startContent={<LogOut className={cn(iconClasses, "text-red-500")} />}
                        onPress={handleLogout}
                    >
                        ออกจากระบบ
                    </DropdownItem>
                </DropdownSection>
            </DropdownMenu>
        </Dropdown>
    )
}

export default ProfileDropDown