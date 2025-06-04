import React, { memo } from 'react';
import { Handle, Position, NodeProps } from 'reactflow';
import { NodesWrapper } from '../nodes-wrapper/nodes-wrapper';
import useFlowStore from '@/modules/store/flow-store';
import { TransitionConditions } from '../transition-conditions/transition-conditions';
import { FunctionNodeData } from '@/modules/types/flow';

interface FunctionNodeProps extends NodeProps<FunctionNodeData> {}

const FunctionNode = ({ id, data }: FunctionNodeProps) => {

  const updateNodeData = useFlowStore((state) => state.updateNodeData);

  const handleTitleChange = (title: string) => {
    updateNodeData(id, { title });
  }
  
  return (
    <NodesWrapper nodeId={id} nodeType="functionNode" title={data?.title || 'Function'} handleTitleChange={handleTitleChange}>
      <div className="text-xs text-gray-700">Function: {data?.functionName || 'No function name'}</div>
      <TransitionConditions id={id} data={data} />

      <Handle type="target" position={Position.Top}  />
      <Handle type="source" position={Position.Bottom} />
    </NodesWrapper>
  );
};

export default memo(FunctionNode);