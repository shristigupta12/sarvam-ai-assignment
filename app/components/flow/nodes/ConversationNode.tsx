import React, { memo } from 'react';
import { Handle, Position } from 'reactflow';
import useFlowStore from '@/app/store/flowStore';
export interface ConversationNodeData {
  prompt: string;
}

interface ConversationNodeProps {
  id: string;
  data: ConversationNodeData;
}

const ConversationNode = ({ id, data }: ConversationNodeProps) => {
  const updateNodeData = useFlowStore((state) => state.updateNodeData);

  const handlePromptChange = (evt: React.ChangeEvent<HTMLInputElement>) => {
    updateNodeData(id, { prompt: evt.target.value });
  }

  return (
    <div className="bg-blue-200 border border-blue-500 rounded-md p-4 shadow-md min-w-[200px]">
      <div className="text-sm font-semibold mb-2">Conversation Node</div>
      <label className="block text-xs font-medium text-gray-700 mb-1">Prompt:</label>
      <input
        type="text"
        value={data.prompt}
        onChange={handlePromptChange}
        className="nodrag w-full p-1 border rounded text-xs"
        placeholder="Enter conversation prompt"
      />

      
      <Handle type="target" position={Position.Top} className="!bg-blue-500" />
      <Handle type="source" position={Position.Bottom} className="!bg-blue-500" />
    </div>
  );
};

export default memo(ConversationNode);