import { NodeType } from "@/modules/interfaces/main";

export const handleNodeClick = (
  nodeType: NodeType,
  onAddNode: (type: NodeType, position: { x: number; y: number }) => void
) => {
  onAddNode(nodeType, { x: 50, y: 50 });
};

export const onDragStart = (event: React.DragEvent, nodeType: NodeType) => {
  event.dataTransfer.setData("application/reactflow", nodeType);
  event.dataTransfer.effectAllowed = "move";
}; 