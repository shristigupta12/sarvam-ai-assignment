import React, { memo } from 'react';
import { Handle, Position } from 'reactflow';
import useFlowStore from '@/app/store/flowStore';

interface FunctionNodeData {
  functionName: string;
}

interface FunctionNodeProps {
    id: string;
    data: FunctionNodeData;
}

const FunctionNode = ({ id, data }: FunctionNodeProps) => {
  const updateNodeData = useFlowStore((state) => state.updateNodeData);

  const handleFunctionNameChange = (evt: React.ChangeEvent<HTMLInputElement>) => {
    updateNodeData(id, { functionName: evt.target.value });
  }

  return (
    <div className="bg-green-200 border border-green-500 rounded-md p-4 shadow-md min-w-[200px]">
      <div className="text-sm font-semibold mb-2">Function Node</div>
      <label className="block text-xs font-medium text-gray-700 mb-1">Function:</label>
      <input
        type="text"
        value={data.functionName}
        onChange={handleFunctionNameChange}
        className="nodrag w-full p-1 border rounded text-xs"
        placeholder="e.g., processPayment"
      />

      <Handle type="target" position={Position.Top} className="!bg-green-500" />
      <Handle type="source" position={Position.Bottom} className="!bg-green-500" />
    </div>
  );
};

export default memo(FunctionNode);