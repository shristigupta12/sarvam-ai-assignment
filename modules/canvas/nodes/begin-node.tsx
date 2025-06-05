import React, { memo } from 'react';
import { Handle, Position, NodeProps } from 'reactflow';
import { NodesWrapper } from './nodes-wrapper/nodes-wrapper';
import { BeginNodeData } from '@/modules/types/flow';
import useFlowStore from '@/modules/store/flow-store';

interface BeginNodeProps extends NodeProps<BeginNodeData> {}

const BeginNode: React.FC<BeginNodeProps> = ({ id, data, selected }) => {
  const updateNodeData = useFlowStore((state) => state.updateNodeData);

  const handleTitleChange = (newTitle: string) => {
    updateNodeData(id, { ...data, title: newTitle });
  };

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
          backgroundColor: '#fff', 
          border: '1px solid #6b7280', 
          right: '-6px' 
        }}
      />
    </NodesWrapper>
  );
};

export default memo(BeginNode); 