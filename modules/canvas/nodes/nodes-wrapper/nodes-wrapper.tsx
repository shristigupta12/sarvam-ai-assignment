"use client"

import { cn } from "@/lib/utils"
import { NodeBackgroundColors, NodeBorderColors, NodeIcons, NodeTextColors } from "@/modules/constants/node-data";
import { NodeType } from "@/modules/interfaces/main";
import { PencilLine } from "lucide-react";
import { useState } from "react";
import { EditNodeDropdown } from "./edit-node-dropdown";
import { useFlowEditor } from "@/modules/stores/use-flow-editor-store";

export const NodesWrapper = ({ nodeId, nodeType, title, handleTitleChange, children, className}:{ nodeId: string, nodeType: NodeType, title: string, handleTitleChange: (title: string) => void, children: React.ReactNode, className?: string}) => {
    
    const [isEditing, setIsEditing] = useState(false);
    const [isHovered, setIsHovered] = useState(false);
    const {selectedElements} = useFlowEditor();
    const isSelected = selectedElements.nodes.some(node => node.id === nodeId);
    
    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter' || e.key === 'Escape') {
            setIsEditing(false);
        }
    };
    
    return(
        <div 
            className={cn(
                "rounded-md p-1 shadow-md w-full min-w-[280px] max-w-[400px] sm:max-w-[450px] md:max-w-[500px] text-neutral-600 ", 
                className, 
                NodeBackgroundColors[nodeType],
                isSelected ? NodeBorderColors[nodeType] + " border-[1px]" : "border-none"
            )}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            <div className={`p-2 flex items-center justify-between gap-2 sm:gap-3 ${NodeTextColors[nodeType]} `}>
                <div className="flex items-center gap-2 flex-1 min-w-0 text-neutral-800">
                    {NodeIcons(nodeType, 4)}
                    {isEditing ? (
                        <input 
                            type="text" 
                            value={title} 
                            onChange={(e) => handleTitleChange(e.target.value)} 
                            onBlur={() => setIsEditing(false)}
                            onKeyDown={handleKeyDown}
                            className="border-none outline-none w-full text-xs sm:text-sm flex-1 min-w-0 bg-transparent" 
                            autoFocus
                        />
                    ) : (
                        <h3 className="text-xs sm:text-sm font-medium text-wrap flex-1 min-w-0 break-words leading-tight">{title}</h3>
                    )}
                    <PencilLine className={`w-3 h-3 sm:w-4 sm:h-4 cursor-pointer flex-shrink-0 transition-opacity ${isHovered? "opacity-100" : "opacity-0"}`} onClick={() => setIsEditing(true)} />
                </div>
                {nodeType!="beginNode" &&
                <div className="flex-shrink-0">
                    <EditNodeDropdown id={nodeId} className={`transition-opacity ${isHovered? "opacity-100" : "opacity-0"}`} />
                </div>
                }
            </div>
            {nodeType!="endCallNode" &&
                <div className={` bg-white rounded-md  ${nodeType=="beginNode" ? "p-0 border-none" : "p-1.5 sm:p-2 border"}`}>
                    {children}
                </div>
            }
        </div>
    )
}