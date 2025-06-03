// components/flow/nodes/PressDigitNode.tsx
import React, { memo } from 'react';
import { Handle, Position } from 'reactflow';
import useFlowStore from '@/modules/store/flowStore';
import { NodesWrapper } from './nodes-wrapper/nodes-wrapper';

export interface PressDigitNodeData {
  instructions: string;
  pauseDetectionDelay: number; 
}

interface PressDigitNodeProps {
  id: string;
  data: PressDigitNodeData;
}

const PressDigitNode = ({ id, data }: PressDigitNodeProps) => {

  return (
    <NodesWrapper nodeId={id} nodeType="pressDigitNode" title="Press Digit Node" handleTitleChange={() => {}}>
        <div className="text-sm font-semibold mb-2">Press Digit Node</div>
        
        <div className="text-xs text-gray-700">Instructions: {data.instructions || 'No instructions'}</div>
        <div className="text-xs text-gray-700">Pause Delay: {data.pauseDetectionDelay || 0}ms</div>

        <Handle type="target" position={Position.Top} />
        <Handle type="source" position={Position.Bottom} />
    </NodesWrapper>
  );
};

export default memo(PressDigitNode);