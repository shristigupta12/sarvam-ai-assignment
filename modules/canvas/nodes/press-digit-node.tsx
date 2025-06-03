// components/flow/nodes/PressDigitNode.tsx
import React, { memo } from 'react';
import { Handle, Position, NodeProps } from 'reactflow';
import useFlowStore from '@/modules/store/flow-store';
import { NodesWrapper } from './nodes-wrapper/nodes-wrapper';

export interface PressDigitNodeData {
  instructions: string;
  pauseDetectionDelay: number; 
  title: string;
}

interface PressDigitNodeProps extends NodeProps<PressDigitNodeData> {}

const PressDigitNode = ({ id, data }: PressDigitNodeProps) => {

  const updateNodeData = useFlowStore((state) => state.updateNodeData);

  const handleTitleChange = (title: string) => {
    updateNodeData(id, { title });
  }

  return (
    <NodesWrapper nodeId={id} nodeType="pressDigitNode" title={data?.title || 'Press Digit'} handleTitleChange={handleTitleChange}>
        
        <div className="text-xs text-gray-700">Instructions: {data?.instructions || 'No instructions'}</div>
        <div className="text-xs text-gray-700">Pause Delay: {data?.pauseDetectionDelay || 0}ms</div>

        <Handle type="target" position={Position.Top} />
        <Handle type="source" position={Position.Bottom} />
    </NodesWrapper>
  );
};

export default memo(PressDigitNode);