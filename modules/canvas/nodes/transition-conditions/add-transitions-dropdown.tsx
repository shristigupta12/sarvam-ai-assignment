import { Plus } from "lucide-react"
import { useEffect, useRef, useState } from "react"
import { AddPromptTransition } from "./add-prompt-transition"
import { AddEquationTransition } from "./add-equation-transition"
import { CustomNodeData } from "@/modules/types/flow"

export const AddTransitionsDropdown = ({id, data}:{id: string, data: CustomNodeData}) => {
    const [openDropdown, setOpenDropdown] = useState(false)
    const [shouldHandleClickOutside, setShouldHandleClickOutside] = useState(true)
    const ref = useRef<HTMLDivElement>(null)

    const handleClickOutside = (event: MouseEvent) => {
        if (!shouldHandleClickOutside) return;
        
        if (ref.current && !ref.current.contains(event.target as Node)) {
            setOpenDropdown(false)
        }
    }
    
    useEffect(() => {
        if (openDropdown) {
            document.addEventListener('click', handleClickOutside)
        }
        return () => {
            document.removeEventListener('click', handleClickOutside)
        }
    }, [openDropdown, shouldHandleClickOutside])

    return (
        <div ref={ref} className="relative text-neutral-500 text-md">
            <button className="outline-none border-none hover:cursor-pointer" onClick={() => setOpenDropdown(!openDropdown)}>
                <Plus className="size-4"/>
            </button>
            {openDropdown && (
                <div className="bg-white flex flex-col absolute p-1 -right-20 rounded-md shadow-sm min-w-[100px] border">
                    <AddPromptTransition id={id} data={data} />
                    <AddEquationTransition id={id} data={data} setDropdownShouldClose={setShouldHandleClickOutside} />
                </div>
            )}
        </div>
    )
}