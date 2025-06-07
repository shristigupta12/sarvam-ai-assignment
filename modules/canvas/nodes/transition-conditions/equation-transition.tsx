import { CustomNodeData, TransitionType } from "@/modules/types/flow"
import { Handle } from "reactflow"
import { PencilLine, Sigma } from "lucide-react"
import { Position } from "reactflow"
import { DeleteTransition } from "./delete-transition"
import { EquationModal } from "./equationModal"
import { useState } from "react"
import { useFlowStore } from "@/modules/stores/use-flow-store"

export const EquationTransition = ({id, index, transition, data}:{id: string, index: number, transition: TransitionType, data: CustomNodeData}) => {
    const updateNodeData = useFlowStore((state) => state.updateNodeData)
    const [isHovered, setIsHovered] = useState(false);

    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleModalClose = () => {
        setIsModalOpen(false);
    };

    const handleConditionsSave = (conditionString: string) => {
        if ('transitions' in data && Array.isArray(data.transitions)) {
            updateNodeData(id, { 
                transitions: data.transitions.map((t: TransitionType, i: number) => 
                    i === index ? { ...t, content: conditionString } : t
                ) 
            });
        } else {
            console.warn(`Node with ID ${id} does not support transitions or transitions are not an array.`);
        }
        setIsModalOpen(false);
      };
    return (
        <div key={index} className={`flex items-center justify-between p-2 bg-neutral-50 rounded-md relative`} onMouseEnter={() => setIsHovered(true)} onMouseLeave={() => setIsHovered(false)}>
            <div className="flex items-center gap-2 flex-1 min-w-0"> <Sigma className="size-3"/> <p className="text-wrap flex-1 min-w-0 break-words text-sm leading-tight">{transition.content}</p></div>
            <div className={`flex items-center gap-3 text-neutral-500 flex-shrink-0 ${isHovered ? "opacity-100" : "opacity-0"}`}>
                <PencilLine className="size-3 hover:cursor-pointer hover:text-neutral-800" onClick={() => setIsModalOpen(true)} />
                <DeleteTransition id={id} data={data} index={index} />
            </div>
            {isModalOpen && (
                <EquationModal
                    initialConditionString={transition.content}
                    onSave={handleConditionsSave}
                    onClose={handleModalClose}
                />
            )}
            <Handle 
                type="source" 
                position={Position.Right} 
                id={`equation-${index}`}
                style={{ 
                    right: -8, 
                    top: '50%', 
                    transform: 'translateY(-50%)',
                    width: '12px',
                    height: '12px',
                    borderRadius: '50%',
                    backgroundColor: 'transparent',
                    border: '1px solid #6b7280',
                    boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
                }}
            />
        </div>
    )
}