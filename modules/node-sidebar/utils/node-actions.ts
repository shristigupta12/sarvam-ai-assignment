import { NodeType } from "@/modules/interfaces/main";
import useFlowStore from "@/modules/store/flow-store";

export const handleNodeClick = (
  nodeType: NodeType,
  createNode: (type: NodeType, position: { x: number; y: number }) => void
) => {
  if (nodeType === 'functionNode') {
    useFlowStore.getState().openFunctionModal( { x: 50, y: 50 });
  } else {
    createNode(nodeType, { x: 50, y: 50 });
  }
};

export const onDragStart = (event: React.DragEvent, nodeType: NodeType) => {
  event.dataTransfer.setData("application/reactflow", nodeType);
  event.dataTransfer.effectAllowed = "move";
}; 