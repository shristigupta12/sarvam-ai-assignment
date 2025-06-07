import React, { memo } from 'react';
import { Handle, Position, NodeProps } from 'reactflow';
import { NodesWrapper } from './nodes-wrapper/nodes-wrapper';
import { useFlowStore } from '@/modules/stores/use-flow-store';
import { CallTransferNodeData } from '@/modules/types/flow';
import { TransitionConditions } from './transition-conditions/transition-conditions'; 
import { Input } from '@/components/ui/input';

interface CallTransferNodeProps extends NodeProps<CallTransferNodeData> {}

const CallTransferNode = ({ id, data }: CallTransferNodeProps) => {
  
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
      <NodesWrapper nodeId={id} nodeType="callTransferNode" title={data?.title || ''} handleTitleChange={handleTitleChange}>
        <div className="flex flex-col gap-2">
          <div>
            <label className="text-xs sm:text-sm text-gray-700 block mb-1 font-medium">Phone Number:</label>
            <Input 
              onChange={(e) => updateNodeData(id, { phoneNumber: e.target.value })} 
              value={data?.phoneNumber || ""} 
              placeholder="e.g., +1234567890"
              className="text-xs sm:text-sm h-8 sm:h-9"
            />
          </div>
          <TransitionConditions id={id} data={data} />
        </div>
      </NodesWrapper>
    </div>
  );
};

export default memo(CallTransferNode);