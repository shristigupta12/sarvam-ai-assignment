import { create } from 'zustand';
import { generateUniqueEdgeId, generateUniqueNodeId } from '../utility/helper';
import {
  Connection,
  Edge,
  EdgeChange,
  Node,
  NodeChange,
  addEdge,
  OnNodesChange,
  OnEdgesChange,
  OnConnect,
  applyNodeChanges,
  applyEdgeChanges,
  OnEdgesDelete,
  OnSelectionChangeFunc,
} from 'reactflow';

import {
  CustomEdgeData,
  ConversationNodeData,
  FunctionNodeData,
  CallTransferNodeData,
  PressDigitNodeData,
  EndCallNodeData,
  CustomNodeData, // Import the union type
} from '@/modules/types/flow';


// export interface CustomEdgeData {
//   condition?: string;
// }

interface SelectedElements {
  nodes: Node<CustomNodeData>[]; 
  edges: Edge<CustomEdgeData>[]; 
}

interface FlowState {
  nodes: Node<CustomNodeData>[];
  edges: Edge<CustomEdgeData>[];
  selectedElements: SelectedElements;
  onNodesChange: OnNodesChange;
  onEdgesChange: OnEdgesChange;
  onConnect: OnConnect;
  onEdgesDelete: OnEdgesDelete;
  onSelectionChange: OnSelectionChangeFunc;
  addNode: (node: Node<CustomNodeData>) => void;
  deleteNode: (nodeId: string) => void;
  duplicateNode: (nodeId: string) => void;
  updateNodeData: (nodeId: string, data: Partial<CustomNodeData>) => void;
  updateEdgeData: (edgeId: string, data: Partial<CustomEdgeData>) => void;
}

const useFlowStore = create<FlowState>((set, get) => ({
  nodes: [],
  edges: [],
  selectedElements: { nodes: [], edges: [] },

  onNodesChange: (changes: NodeChange[]) => {
    set((state) => {
      const newNodes = applyNodeChanges(changes, state.nodes);
      const newSelectedNodes = state.selectedElements.nodes
        .map(selectedNode => newNodes.find(n => n.id === selectedNode.id))
        .filter(Boolean) as Node<CustomNodeData>[]; 

      return {
        nodes: newNodes,
        selectedElements: {
          nodes: newSelectedNodes,
          edges: state.selectedElements.edges, 
        },
      };
    });
  },
  
  onEdgesChange: (changes: EdgeChange[]) => {
    set((state) => {
      const newEdges = applyEdgeChanges(changes, state.edges);
      const newSelectedEdges = state.selectedElements.edges
        .map(selectedEdge => newEdges.find(e => e.id === selectedEdge.id))
        .filter(Boolean) as Edge<CustomEdgeData>[]; 

      return {
        edges: newEdges,
        selectedElements: {
          nodes: state.selectedElements.nodes, 
          edges: newSelectedEdges,
        },
      };
    });
  },

  onConnect: (connection: Connection) => {
    const newEdge: Edge<CustomEdgeData> = {
      id: generateUniqueEdgeId(),
      source: connection.source!,
      target: connection.target!,
      sourceHandle: connection.sourceHandle,
      targetHandle: connection.targetHandle,
      type: 'customEdge',
      data: { condition: 'No condition set' },
    };
    set({
      edges: addEdge(newEdge, get().edges),
    });
  },

  onEdgesDelete: (edgesToDelete: Edge[]) => {
    set((state) => {
      const remainingEdges = state.edges.filter(
        (edge) => !edgesToDelete.some((deletedEdge) => deletedEdge.id === edge.id)
      );
      const newSelectedEdges = state.selectedElements.edges.filter(
        (selectedEdge) => !edgesToDelete.some((deletedEdge) => deletedEdge.id === selectedEdge.id)
      );

      return {
        edges: remainingEdges,
        selectedElements: {
          nodes: state.selectedElements.nodes,
          edges: newSelectedEdges,
        },
      };
    });
  },

  onSelectionChange: ({ nodes: newlySelectedNodes, edges: newlySelectedEdges }) => {
    set({ selectedElements: { nodes: newlySelectedNodes as Node<CustomNodeData>[], edges: newlySelectedEdges as Edge<CustomEdgeData>[] } });
  },

  addNode: (node: Node<CustomNodeData>) => {
    set((state) => ({
      nodes: [...state.nodes, node],
    }));
  },

  deleteNode: (nodeId: string) => {
    set((state) => {
      const remainingNodes = state.nodes.filter((node) => node.id !== nodeId);
      const remainingEdges = state.edges.filter((edge) => edge.source !== nodeId && edge.target !== nodeId);

      const newSelectedNodes = state.selectedElements.nodes.filter((node) => node.id !== nodeId);
      const newSelectedEdges = state.selectedElements.edges.filter((edge) => edge.source !== nodeId && edge.target !== nodeId);

      return {
        nodes: remainingNodes,
        edges: remainingEdges,
        selectedElements: {
          nodes: newSelectedNodes,
          edges: newSelectedEdges,
        },
      };
    });
  },

  duplicateNode: (nodeId: string) => {
    set((state) => {
      const nodeToDuplicate = state.nodes.find((node) => node.id === nodeId);
      if (!nodeToDuplicate) return state;

      const duplicatedNode: Node<CustomNodeData> = {
        ...nodeToDuplicate,
        id: generateUniqueNodeId(),
        position: {
          x: nodeToDuplicate.position.x + 20,
          y: nodeToDuplicate.position.y + 20,
        },
        selected: true,
      };

      // Update all nodes: deselect the original node and add the duplicated node
      const updatedNodes = state.nodes.map((node) =>
        node.id === nodeId ? { ...node, selected: false } : node
      );

      return {
        ...state,
        nodes: [...updatedNodes, duplicatedNode],
        selectedElements: {
          nodes: [duplicatedNode], 
          edges: [], 
        },
      };
    });
  },

  updateNodeData: (nodeId: string, newData: Partial<CustomNodeData>) => {
    set((state) => {
      const newNodes = state.nodes.map((node) =>
        node.id === nodeId
          ? { ...node, data: { ...node.data, ...newData } }
          : node
      );

      const newSelectedNodes = state.selectedElements.nodes
        .map(selectedNode => newNodes.find(n => n.id === selectedNode.id))
        .filter(Boolean) as Node<CustomNodeData>[];

      return {
        nodes: newNodes,
        selectedElements: {
          nodes: newSelectedNodes,
          edges: state.selectedElements.edges, 
        },
      };
    });
  },

  updateEdgeData: (edgeId: string, newData: Partial<CustomEdgeData>) => {
    set((state) => {
      const newEdges = state.edges.map((edge) =>
        edge.id === edgeId
          ? { ...edge, data: { ...edge.data, ...newData } } as Edge<CustomEdgeData>
          : edge
      );

      const newSelectedEdges = state.selectedElements.edges
        .map(selectedEdge => newEdges.find(e => e.id === selectedEdge.id))
        .filter(Boolean) as Edge<CustomEdgeData>[];


      return {
        edges: newEdges,
        selectedElements: {
          nodes: state.selectedElements.nodes, 
          edges: newSelectedEdges,
        },
      };
    });
  },
  
}));

export default useFlowStore;