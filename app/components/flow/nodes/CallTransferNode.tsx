import React, { memo } from 'react';
import { Handle, Position } from 'reactflow';

interface CallTransferNodeData {
  phoneNumber: string;
}

const CallTransferNode = ({ data }: { data: CallTransferNodeData }) => {
  return (
    <div className="bg-purple-200 border border-purple-500 rounded-md p-4 shadow-md min-w-[200px]">
      <div className="text-sm font-semibold mb-2">Call Transfer Node</div>
      <div className="text-xs text-gray-700">Transfer To: {data.phoneNumber || 'Enter phone number...'}</div>

      <Handle type="target" position={Position.Top} className="!bg-purple-500" />
      <Handle type="source" position={Position.Bottom} className="!bg-purple-500" />
    </div>
  );
};

export default memo(CallTransferNode);