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

interface FlowState {
    nodes: Node[];
    edges: Edge[];
    onNodesChange: OnNodesChange;
    onEdgesChange: OnEdgesChange;
    onConnect: OnConnect;
    addNode: (node: Node) => void;
    deleteNode: (nodeId: string) => void;
}

const useFlowStore = create<FlowState>((set, get) => ({
    nodes: [
        {
          id: '1',
          type: 'conversationNode', 
          position: { x: 100, y: 50 },
          data: { prompt: 'Hello, how can I help you today?' },
        },
        {
          id: '2',
          type: 'functionNode',
          position: { x: 400, y: 150 },
          data: { functionName: 'ProcessOrder' },
        },
        {
          id: '3',
          type: 'callTransferNode',
          position: { x: 100, y: 250 },
          data: { phoneNumber: '1-800-CALL-NOW' },
        },
        {
          id: '4',
          type: 'pressDigitNode',
          position: { x: 400, y: 350 },
          data: { instructions: 'Press 1 for Sales, 2 for Support', pauseDetectionDelay: 2000 },
        },
        {
          id: '5',
          type: 'endCallNode',
          position: { x: 250, y: 500 },
          data: {},
        },
      ],
      
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
}));

export default useFlowStore;
