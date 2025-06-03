import React, { memo } from 'react';
import { Handle, Position } from 'reactflow';
import { NodesWrapper } from './nodes-wrapper/nodes-wrapper';

export interface ConversationNodeData {
  prompt: string;
}

interface ConversationNodeProps {
  id: string;
  data: ConversationNodeData;
}

const ConversationNode = ({ id, data }: ConversationNodeProps) => {

  return (
    <NodesWrapper nodeId={id} nodeType="conversationNode" title="Conversation Node" handleTitleChange={() => {}}>
    <div>
      <div className="text-sm font-semibold mb-2">Conversation Node</div>
      <div className="text-xs text-gray-700">Prompt: {data.prompt || 'No prompt set'}</div>
      <Handle type="target" position={Position.Top} />
      <Handle type="source" position={Position.Bottom} />
    </div>
    </NodesWrapper>
  );
};

export default memo(ConversationNode);