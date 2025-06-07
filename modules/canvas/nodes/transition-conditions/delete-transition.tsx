import { useFlowStore } from "@/modules/stores/use-flow-store";
import { Trash } from "lucide-react"
import { CustomNodeData } from "@/modules/types/flow";

export const DeleteTransition = ({id, data, index}:{id: string, data: CustomNodeData, index: number}) => {
    
    const updateNodeData = useFlowStore((state) => state.updateNodeData);

    const handleDelete = () => {
        if ('transitions' in data && Array.isArray(data.transitions)) {
            const newTransitions = data.transitions.filter((_, i) => i !== index);
            updateNodeData(id, { transitions: newTransitions });
        } else {
            console.warn(`Node with ID ${id} does not support transitions or transitions are not an array.`);
        }
    }

    return (
        <Trash className="size-3 hover:cursor-pointer hover:text-neutral-800" onClick={handleDelete}/>
    )
}