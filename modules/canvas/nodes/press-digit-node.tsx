// components/flow/nodes/PressDigitNode.tsx
import React, { memo } from 'react';
import { Handle, Position, NodeProps } from 'reactflow';
import useFlowStore from '@/modules/store/flow-store';
import { NodesWrapper } from './nodes-wrapper/nodes-wrapper';
import { TransitionConditions } from './transition-conditions/transition-conditions';
import { PressDigitNodeData } from '@/modules/types/flow';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';

interface PressDigitNodeProps extends NodeProps<PressDigitNodeData> {}

const PressDigitNode = ({ id, data }: PressDigitNodeProps) => {

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
      <NodesWrapper nodeId={id} nodeType="pressDigitNode" title={data?.title || ''} handleTitleChange={handleTitleChange}>
        <div className="flex flex-col gap-2">
          <div>
            <label className="text-xs sm:text-sm text-gray-700 block mb-1 font-medium">Instructions:</label>
            <Textarea 
              onChange={(e) => updateNodeData(id, { instructions: e.target.value })} 
              value={data?.instructions || ""} 
              placeholder="e.g., Press 1 for Sales, 2 for Support"
              className="text-xs sm:text-sm min-h-[60px] sm:min-h-[70px] resize-none"
            />
          </div>
          <div>
            <label className="text-xs sm:text-sm text-gray-700 block mb-1 font-medium">Pause Delay (ms):</label>
            <Input 
              type="number"
              onChange={(e) => updateNodeData(id, { pauseDetectionDelay: parseInt(e.target.value) || 0 })} 
              value={data?.pauseDetectionDelay || 0} 
              placeholder="e.g., 2000"
              className="text-xs sm:text-sm h-8 sm:h-9"
            />
          </div>
          <TransitionConditions id={id} data={data} />
        </div>
      </NodesWrapper>
    </div>
  );
};

export default memo(PressDigitNode);