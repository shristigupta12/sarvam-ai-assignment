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
      <NodesWrapper nodeId={id} nodeType="pressDigitNode" title={data?.title || 'Press Digit'} handleTitleChange={handleTitleChange}>
          <div className="mb-2">
            <label className="text-xs text-gray-700 block mb-1">Instructions:</label>
            <Textarea 
              onChange={(e) => updateNodeData(id, { instructions: e.target.value })} 
              value={data?.instructions || ""} 
              placeholder="Enter instructions"
              className="text-xs min-h-[60px]"
            />
          </div>
          <div className="mb-2">
            <label className="text-xs text-gray-700 block mb-1">Pause Delay (ms):</label>
            <Input 
              type="number"
              onChange={(e) => updateNodeData(id, { pauseDetectionDelay: parseInt(e.target.value) || 0 })} 
              value={data?.pauseDetectionDelay || 0} 
              placeholder="0"
              className="text-xs"
            />
          </div>
          <TransitionConditions id={id} data={data} />
      </NodesWrapper>
    </div>
  );
};

export default memo(PressDigitNode);