import { create } from 'zustand';
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
} from 'reactflow';
import { CustomNodeData, CustomEdgeData, BeginNodeData } from '@/modules/types/flow';
import { generateUniqueEdgeId } from '../utility/helper';
import { useFlowEditor } from './use-flow-editor-store';

interface FlowState {
  nodes: Node<CustomNodeData>[];
  edges: Edge<CustomEdgeData>[];
  onNodesChange: OnNodesChange;
  onEdgesChange: OnEdgesChange;
  onConnect: OnConnect;
  onEdgesDelete: (edges: Edge[]) => void;
  setNodes: (nodes: Node<CustomNodeData>[]) => void;
  setEdges: (edges: Edge<CustomEdgeData>[]) => void;
  updateNodeData: (nodeId: string, data: Partial<CustomNodeData>) => void;
  updateEdgeData: (edgeId: string, data: Partial<CustomEdgeData>) => void;
}

export const useFlowStore = create<FlowState>((set, get) => ({
  nodes: [
    {
      id: 'begin-node',
      type: 'beginNode',
      position: { x: 100, y: 100 },
      data: {
        title: 'Begin',
      } as BeginNodeData,
    },
  ],
  edges: [],

  onNodesChange: (changes: NodeChange[]) => {
    const { onSelectionChange, selectedElements } = useFlowEditor.getState();
    const newNodes = applyNodeChanges(changes, get().nodes);
    const newSelectedNodes = selectedElements.nodes
      .map((selectedNode: Node<CustomNodeData>) => newNodes.find(n => n.id === selectedNode.id))
      .filter(Boolean) as Node<CustomNodeData>[];

    onSelectionChange({ nodes: newSelectedNodes, edges: selectedElements.edges });
    set({ nodes: newNodes });
  },

  onEdgesChange: (changes: EdgeChange[]) => {
    const { onSelectionChange, selectedElements } = useFlowEditor.getState();
    const newEdges = applyEdgeChanges(changes, get().edges);
    const newSelectedEdges = selectedElements.edges
      .map((selectedEdge: Edge<CustomEdgeData>) => newEdges.find(e => e.id === selectedEdge.id))
      .filter(Boolean) as Edge<CustomEdgeData>[];

    onSelectionChange({ nodes: selectedElements.nodes, edges: newSelectedEdges });
    set({ edges: newEdges });
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
    const { onSelectionChange, selectedElements } = useFlowEditor.getState();
    const newSelectedEdges = selectedElements.edges.filter(
      (selectedEdge: Edge<CustomEdgeData>) => !edgesToDelete.some((deletedEdge: Edge) => deletedEdge.id === selectedEdge.id)
    );
    onSelectionChange({ nodes: selectedElements.nodes, edges: newSelectedEdges });

    set((state) => ({
      edges: state.edges.filter(
        (edge) => !edgesToDelete.some((deletedEdge) => deletedEdge.id === edge.id)
      ),
    }));
  },
  
  setNodes: (nodes: Node<CustomNodeData>[]) => {
    set({ nodes });
  },

  setEdges: (edges: Edge<CustomEdgeData>[]) => {
    set({ edges });
  },

  updateNodeData: (nodeId: string, newData: Partial<CustomNodeData>) => {
    set((state) => ({
      nodes: state.nodes.map((node) =>
        node.id === nodeId ? { ...node, data: { ...node.data, ...newData } } : node
      ),
    }));
  },

  updateEdgeData: (edgeId: string, newData: Partial<CustomEdgeData>) => {
    set((state) => ({
      edges: state.edges.map((edge) =>
        edge.id === edgeId ? { ...edge, data: { ...edge.data, ...newData } } : edge
      ),
    }));
  },
})); 