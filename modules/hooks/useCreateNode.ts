import { useCallback } from 'react';
import { Node as FlowNode } from 'reactflow';
import { useFlowEditor } from '@/modules/stores/use-flow-editor-store';
import { generateUniqueNodeId } from '@/modules/utility/helper';
import { NodeType } from '../interfaces/main';
import { CallTransferNodeData, ConversationNodeData, CustomNodeData, EndCallNodeData, FunctionNodeData, PressDigitNodeData } from '../types/flow';

export const useCreateNode = () => {
  const { addNode } = useFlowEditor();

  const createNode = useCallback((type: NodeType, position: { x: number; y: number } = { x: 50, y: 50 }) => {
    
    const newNode: FlowNode<CustomNodeData> = {
      id: generateUniqueNodeId(),
      type,
      position,
      data: {title: "", transitions: []},
    };

    let initialData: CustomNodeData = {title: "", transitions: []};
    
    switch (type) {
      case 'conversationNode':
        initialData = { prompt: 'New conversation', title: "Conversation", promptMode: true, transitions: [
          {type: "PROMPT", content: "Describe the transition condition"}
        ] } as ConversationNodeData;
        break;
      case 'functionNode':
        initialData = { functionName: 'newFunction', title: "Function", transitions: [] } as FunctionNodeData;
        break;
      case 'callTransferNode':
        initialData = { phoneNumber: '+1XXXXXXXXXX', title: "Call Transfer", transitions: [] } as CallTransferNodeData;
        break;
      case 'pressDigitNode':
        initialData = { instructions: 'Press...', pauseDetectionDelay: 1000, title: "Press Digit", transitions: [] } as PressDigitNodeData;
        break;
      case 'endCallNode':
        initialData = { title: "End Call", transitions: [] } as EndCallNodeData;
        break;
      default:
        initialData = {title: "", transitions: []};
        break;
    }
    
    newNode.data = initialData;
    addNode(newNode);
    
    return newNode;
  }, [addNode]);

  return { createNode };
}; 