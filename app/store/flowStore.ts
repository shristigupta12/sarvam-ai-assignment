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
  OnEdgesDelete
} from 'reactflow';

interface FlowState {
    nodes: Node[];
    edges: Edge[];
    onNodesChange: OnNodesChange;
    onEdgesChange: OnEdgesChange;
    onConnect: OnConnect;
    onEdgesDelete: OnEdgesDelete;
    addNode: (node: Node) => void;
    deleteNode: (nodeId: string) => void;
    updateNodeData: (nodeId: string, data: Partial<Node['data']>) => void;
}

const useFlowStore = create<FlowState>((set, get) => ({
    nodes: [],

    edges: [],
  
    onNodesChange: (changes: NodeChange[]) => {
      set({
        nodes: applyNodeChanges(changes, get().nodes),
      });
    },
    onEdgesChange: (changes: EdgeChange[]) => {
      set({
        edges: applyEdgeChanges(changes, get().edges),
      });
    },
    onConnect: (connection: Connection) => {
      set({
        edges: addEdge(connection, get().edges),
      });
    },
    onEdgesDelete: (edgesToDelete: Edge[]) => {
        set((state)=> ({
            edges: state.edges.filter(
                (edge) => !edgesToDelete.some((deletedEdge) => deletedEdge.id === edge.id)
              ),
        }))
    },
    addNode: (node: Node) => {
      set((state) => ({
        nodes: [...state.nodes, node],
      }));
    },
    deleteNode: (nodeId: string) => {
      set((state) => ({
        nodes: state.nodes.filter((node) => node.id !== nodeId),
        edges: state.edges.filter((edge) => edge.source !== nodeId && edge.target !== nodeId),
    }));
    },
    updateNodeData: (nodeId: string, newData: Partial<Node['data']>) => {
        set((state) => ({
            nodes: state.nodes.map((node) =>
                node.id === nodeId
                    ? { ...node, data: { ...node.data, ...newData } }
                    : node
                ),
        }))
    }
}));

export default useFlowStore;
