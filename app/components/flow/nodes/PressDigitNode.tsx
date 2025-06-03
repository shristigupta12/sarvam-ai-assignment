import React, { memo } from 'react';
import { Handle, Position } from 'reactflow';

interface PressDigitNodeData {
  instructions: string;
  pauseDetectionDelay: number; 
}

const PressDigitNode = ({ data }: { data: PressDigitNodeData }) => {
  return (
    <div className="bg-yellow-200 border border-yellow-500 rounded-md p-4 shadow-md min-w-[200px]">
      <div className="text-sm font-semibold mb-2">Press Digit Node</div>
      <div className="text-xs text-gray-700">Instructions: {data.instructions || 'Enter instructions...'}</div>
      <div className="text-xs text-gray-700">Pause Delay: {data.pauseDetectionDelay || 0}ms</div>

      <Handle type="target" position={Position.Top} className="!bg-yellow-500" />
      <Handle type="source" position={Position.Bottom} className="!bg-yellow-500" />
    </div>
  );
};

export default memo(PressDigitNode);