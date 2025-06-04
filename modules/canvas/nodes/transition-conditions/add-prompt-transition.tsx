import useFlowStore from "@/modules/store/flow-store"
import { CustomNodeData } from "@/modules/types/flow"

export const AddPromptTransition = ({id, data}:{id: string, data: CustomNodeData}) => {
    const updateNodeData = useFlowStore((state) => state.updateNodeData)
    const handleAddPromptTransition = () => {
        updateNodeData(id, { transitions: [...data.transitions, { type: "PROMPT", content: "New transition prompt" }] })
    }
    return (
        <button className="border-none outline-none" onClick={handleAddPromptTransition}>Prompt</button>
    )
}