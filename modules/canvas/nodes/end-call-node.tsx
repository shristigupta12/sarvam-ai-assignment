import React, { memo } from 'react';
import { Handle, Position, NodeProps } from 'reactflow';
import { NodesWrapper } from './nodes-wrapper/nodes-wrapper';
import { useFlowStore } from '@/modules/stores/use-flow-store';
import { EndCallNodeData } from '@/modules/types/flow';


interface EndCallNodeProps extends NodeProps<EndCallNodeData> {}

const EndCallNode = ({ id, data }: EndCallNodeProps) => {

  const updateNodeData = useFlowStore((state) => state.updateNodeData);

  const handleTitleChange = (title: string) => {
    updateNodeData(id, { title });
  }

  return (
    <div className="relative">
      <Handle 
        type="target" 
        position={Position.Top} 
        style={{
          width: '12px',
          height: '12px',
          borderRadius: '50%',
          backgroundColor: 'transparent',
          border: '1px solid #6b7280',
          boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
        }}
      />
      <NodesWrapper nodeId={id} nodeType="endCallNode" title={data?.title || ''} handleTitleChange={handleTitleChange}>
        <div></div>
      </NodesWrapper>
    </div>
  );
};

export default memo(EndCallNode);