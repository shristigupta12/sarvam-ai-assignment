import useFlowStore from "@/modules/store/flow-store";
import { Ellipsis } from "lucide-react"
import { useEffect, useRef, useState } from "react";

export const EditNodeDropdown = ({ id, className }: { id: string, className?: string }) => {
    
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
        <div className={`relative ${className}`}>
            <button onClick={() => setIsOpen(!isOpen)} className="hover:cursor-pointer"><Ellipsis className="size-4" /></button>
            {isOpen && (
                <div ref={dropdownRef} className="absolute -right-20 top-0 bg-white flex flex-col rounded-md shadow-md text-neutral-600 p-1">
                    <button onClick={handleDelete} className="hover:bg-neutral-100 rounded-md px-2 py-1 text-start text-sm hover:cursor-pointer">Delete</button>
                    <button onClick={handleDuplicate} className="hover:bg-neutral-100 rounded-md px-2 py-1 text-start text-sm hover:cursor-pointer">Duplicate</button>
                </div>
            )}
        </div>
    )
}