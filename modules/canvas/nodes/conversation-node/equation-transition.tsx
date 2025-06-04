import { ConversationNodeData, TransitionType } from "@/modules/types/flow"
import { Handle } from "reactflow"
import { PencilLine } from "lucide-react"
import { Position } from "reactflow"
import { DeleteTransition } from "./delete-transition"
import { EquationModal } from "./equationModal"
import { useState } from "react"
import useFlowStore from "@/modules/store/flow-store"

export const EquationTransition = ({id, index, transition, data}:{id: string, index: number, transition: TransitionType, data: ConversationNodeData}) => {
    const updateNodeData = useFlowStore((state) => state.updateNodeData)

    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleModalClose = () => {
        setIsModalOpen(false);
    };

    const handleConditionsSave = (conditionString: string) => {
        updateNodeData(id, { transitions: data.transitions.map((t, i) => i === index ? { ...t, content: conditionString } : t) })
        setIsModalOpen(false);
      };
    return (
        <div key={index} className="flex items-center justify-between p-1 bg-neutral-50 rounded-md">
            <p>{transition.content}</p>
            <div className="flex items-center gap-1">
                <button className="border-none outline-none" onClick={() => setIsModalOpen(true)}>
                    <PencilLine />
                </button>
                <DeleteTransition id={id} data={data} index={index} />
            </div>
            {isModalOpen && (
                <EquationModal
                    initialConditionString={transition.content}
                    onSave={handleConditionsSave}
                    onClose={handleModalClose}
                />
            )}
            <Handle type="target" position={Position.Right}  />
        </div>
    )
}