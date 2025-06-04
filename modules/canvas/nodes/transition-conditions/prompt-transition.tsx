import { CustomNodeData, TransitionType } from "@/modules/types/flow"
import { Handle } from "reactflow"
import { PencilLine, SunMedium   } from "lucide-react"
import { Position } from "reactflow"
import { DeleteTransition } from "./delete-transition"
import { useState } from "react"
import useFlowStore from "@/modules/store/flow-store"

export const PromptTransition = ({id, index, transition, data}:{id: string, index: number, transition: TransitionType, data: CustomNodeData}) => {
    const [isEditing, setIsEditing] = useState(false)
    const updateNodeData = useFlowStore((state) => state.updateNodeData)
    const handleEditPromptTransitionContent = (e: React.ChangeEvent<HTMLInputElement>) => {
        updateNodeData(id, { transitions: data.transitions.map((t, i) => i === index ? { ...t, content: e.target.value } : t) })
    }
    const [isHovered, setIsHovered] = useState(false);

    const handleToggleEdit = () => {
        setIsEditing(!isEditing)
    }

    const handleBlur = () => {
        setIsEditing(false)
    }

    return (
        <div key={index} className="flex items-center justify-between p-2 gap-1 bg-neutral-50 rounded-md w-full relative" onMouseEnter={() => setIsHovered(true)} onMouseLeave={() => setIsHovered(false)}>
            <div className="flex items-center gap-2 flex-1 min-w-0"> <SunMedium className="size-3"/> 
            {isEditing ? (
                <input 
                    type="text" 
                    value={transition.content} 
                    onChange={handleEditPromptTransitionContent}
                    onBlur={handleBlur}
                    autoFocus
                    className="flex-1 min-w-0 text-xs focus:outline-none"
                />
            ) : (
                <p className="text-wrap flex-1 min-w-0 break-words text-xs leading-tight">{transition.content}</p>
            )}
            </div>
            <div className={`flex text-neutral-500 gap-3 flex-shrink-0  ${isHovered ? "opacity-100" : "opacity-0"}`}>
                <PencilLine className="size-3 hover:cursor-pointer hover:text-neutral-800" onClick={handleToggleEdit} />
                <DeleteTransition id={id} data={data} index={index} />
            </div>
            <Handle 
                type="source" 
                position={Position.Right} 
                id={`prompt-${index}`}
                style={{ right: -8, top: '50%', transform: 'translateY(-50%)' }}
            />
        </div>
    )
}