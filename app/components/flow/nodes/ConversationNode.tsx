import React, { memo } from 'react';
import { Handle, Position } from 'reactflow';

interface ConversationNodeData {
  prompt: string;
}

const ConversationNode = ({ data }: { data: ConversationNodeData }) => {
  return (
    <div className="bg-blue-200 border border-blue-500 rounded-md p-4 shadow-md min-w-[200px]">
      <div className="text-sm font-semibold mb-2">Conversation Node</div>
      <div className="text-xs text-gray-700">Prompt: {data.prompt || 'Enter prompt...'}</div>

      <Handle type="target" position={Position.Top} className="!bg-blue-500" />
      <Handle type="source" position={Position.Bottom} className="!bg-blue-500" />
    </div>
  );
};

export default memo(ConversationNode);