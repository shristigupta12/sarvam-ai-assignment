import useFlowStore from "@/modules/store/flow-store"
import { ConversationNodeData } from "@/modules/types/flow"
import { useState } from "react";
import { EquationModal } from "./equationModal";

export const AddEquationTransition = ({id, data}:{id: string, data: ConversationNodeData}) => {
    const updateNodeData = useFlowStore((state) => state.updateNodeData)

    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleModalClose = () => {
        setIsModalOpen(false);
    };

    const handleConditionsSave = (conditionString: string) => {
        updateNodeData(id, { transitions: [...data.transitions, { type: "EQUATION", content: conditionString }] })
        setIsModalOpen(false);
      };

    return (
        <div className="relative">
        <button className="border-none outline-none" onClick={() => setIsModalOpen(true)}>Equation</button>
        {isModalOpen && (
            <EquationModal
              initialConditionString={''}
              onSave={handleConditionsSave}
              onClose={handleModalClose}
            />
          )}
        </div>
    )
}