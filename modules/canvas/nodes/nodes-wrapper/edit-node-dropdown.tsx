import useFlowStore from "@/modules/store/flow-store";
import { Ellipsis } from "lucide-react"
import { useEffect, useRef, useState } from "react";

export const EditNodeDropdown = ({ id }: { id: string }) => {
    
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);
    const { deleteNode, duplicateNode } = useFlowStore();

    const handleDelete = () => {
        deleteNode(id);
        setIsOpen(false);
    }

    const handleDuplicate = () => {
        duplicateNode(id);
        setIsOpen(false);
    }

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (isOpen && dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        }
        document.addEventListener('click', handleClickOutside);
        return () => document.removeEventListener('click', handleClickOutside);
    }, [isOpen]);

    return (
        <div className="relative">
            <button onClick={() => setIsOpen(!isOpen)}><Ellipsis /></button>
            {isOpen && (
                <div ref={dropdownRef} className="absolute -right-20 top-0 bg-white flex flex-col rounded-md shadow-md text-neutral-600">
                    <button onClick={handleDelete} className="hover:bg-neutral-100 rounded-md p-2">Delete</button>
                    <button onClick={handleDuplicate} className="hover:bg-neutral-100 rounded-md p-2">Duplicate</button>
                </div>
            )}
        </div>
    )
}