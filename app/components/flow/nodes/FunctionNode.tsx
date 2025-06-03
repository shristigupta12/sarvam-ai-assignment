import React, { memo } from 'react';
import { Handle, Position } from 'reactflow';

interface FunctionNodeData {
  functionName: string;
}

const FunctionNode = ({ data }: { data: FunctionNodeData }) => {
  return (
    <div className="bg-green-200 border border-green-500 rounded-md p-4 shadow-md min-w-[200px]">
      <div className="text-sm font-semibold mb-2">Function Node</div>
      <div className="text-xs text-gray-700">Function: {data.functionName || 'Select function...'}</div>

      <Handle type="target" position={Position.Top} className="!bg-green-500" />
      <Handle type="source" position={Position.Bottom} className="!bg-green-500" />
    </div>
  );
};

export default memo(FunctionNode);