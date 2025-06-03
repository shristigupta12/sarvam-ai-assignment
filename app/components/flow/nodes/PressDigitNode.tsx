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
  const updateNodeData = useFlowStore((state) => state.updateNodeData);

  const handleInstructionsChange = (evt: React.ChangeEvent<HTMLInputElement>) => {
    updateNodeData(id, { instructions: evt.target.value });
  };

  const handleDelayChange = (evt: React.ChangeEvent<HTMLInputElement>) => {
    const delay = parseInt(evt.target.value, 10);
    updateNodeData(id, { pauseDetectionDelay: isNaN(delay) ? 0 : delay });
  };

  return (
    <div className="bg-yellow-200 border border-yellow-500 rounded-md p-4 shadow-md min-w-[200px]">
      <div className="text-sm font-semibold mb-2">Press Digit Node</div>
      <label className="block text-xs font-medium text-gray-700 mb-1">Instructions:</label>
      <input
        type="text"
        value={data.instructions}
        onChange={handleInstructionsChange}
        className="nodrag w-full p-1 border rounded text-xs mb-2"
        placeholder="e.g., Press 1 for Sales"
      />
      <label className="block text-xs font-medium text-gray-700 mb-1">Pause Delay (ms):</label>
      <input
        type="number"
        value={data.pauseDetectionDelay}
        onChange={handleDelayChange}
        className="nodrag w-full p-1 border rounded text-xs"
        placeholder="e.g., 2000"
      />

      <Handle type="target" position={Position.Top} className="!bg-yellow-500" />
      <Handle type="source" position={Position.Bottom} className="!bg-yellow-500" />
    </div>
  );
};

export default memo(PressDigitNode);