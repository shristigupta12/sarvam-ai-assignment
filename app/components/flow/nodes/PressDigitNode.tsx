// components/flow/nodes/PressDigitNode.tsx
import React, { memo } from 'react';
import { Handle, Position } from 'reactflow';
import useFlowStore from '@/app/store/flowStore';

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
    <div className="bg-yellow-200 border border-yellow-500 rounded-md p-4 shadow-md min-w-[200px]">
        <div className="text-sm font-semibold mb-2">Press Digit Node</div>
        
        <div className="text-xs text-gray-700">Instructions: {data.instructions || 'No instructions'}</div>
        <div className="text-xs text-gray-700">Pause Delay: {data.pauseDetectionDelay || 0}ms</div>

        <Handle type="target" position={Position.Top} className="!bg-yellow-500" />
        <Handle type="source" position={Position.Bottom} className="!bg-yellow-500" />
  </div>
  );
};

export default memo(PressDigitNode);