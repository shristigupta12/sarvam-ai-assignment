import { cn } from "@/lib/utils"
import { NodeBackgroundColors, NodeIcons, NodeTextColors } from "@/modules/constants/node-data";
import { NodeType } from "@/modules/interfaces/main";
import { PencilLine } from "lucide-react";
import { useState } from "react";
import { EditNodeDropdown } from "./edit-node-dropdown";

export const NodesWrapper = ({ nodeId, nodeType, title, handleTitleChange, children, className}:{ nodeId: string, nodeType: NodeType, title: string, handleTitleChange: (title: string) => void, children: React.ReactNode, className?: string}) => {
    const [isEditing, setIsEditing] = useState(false);
    
    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter' || e.key === 'Escape') {
            setIsEditing(false);
        }
    };
    
    return(
        <div className={cn("border rounded-md p-1 shadow-md min-w-[200px]", className, NodeBackgroundColors[nodeType] )}>
            <div className={`p-2 flex items-center justify-between ${NodeTextColors[nodeType]} `}>
                <div className="flex items-center gap-2">
                    {NodeIcons(nodeType, 4)}
                    {isEditing ? (
                        <input 
                            type="text" 
                            value={title} 
                            onChange={(e) => handleTitleChange(e.target.value)} 
                            onBlur={() => setIsEditing(false)}
                            onKeyDown={handleKeyDown}
                            className="border-none outline-none w-fit" 
                            autoFocus
                        />
                    ) : (
                        <h3 className="text-sm font-medium">{title}</h3>
                    )}
                    <PencilLine className="w-4 h-4 cursor-pointer" onClick={() => setIsEditing(true)} />
                </div>
                <div>
                    <EditNodeDropdown id={nodeId} />
                </div>
            </div>
            {nodeType!="endCallNode" &&
                <div className="border bg-white rounded-md p-2">
                    {children}
                </div>
            }
        </div>
    )
}