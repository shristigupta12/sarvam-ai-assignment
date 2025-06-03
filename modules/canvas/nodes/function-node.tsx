import React, { memo } from 'react';
import { Handle, Position } from 'reactflow';
import useFlowStore from '@/modules/store/flowStore';
import { NodesWrapper } from './nodes-wrapper/nodes-wrapper';

interface FunctionNodeData {
  functionName: string;
}

interface FunctionNodeProps {
    id: string;
    data: FunctionNodeData;
}

const FunctionNode = ({ id, data }: FunctionNodeProps) => {
  
  return (
    <NodesWrapper nodeId={id} nodeType="functionNode" title="Function Node" handleTitleChange={() => {}}>
      <div className="text-sm font-semibold mb-2">Function Node</div>
      <div className="text-xs text-gray-700">Function: {data.functionName || 'No function name'}</div>

      <Handle type="target" position={Position.Top}  />
      <Handle type="source" position={Position.Bottom} />
    </NodesWrapper>
  );
};

export default memo(FunctionNode);