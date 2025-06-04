import React, { memo } from 'react';
import { Handle, Position, NodeProps } from 'reactflow';
import { NodesWrapper } from './nodes-wrapper/nodes-wrapper';
import useFlowStore from '@/modules/store/flow-store';
import { CallTransferNodeData } from '@/modules/types/flow';


interface CallTransferNodeProps extends NodeProps<CallTransferNodeData> {}

const CallTransferNode = ({ id, data }: CallTransferNodeProps) => {
  
  const updateNodeData = useFlowStore((state) => state.updateNodeData);

  const handleTitleChange = (title: string) => {
    updateNodeData(id, { title });
  }

  return (
    <NodesWrapper nodeId={id} nodeType="callTransferNode" title={data?.title || 'Call Transfer'} handleTitleChange={handleTitleChange}>
      <div className="text-xs text-gray-700">Phone: {data?.phoneNumber || 'No phone number set'}</div>

      <Handle type="target" position={Position.Top}  />
      <Handle type="source" position={Position.Bottom}  />
    </NodesWrapper>
  );
};

export default memo(CallTransferNode);