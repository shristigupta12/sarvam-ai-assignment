// modules/types/flow.ts

import { Node, Edge } from 'reactflow';


export interface ConversationNodeData {
  prompt: string;
}

export interface FunctionNodeData {
  functionName: string;
  waitForResult: boolean;
  speakDuringExecution: boolean;
  globalNode: boolean;
}

export interface CallTransferNodeData {
  phoneNumber: string;
}

export interface PressDigitNodeData {
  instructions: string;
  pauseDetectionDelay: number;
}

export interface EndCallNodeData {
}

export interface CustomEdgeData {
  condition?: string;
}

export type CustomNodeData =
  | ConversationNodeData
  | FunctionNodeData
  | CallTransferNodeData
  | PressDigitNodeData
  | EndCallNodeData;

export interface CustomFlowNodes extends Node {
  data: CustomNodeData;
}

export type CustomFlowEdges = Edge<CustomEdgeData>;