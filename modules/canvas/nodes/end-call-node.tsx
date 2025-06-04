import React, { memo } from 'react';
import { Handle, Position, NodeProps } from 'reactflow';
import { NodesWrapper } from './nodes-wrapper/nodes-wrapper';
import useFlowStore from '@/modules/store/flow-store';
import { EndCallNodeData } from '@/modules/types/flow';


interface EndCallNodeProps extends NodeProps<EndCallNodeData> {}

const EndCallNode = ({ id, data }: EndCallNodeProps) => {

  const updateNodeData = useFlowStore((state) => state.updateNodeData);

  const handleTitleChange = (title: string) => {
    updateNodeData(id, { title });
  }

  return (
    <NodesWrapper nodeId={id} nodeType="endCallNode" title={data?.title || ''} handleTitleChange={handleTitleChange}>
      <Handle type="target" position={Position.Top} />
    </NodesWrapper>
  );
};

export default memo(EndCallNode);