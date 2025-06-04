import React, { memo } from 'react';
import { Handle, Position, NodeProps } from 'reactflow';
import { NodesWrapper } from '../nodes-wrapper/nodes-wrapper';
import useFlowStore from '@/modules/store/flow-store';
import { TransitionConditions } from '../transition-conditions/transition-conditions';
import { FunctionNodeData } from '@/modules/types/flow';
import { Input } from '@/components/ui/input';

interface FunctionNodeProps extends NodeProps<FunctionNodeData> {}

const FunctionNode = ({ id, data }: FunctionNodeProps) => {

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
      <NodesWrapper nodeId={id} nodeType="functionNode" title={data?.title || ''} handleTitleChange={handleTitleChange}>
        <div className="flex flex-col gap-2">
          <div>
            <label className="text-xs sm:text-sm text-gray-700 block mb-1 font-medium">Function Name:</label>
            <Input 
              onChange={(e) => updateNodeData(id, { functionName: e.target.value })} 
              value={data?.functionName || ""} 
              placeholder="e.g., check_calendar_availability"
              className="text-xs sm:text-sm h-8 sm:h-9"
            />
          </div>
          <TransitionConditions id={id} data={data} />
        </div>
      </NodesWrapper>
    </div>
  );
};

export default memo(FunctionNode);