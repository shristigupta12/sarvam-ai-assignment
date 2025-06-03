import React, { memo } from 'react';
import { Handle, Position } from 'reactflow';
import useFlowStore from '@/app/store/flowStore';

export interface CallTransferNodeData {
  phoneNumber: string;
}

interface CallTransferNodeProps {
  id: string;
  data: CallTransferNodeData;
}

const CallTransferNode = ({ id, data }: CallTransferNodeProps) => {
  const updateNodeData = useFlowStore((state) => state.updateNodeData);

  const handlePhoneNumberChange = (evt: React.ChangeEvent<HTMLInputElement>) => {
    updateNodeData(id, { phoneNumber: evt.target.value });
  };

  return (
    <div className="bg-purple-200 border border-purple-500 rounded-md p-4 shadow-md min-w-[200px]">
      <div className="text-sm font-semibold mb-2">Call Transfer Node</div>
      <label className="block text-xs font-medium text-gray-700 mb-1">Phone Number:</label>
      <input
        type="text"
        value={data.phoneNumber}
        onChange={handlePhoneNumberChange}
        className="nodrag w-full p-1 border rounded text-xs"
        placeholder="e.g., +1234567890"
      />

      <Handle type="target" position={Position.Top} className="!bg-purple-500" />
      <Handle type="source" position={Position.Bottom} className="!bg-purple-500" />
    </div>
  );
};

export default memo(CallTransferNode);