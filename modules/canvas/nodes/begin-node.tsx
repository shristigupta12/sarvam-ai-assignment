import React, { memo } from 'react';
import { Handle, Position, NodeProps } from 'reactflow';
import { NodesWrapper } from './nodes-wrapper/nodes-wrapper';
import { BeginNodeData } from '@/modules/types/flow';
import useFlowStore from '@/modules/store/flow-store';

interface BeginNodeProps extends NodeProps<BeginNodeData> {}

const BeginNode: React.FC<BeginNodeProps> = ({ id, data }) => {

  const updateNodeData = useFlowStore((state) => state.updateNodeData);

  const handleTitleChange = (title: string) => {
    updateNodeData(id, { title });
  }

  return (
    <NodesWrapper
      nodeId={id}
      nodeType="beginNode"
      title={data.title}
      handleTitleChange={handleTitleChange}
    >
      <Handle
        type="source"
        position={Position.Right}
        id="source"
        style={{ 
          width: '12px', 
          height: '12px', 
          borderRadius: '50%', 
          backgroundColor: 'transparent', 
          border: '1px solid #6b7280', 
          boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
        }}
      />
    </NodesWrapper>
  );
};

export default memo(BeginNode); 