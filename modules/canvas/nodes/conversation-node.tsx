import React, { memo } from 'react';
import { Handle, Position, NodeProps } from 'reactflow';
import { NodesWrapper } from './nodes-wrapper/nodes-wrapper';
import useFlowStore from '@/modules/store/flow-store';

export interface ConversationNodeData {
  prompt: string;
  title: string;
}

interface ConversationNodeProps extends NodeProps<ConversationNodeData> {}

const ConversationNode = ({ id, data }: ConversationNodeProps) => {

  const updateNodeData = useFlowStore((state) => state.updateNodeData);

  const handleTitleChange = (title: string) => {
    updateNodeData(id, { title });
  }

  return (
    <NodesWrapper nodeId={id} nodeType="conversationNode" title={data?.title || 'Conversation'} handleTitleChange={handleTitleChange}>
    <div>
      <div className="text-xs text-gray-700">Prompt: {data?.prompt || 'No prompt set'}</div>
      <Handle type="target" position={Position.Top} />
      <Handle type="source" position={Position.Bottom} />
    </div>
    </NodesWrapper>
  );
};

export default memo(ConversationNode);