import { ConversationNodeData, TransitionType } from "@/modules/types/flow"
import { Handle } from "reactflow"
import { PencilLine } from "lucide-react"
import { Position } from "reactflow"
import { DeleteTransition } from "./delete-transition"
import { useState } from "react"
import useFlowStore from "@/modules/store/flow-store"

export const PromptTransition = ({id, index, transition, data}:{id: string, index: number, transition: TransitionType, data: ConversationNodeData}) => {
    const [isEditing, setIsEditing] = useState(false)
    const updateNodeData = useFlowStore((state) => state.updateNodeData)
    const handleEditPromptTransitionContent = (e: React.ChangeEvent<HTMLInputElement>) => {
        updateNodeData(id, { transitions: data.transitions.map((t, i) => i === index ? { ...t, content: e.target.value } : t) })
    }

    const handleToggleEdit = () => {
        setIsEditing(!isEditing)
    }

    const handleBlur = () => {
        setIsEditing(false)
    }

    return (
        <div key={index} className="flex items-center justify-between p-1 bg-neutral-50 rounded-md">
            {isEditing ? (
                <input 
                    type="text" 
                    value={transition.content} 
                    onChange={handleEditPromptTransitionContent}
                    onBlur={handleBlur}
                    autoFocus
                />
            ) : (
                <p>{transition.content}</p>
            )}
            <div className="flex items-center gap-1">
                <button className="border-none outline-none" onClick={handleToggleEdit}>
                    <PencilLine />
                </button>
                <DeleteTransition id={id} data={data} index={index} />
            </div>
            <Handle type="target" position={Position.Right}  />
        </div>
    )
}