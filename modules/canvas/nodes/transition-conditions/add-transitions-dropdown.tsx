import { Plus } from "lucide-react"
import { useEffect, useRef, useState } from "react"
import { AddPromptTransition } from "./add-prompt-transition"
import { AddEquationTransition } from "./add-equation-transition"
import { CustomNodeData } from "@/modules/types/flow"

export const AddTransitionsDropdown = ({id, data}:{id: string, data: CustomNodeData}) => {
    const [openDropdown, setOpenDropdown] = useState(false)
    const ref = useRef<HTMLDivElement>(null)

    const handleClickOutside = (event: MouseEvent) => {
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
    }, [openDropdown])

    return (
        <div ref={ref}>
            <button className="outline-none border-none" onClick={() => setOpenDropdown(!openDropdown)}>
                <Plus />
            </button>
            {openDropdown && (
                <div className="bg-white flex flex-col">
                    <AddPromptTransition id={id} data={data} />
                    <AddEquationTransition id={id} data={data} />
                </div>
            )}
        </div>
    )
}