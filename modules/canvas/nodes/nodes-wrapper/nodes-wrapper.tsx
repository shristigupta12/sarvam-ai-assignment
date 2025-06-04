import { cn } from "@/lib/utils"
import { NodeBackgroundColors, NodeIcons, NodeTextColors } from "@/modules/constants/node-data";
import { NodeType } from "@/modules/interfaces/main";
import { PencilLine } from "lucide-react";
import { useState } from "react";
import { EditNodeDropdown } from "./edit-node-dropdown";
import { Handle } from "reactflow";
import { Position } from "reactflow";

export const NodesWrapper = ({ nodeId, nodeType, title, handleTitleChange, children, className}:{ nodeId: string, nodeType: NodeType, title: string, handleTitleChange: (title: string) => void, children: React.ReactNode, className?: string}) => {
    const [isEditing, setIsEditing] = useState(false);
    const [isHovered, setIsHovered] = useState(false);
    
    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter' || e.key === 'Escape') {
            setIsEditing(false);
        }
    };
    
    return(
        <div 
            className={cn("border rounded-md p-1 shadow-md min-w-[300px] text-neutral-600 max-w-[400px]", className, NodeBackgroundColors[nodeType] )}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            <div className={`p-2 flex items-center justify-between gap-3 ${NodeTextColors[nodeType]} `}>
                <div className="flex items-center gap-2 flex-1 min-w-0">
                    {NodeIcons(nodeType, 4)}
                    {isEditing ? (
                        <input 
                            type="text" 
                            value={title} 
                            onChange={(e) => handleTitleChange(e.target.value)} 
                            onBlur={() => setIsEditing(false)}
                            onKeyDown={handleKeyDown}
                            className="border-none outline-none w-fit text-sm flex-1 min-w-0" 
                            autoFocus
                        />
                    ) : (
                        <h3 className="text-sm font-medium text-wrap flex-1 min-w-0 break-words">{title}</h3>
                    )}
                    <PencilLine className={`w-4 h-4 cursor-pointer flex-shrink-0 ${isHovered? "opacity-100" : "opacity-0"}`} onClick={() => setIsEditing(true)} />
                </div>
                <div className="flex-shrink-0">
                    <EditNodeDropdown id={nodeId} className={`${isHovered? "opacity-100" : "opacity-0"}`} />
                </div>
            </div>
            {nodeType!="endCallNode" &&
                <div className="border bg-white rounded-md p-2">
                    {children}
                </div>
            }
            <Handle type="target" position={Position.Top} />
        </div>
    )
}