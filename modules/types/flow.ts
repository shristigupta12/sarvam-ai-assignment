// modules/types/flow.ts

import { Node, Edge } from 'reactflow';

export interface TransitionType {
  type: "EQUATION" | "PROMPT",
  content: string;
}
export interface ConversationNodeData {
  title: string;
  promptMode: boolean;
  prompt: string;
  transitions : TransitionType[]
}

export interface FunctionNodeData {
  title: string;
  functionName: string;
  waitForResult: boolean;
  speakDuringExecution: boolean;
  globalNode: boolean;
}

export interface CallTransferNodeData {
  title: string;
  phoneNumber: string;
}

export interface PressDigitNodeData {
  title: string;
  instructions: string;
  pauseDetectionDelay: number;
}

export interface EndCallNodeData {
  title: string;
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