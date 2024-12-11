"use client"
import { useState } from "react"

export const useDrawer = () => {
    const [sidebar , setSidebar] = useState(false)

    const handleSidebar = () => {
        setSidebar(!sidebar)
        console.log(sidebar);
        
    }

    return [handleSidebar , sidebar ,setSidebar]
}