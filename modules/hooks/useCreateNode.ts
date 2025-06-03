import { useCallback } from 'react';
import { Node as FlowNode } from 'reactflow';
import useFlowStore from '@/modules/store/flow-store';
import { generateUniqueNodeId } from '@/modules/utility/helper';
import { NodeType } from '../interfaces/main';

export const useCreateNode = () => {
  const { addNode } = useFlowStore();

  const createNode = useCallback((type: NodeType, position: { x: number; y: number } = { x: 50, y: 50 }) => {
    
    const newNode: FlowNode = {
      id: generateUniqueNodeId(),
      type,
      position,
      data: {},
    };

    let initialData: any = {};
    
    switch (type) {
      case 'conversationNode':
        initialData = { prompt: 'New conversation', title: "Conversation" };
        break;
      case 'functionNode':
        initialData = { functionName: 'newFunction', title: "Function" };
        break;
      case 'callTransferNode':
        initialData = { phoneNumber: '+1XXXXXXXXXX', title: "Call Transfer" };
        break;
      case 'pressDigitNode':
        initialData = { instructions: 'Press...', pauseDetectionDelay: 1000, title: "Press Digit" };
        break;
      case 'endCallNode':
        initialData = { title: "End Call" };
        break;
      default:
        break;
    }
    
    newNode.data = initialData;
    addNode(newNode);
    
    return newNode;
  }, [addNode]);

  return { createNode };
}; 