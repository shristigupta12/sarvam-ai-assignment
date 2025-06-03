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
  
  return (
    <div className="bg-green-200 border border-green-500 rounded-md p-4 shadow-md min-w-[200px]">
      <div className="text-sm font-semibold mb-2">Function Node</div>
      <div className="text-xs text-gray-700">Function: {data.functionName || 'No function name'}</div>

      <Handle type="target" position={Position.Top} className="!bg-green-500" />
      <Handle type="source" position={Position.Bottom} className="!bg-green-500" />
    </div>
  );
};

export default memo(FunctionNode);