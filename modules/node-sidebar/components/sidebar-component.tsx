import { useCreateNode } from "@/modules/hooks/useCreateNode";
import { onDragStart, handleNodeClick } from "../utils/node-actions";
import { NodeType } from "@/modules/interfaces/main";
import { useSidebar } from "@/modules/providers/sidebar-provider";

export const SidebarComponent = ({nodeType, children, name}: {nodeType: NodeType, prompt: string, children: React.ReactNode, name: string}) => {
  const {isOpen} = useSidebar();
  const {createNode} = useCreateNode()
  return(
    <div
        className={`flex gap-3 w-full items-center text-sm cursor-grab active:cursor-grabbing hover:bg-neutral-100 rounded-md p-1 ${isOpen ? "justify-start" : "justify-center"}`}
        onDragStart={(event) => onDragStart(event, nodeType)}
        draggable
        onClick={() =>
          handleNodeClick(nodeType, createNode )
        }
      >
        {children} {isOpen && name}
      </div>
  )
}