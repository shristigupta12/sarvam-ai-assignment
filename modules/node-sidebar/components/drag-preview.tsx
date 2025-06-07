import React from 'react';
import {
  CallTransferNode,
  ConversationNode,
  EndCallNode,
  FunctionNode,
  PressDigitNode,
} from '@/modules/canvas/nodes';
import { NodeType } from '@/modules/interfaces/main';

const nodeComponentMap: Record<NodeType, React.FC<any>> = {
  conversationNode: ConversationNode,
  functionNode: FunctionNode,
  callTransferNode: CallTransferNode,
  pressDigitNode: PressDigitNode,
  endCallNode: EndCallNode,
  beginNode: () => null, 
};

const nodeDataMap: Record<NodeType, any> = {
  conversationNode: { data: { title: 'Conversation' } },
  functionNode: { data: { title: 'Function' } },
  callTransferNode: { data: { title: 'Call Transfer' } },
  pressDigitNode: { data: { title: 'Press Digit' } },
  endCallNode: { data: { title: 'End Call' } },
  beginNode: {},
};

export const DragPreview: React.FC = () => {
  return (
    <div style={{ position: 'absolute', top: -1000, left: -1000 }}>
      {Object.entries(nodeComponentMap).map(([nodeType, NodeComponent]) => {
        if (nodeType === 'beginNode') return null;

        const props = nodeDataMap[nodeType as NodeType];

        return (
          <div key={nodeType} id={`drag-preview-${nodeType}`}>
            <NodeComponent {...props} />
          </div>
        );
      })}
    </div>
  );
}; 