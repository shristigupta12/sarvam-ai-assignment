import React, { memo } from 'react';
import { Handle, Position } from 'reactflow';
import useFlowStore from '@/modules/store/flowStore';
import { NodesWrapper } from './nodes-wrapper/nodes-wrapper';

export interface CallTransferNodeData {
  phoneNumber: string;
}

interface CallTransferNodeProps {
  id: string;
  data: CallTransferNodeData;
}

const CallTransferNode = ({ id, data }: CallTransferNodeProps) => {

  return (
    <NodesWrapper nodeId={id} nodeType="callTransferNode" title="Call Transfer Node" handleTitleChange={() => {}}>
      <div className="text-sm font-semibold mb-2">Call Transfer Node</div>
      <div className="text-xs text-gray-700">Phone: {data.phoneNumber || 'No phone number set'}</div>

      <Handle type="target" position={Position.Top}  />
      <Handle type="source" position={Position.Bottom}  />
    </NodesWrapper>
  );
};

export default memo(CallTransferNode);