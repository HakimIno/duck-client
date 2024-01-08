import { FolderClock, Home, RadioTower, Regex, Tv, Users } from "lucide-react"
import React from "react"


interface IconComponentProps {
    iconString: string
    colorString: string
    sizeString: string
}

const IconComponent: React.FC<IconComponentProps> = ({
    iconString,
    colorString,
    sizeString,
}) => {
    let Icon: any | null = null
    let ThaiText: string | null = null

    if (iconString === "For You") Icon = Home
    if (iconString === "Following") Icon = RadioTower
    if (iconString === "LIVE") Icon = Tv

    if (iconString === "For You") ThaiText = "สำหรับคุณ"
    if (iconString === "Following") ThaiText = "กำลังติดตาม"
    if (iconString === "LIVE") ThaiText = "LIVE"


    return (
        <div className="w-full flex items-center hover:bg-gray-100 p-2.5 rounded-md">
            <div className="flex items-center lg:mx-0 mx-auto">
                {Icon && <Icon color={colorString} size={parseInt(sizeString, 10)} />}
                <span
                    className={`lg:block hidden pl-[9px] mt-0.5 font-semibold text-[17px] text-[${colorString}]`}
                >
                    {ThaiText}
                </span>
            </div>
        </div>
    )
}

export default IconComponent