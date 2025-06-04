import useFlowStore from "@/modules/store/flow-store"
import { CustomNodeData } from "@/modules/types/flow"
import { useState, useEffect } from "react";
import { EquationModal } from "./equationModal";
import { Sigma } from "lucide-react";

export const AddEquationTransition = ({id, data, setDropdownShouldClose}:{id: string, data: CustomNodeData, setDropdownShouldClose?: (should: boolean) => void}) => {
    const updateNodeData = useFlowStore((state) => state.updateNodeData)

    const [isModalOpen, setIsModalOpen] = useState(false);

    // Notify parent when modal state changes
    useEffect(() => {
        if (setDropdownShouldClose) {
            setDropdownShouldClose(!isModalOpen);
        }
    }, [isModalOpen, setDropdownShouldClose]);

    const handleModalClose = () => {
        setIsModalOpen(false);
    };

    const handleConditionsSave = (conditionString: string) => {
        updateNodeData(id, { transitions: [...data.transitions, { type: "EQUATION", content: conditionString }] })
        setIsModalOpen(false);
      };

    return (
        <div className="relative">
        <button className="border-none outline-none w-full text-start py-1 px-2 hover:bg-neutral-50 rounded-md hover:cursor-pointer flex items-center gap-2 text-neutral-600 hover:text-neutral-800" onClick={() => setIsModalOpen(true)}> <Sigma className="size-3"/> <p className="leading-tight">Equation</p></button>
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