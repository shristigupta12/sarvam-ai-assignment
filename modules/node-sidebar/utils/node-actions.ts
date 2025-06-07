import { NodeType } from "@/modules/interfaces/main";
import { useUIStore } from "@/modules/stores/use-ui-store";

export const handleNodeClick = (
  nodeType: NodeType,
  createNode: (type: NodeType, position: { x: number; y: number }) => void
) => {
  if (nodeType === 'functionNode') {
    useUIStore.getState().openFunctionModal( { x: 50, y: 50 });
  } else {
    createNode(nodeType, { x: 50, y: 50 });
  }
};

export const onDragStart = (event: React.DragEvent, nodeType: NodeType) => {
  const preview = document.getElementById(`drag-preview-${nodeType}`);
  if (preview) {
    event.dataTransfer.setDragImage(preview, 0, 0);
  }
  event.dataTransfer.setData("application/reactflow", nodeType);
  event.dataTransfer.effectAllowed = "move";
}; 