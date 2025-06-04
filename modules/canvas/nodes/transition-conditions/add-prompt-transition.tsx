import useFlowStore from "@/modules/store/flow-store"
import { CustomNodeData } from "@/modules/types/flow"
import { SunMedium } from "lucide-react"

export const AddPromptTransition = ({id, data}:{id: string, data: CustomNodeData}) => {
    const updateNodeData = useFlowStore((state) => state.updateNodeData)
    const handleAddPromptTransition = () => {
        updateNodeData(id, { transitions: [...data?.transitions, { type: "PROMPT", content: "New transition prompt" }] })
    }
    return (
        <button className="border-none outline-none w-full text-start py-1 px-2 hover:bg-neutral-50 rounded-md hover:cursor-pointer flex items-center gap-2 text-neutral-600 hover:text-neutral-800" onClick={handleAddPromptTransition}> <SunMedium className="size-3"/> <p className="leading-tight">Prompt</p></button>
    )
}