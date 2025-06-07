import { create } from 'zustand';
import { Edge, Node, OnSelectionChangeFunc } from 'reactflow';
import { generateUniqueNodeId } from '../utility/helper';
import { useFlowStore } from './use-flow-store';
import { CustomEdgeData, CustomNodeData, FunctionNodeData } from '../types/flow';

interface SelectedElements {
  nodes: Node<CustomNodeData>[];
  edges: Edge<CustomEdgeData>[];
}

interface FlowEditorState {
  selectedElements: SelectedElements;
  onSelectionChange: OnSelectionChangeFunc;
  addNode: (node: Node<CustomNodeData>) => void;
  deleteNode: (nodeId: string) => void;
  duplicateNode: (nodeId: string) => void;
  addFunctionNode: (functionName: string, position: { x: number; y: number }) => void;
}

export const useFlowEditor = create<FlowEditorState>((set, get) => ({
  selectedElements: { nodes: [], edges: [] },

  onSelectionChange: ({ nodes, edges }) => {
    set({ selectedElements: { nodes: nodes as Node<CustomNodeData>[], edges: edges as Edge<CustomEdgeData>[] } });
  },
  
  addNode: (node: Node<CustomNodeData>) => {
    const { nodes, setNodes } = useFlowStore.getState();
    setNodes([...nodes, node]);
  },

  deleteNode: (nodeId: string) => {
    const { nodes, edges, setNodes, setEdges } = useFlowStore.getState();
    const remainingNodes = nodes.filter((node) => node.id !== nodeId);
    const remainingEdges = edges.filter((edge) => edge.source !== nodeId && edge.target !== nodeId);
    setNodes(remainingNodes);
    setEdges(remainingEdges);

    const { selectedElements } = get();
    const newSelectedNodes = selectedElements.nodes.filter((node) => node.id !== nodeId);
    const newSelectedEdges = selectedElements.edges.filter((edge) => edge.source !== nodeId && edge.target !== nodeId);
    set({ selectedElements: { nodes: newSelectedNodes, edges: newSelectedEdges } });
  },

  duplicateNode: (nodeId: string) => {
    const { nodes, setNodes } = useFlowStore.getState();
    const nodeToDuplicate = nodes.find((node) => node.id === nodeId);
    if (!nodeToDuplicate) return;

    const duplicatedNode: Node<CustomNodeData> = {
      ...nodeToDuplicate,
      id: generateUniqueNodeId(),
      position: {
        x: nodeToDuplicate.position.x + 20,
        y: nodeToDuplicate.position.y + 20,
      },
      selected: true,
    };

    const updatedNodes = nodes.map((node) =>
      node.id === nodeId ? { ...node, selected: false } : node
    );

    setNodes([...updatedNodes, duplicatedNode]);
    set({ selectedElements: { nodes: [duplicatedNode], edges: [] } });
  },

  addFunctionNode: (functionName: string, position: { x: number; y: number }) => {
    const { nodes, setNodes } = useFlowStore.getState();
    const newNode: Node<FunctionNodeData> = {
      id: generateUniqueNodeId(),
      type: 'functionNode',
      position,
      data: {
        title: 'Function',
        functionName: functionName,
        transitions: [],
      },
    };
    setNodes([...nodes, newNode as Node<CustomNodeData>]);
  },
})); 