import { useCallback } from 'react';
import { Node as FlowNode } from 'reactflow';
import useFlowStore from '@/modules/store/flow-store';
import { generateUniqueNodeId } from '@/modules/utility/helper';
import { NodeType } from '../interfaces/main';
import { CallTransferNodeData, ConversationNodeData, CustomNodeData, EndCallNodeData, FunctionNodeData, PressDigitNodeData } from '../types/flow';

export const useCreateNode = () => {
  const { addNode } = useFlowStore();

  const createNode = useCallback((type: NodeType, position: { x: number; y: number } = { x: 50, y: 50 }) => {
    
    const newNode: FlowNode<CustomNodeData> = {
      id: generateUniqueNodeId(),
      type,
      position,
      data: {},
    };

    let initialData: CustomNodeData = {};
    
    switch (type) {
      case 'conversationNode':
        initialData = { prompt: 'New conversation', title: "Conversation" } as ConversationNodeData;
        break;
      case 'functionNode':
        initialData = { functionName: 'newFunction', title: "Function", waitForResult: false, speakDuringExecution: false, globalNode: false } as FunctionNodeData;
        break;
      case 'callTransferNode':
        initialData = { phoneNumber: '+1XXXXXXXXXX', title: "Call Transfer" } as CallTransferNodeData;
        break;
      case 'pressDigitNode':
        initialData = { instructions: 'Press...', pauseDetectionDelay: 1000, title: "Press Digit" } as PressDigitNodeData;
        break;
      case 'endCallNode':
        initialData = { title: "End Call" } as EndCallNodeData;
        break;
      default:
        initialData = {};
        break;
    }
    
    newNode.data = initialData;
    addNode(newNode);
    
    return newNode;
  }, [addNode]);

  return { createNode };
}; 