import React, { memo } from 'react';
import { NodeProps, Handle, Position } from 'reactflow';
import { NodesWrapper } from './nodes-wrapper/nodes-wrapper';
import { useFlowStore } from '@/modules/stores/use-flow-store';
import { ConversationNodeData } from '@/modules/types/flow';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { TransitionConditions } from './transition-conditions/transition-conditions';
import { Textarea } from '@/components/ui/textarea';

const tabTriggerClass = "hover:cursor-pointer data-[state=active]:bg-neutral-50 data-[state=active]:border data-[state=active]:border-neutral-300 data-[state=active]:text-neutral-800 text-neutral-500 text-xs sm:text-sm px-2 sm:px-3 py-1 sm:py-2"

interface ConversationNodeProps extends NodeProps<ConversationNodeData> {}

const ConversationNode = ({ id, data }: ConversationNodeProps) => {

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
      <NodesWrapper nodeId={id} nodeType="conversationNode" title={data?.title || ''} handleTitleChange={handleTitleChange}>
        <div className='flex flex-col gap-2'>
          <Tabs value={data?.promptMode ? "prompt" : "static"} className="w-full" onValueChange={(value)=> updateNodeData(id, { promptMode: value === "prompt" })}>
            <TabsList className='w-full bg-white grid grid-cols-2 h-auto p-1'>
              <TabsTrigger value="prompt" className={tabTriggerClass}>Prompt</TabsTrigger>
              <TabsTrigger value="static" className={tabTriggerClass}>Static Sentence</TabsTrigger>
            </TabsList>
            <TabsContent value="prompt" className='w-full mt-2'>
              <Textarea 
                onChange={(value)=> updateNodeData(id, { prompt: value.target.value })} 
                value={data?.prompt || ""} 
                className='w-full h-20 sm:h-24 text-xs sm:text-sm focus-visible:ring-0 focus-visible:ring-offset-0 resize-none' 
                placeholder="Enter your prompt here..."
              />
            </TabsContent>
            <TabsContent value="static" className='mt-2'>
              <Textarea 
                onChange={(value)=> updateNodeData(id, { prompt: value.target.value })} 
                value={data?.prompt || ""} 
                className='w-full h-20 sm:h-24 text-xs sm:text-sm resize-none'
                placeholder="Enter static text here..."
              />
            </TabsContent>
          </Tabs>
          <TransitionConditions id={id} data={data} />
        </div>
      </NodesWrapper>
    </div>
  );
};

export default memo(ConversationNode);