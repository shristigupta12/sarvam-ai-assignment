import { useCreateNode } from "@/modules/hooks/useCreateNode";
import { onDragStart, handleNodeClick } from "../utils/node-actions";
import { NodeType } from "@/modules/interfaces/main";
import { useSidebar } from "@/modules/providers/sidebar-provider";

export const SidebarComponent = ({nodeType, children, name}: {nodeType: NodeType, prompt: string, children: React.ReactNode, name: string}) => {
  const {isOpen} = useSidebar();
  const {createNode} = useCreateNode()
  return(
    <div
        className={`flex gap-2 sm:gap-3 w-full items-center cursor-grab active:cursor-grabbing hover:bg-neutral-100 rounded-md p-1.5 sm:p-2 transition-colors ${isOpen ? "justify-start" : "justify-center"}`}
        onDragStart={(event) => onDragStart(event, nodeType)}
        draggable
        onClick={() =>
          handleNodeClick(nodeType, createNode )
        }
      >
        <div className="flex-shrink-0">
          {children}
        </div>
        {isOpen && (
          <span className="text-xs sm:text-sm font-medium text-neutral-700 truncate">
            {name}
          </span>
        )}
      </div>
  )
}