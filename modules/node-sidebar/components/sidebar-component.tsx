import { useCreateNode } from "@/modules/hooks/useCreateNode";
import { onDragStart, handleNodeClick } from "../utils/node-actions";
import { NodeType } from "@/modules/interfaces/main";

export const SidebarComponent = ({nodeType, children, name}: {nodeType: NodeType, prompt: string, children: React.ReactNode, name: string}) => {
    const {createNode} = useCreateNode()
    return(
      <div
          className="flex gap-1 items-center cursor-grab active:cursor-grabbing hover:bg-neutral-100 rounded-md p-2"
          onDragStart={(event) => onDragStart(event, nodeType)}
          draggable
          onClick={() =>
            handleNodeClick(nodeType, createNode )
          }
        >
         {children} {name}
        </div>
    )
  }