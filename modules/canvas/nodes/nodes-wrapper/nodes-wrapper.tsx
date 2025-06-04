import { cn } from "@/lib/utils"
import { NodeBackgroundColors, NodeIcons, NodeTextColors } from "@/modules/constants/node-data";
import { NodeType } from "@/modules/interfaces/main";
import { PencilLine } from "lucide-react";
import { useState } from "react";
import { EditNodeDropdown } from "./edit-node-dropdown";

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
            className={cn("border rounded-md p-1 shadow-md w-full min-w-[280px] max-w-[400px] sm:max-w-[450px] md:max-w-[500px] text-neutral-600", className, NodeBackgroundColors[nodeType] )}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            <div className={`p-2 flex items-center justify-between gap-2 sm:gap-3 ${NodeTextColors[nodeType]} `}>
                <div className="flex items-center gap-2 flex-1 min-w-0">
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
                <div className="flex-shrink-0">
                    <EditNodeDropdown id={nodeId} className={`transition-opacity ${isHovered? "opacity-100" : "opacity-0"}`} />
                </div>
            </div>
            {nodeType!="endCallNode" &&
                <div className="border bg-white rounded-md p-1.5 sm:p-2">
                    {children}
                </div>
            }
        </div>
    )
}