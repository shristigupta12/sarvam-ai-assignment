import useFlowStore from "@/modules/store/flow-store";
import { Trash } from "lucide-react"
import { CustomNodeData } from "@/modules/types/flow";

export const DeleteTransition = ({id, data, index}:{id: string, data: CustomNodeData, index: number}) => {
    
    const updateNodeData = useFlowStore((state) => state.updateNodeData);
    const removeTransition = (index: number) => {
        const newTransitions = [...data.transitions]
        newTransitions.splice(index, 1)
        updateNodeData(id, { transitions: newTransitions })
    }

    return (
        <button className="border-none outline-none" onClick={() => removeTransition(index)}>
            <Trash />
        </button>
    )
}