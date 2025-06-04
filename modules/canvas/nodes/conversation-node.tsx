import React, { memo } from 'react';
import {  NodeProps } from 'reactflow';
import { NodesWrapper } from './nodes-wrapper/nodes-wrapper';
import useFlowStore from '@/modules/store/flow-store';
import { ConversationNodeData } from '@/modules/types/flow';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { TransitionConditions } from './transition-conditions/transition-conditions';
import { Textarea } from '@/components/ui/textarea';

const tabTriggerClass = "hover:cursor-pointer data-[state=active]:bg-neutral-50 data-[state=active]:border data-[state=active]:border-neutral-300 data-[state=active]:text-neutral-800 text-neutral-500 text-sm"

interface ConversationNodeProps extends NodeProps<ConversationNodeData> {}

const ConversationNode = ({ id, data }: ConversationNodeProps) => {

  const updateNodeData = useFlowStore((state) => state.updateNodeData);

  const handleTitleChange = (title: string) => {
    updateNodeData(id, { title });
  }

  return (
    <NodesWrapper nodeId={id} nodeType="conversationNode" title={data?.title || 'Conversation'} handleTitleChange={handleTitleChange}>
    <div className='flex flex-col'>
      <Tabs defaultValue="prompt" className="w-full " onValueChange={(prompt)=> updateNodeData(id, { promptMode: prompt === "prompt " ? true : false })}>
        <TabsList className='w-full bg-white'>
          <TabsTrigger value="prompt" className={tabTriggerClass}>Prompt</TabsTrigger>
          <TabsTrigger value="static" className={tabTriggerClass}>Static Sentence</TabsTrigger>
        </TabsList>
        <TabsContent value="prompt" className='w-full '><Textarea onChange={(value)=> updateNodeData(id, { prompt: value.target.value })} value={data?.prompt || ""} className='w-full h-full focus-visible:ring-0 focus-visible:ring-offset-0 '/></TabsContent>
        <TabsContent value="static"><Textarea onChange={(value)=> updateNodeData(id, { prompt: value.target.value })} value={data?.prompt || ""} /></TabsContent>
      </Tabs>
      <TransitionConditions id={id} data={data} />
    </div>
    </NodesWrapper>
  );
};

export default memo(ConversationNode);