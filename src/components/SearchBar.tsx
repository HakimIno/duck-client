import { Input } from '@nextui-org/react'
import { Search } from "lucide-react";
import { useState } from 'react';

const SearchBar = () => {
    const [searTeext, setSearTeext] = useState("")
   
    return (
        <Input
            isClearable
            radius="full"
            labelPlacement="outside"
            variant="bordered"
            className="w-[500px]"
            placeholder="Type to search..."
            onClear={() => setSearTeext("")}
            value={searTeext}
            onChange={(e) => setSearTeext(e.target.value)}
            startContent={
                <Search className="text-black/50 mb-0.5 dark:text-white/90 text-slate-400 pointer-events-none flex-shrink-0" />
            }
        />
    )
}

export default SearchBar