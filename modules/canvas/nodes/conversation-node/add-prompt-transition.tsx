import useFlowStore from "@/modules/store/flow-store"
import { ConversationNodeData } from "@/modules/types/flow"

export const AddPromptTransition = ({id, data}:{id: string, data: ConversationNodeData}) => {
    const updateNodeData = useFlowStore((state) => state.updateNodeData)
    const handleAddPromptTransition = () => {
        updateNodeData(id, { transitions: [...data.transitions, { type: "PROMPT", content: "New transition prompt" }] })
    }
    return (
        <button className="border-none outline-none" onClick={handleAddPromptTransition}>Prompt</button>
    )
}