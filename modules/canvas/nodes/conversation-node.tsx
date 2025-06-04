import React, { memo } from 'react';
import {  NodeProps } from 'reactflow';
import { NodesWrapper } from './nodes-wrapper/nodes-wrapper';
import useFlowStore from '@/modules/store/flow-store';
import { ConversationNodeData } from '@/modules/types/flow';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Separator } from '@radix-ui/react-separator';
import { TransitionConditions } from './transition-conditions/transition-conditions';


interface ConversationNodeProps extends NodeProps<ConversationNodeData> {}

const ConversationNode = ({ id, data }: ConversationNodeProps) => {

  const updateNodeData = useFlowStore((state) => state.updateNodeData);

  const handleTitleChange = (title: string) => {
    updateNodeData(id, { title });
  }

  return (
    <NodesWrapper nodeId={id} nodeType="conversationNode" title={data?.title || 'Conversation'} handleTitleChange={handleTitleChange}>
    <div>
      <Tabs defaultValue="prompt" className="w-[400px]" onValueChange={(prompt)=> updateNodeData(id, { promptMode: prompt === "prompt" ? true : false })}>
        <TabsList>
          <TabsTrigger value="prompt">Prompt</TabsTrigger>
          <TabsTrigger value="static">Static Sentence</TabsTrigger>
        </TabsList>
        <TabsContent value="prompt"><textarea onChange={(value)=> updateNodeData(id, { prompt: value.target.value })} value={data?.prompt || ""} /></TabsContent>
        <TabsContent value="static"><textarea onChange={(value)=> updateNodeData(id, { prompt: value.target.value })} value={data?.prompt || ""} /></TabsContent>
      </Tabs>
    <Separator />
    <TransitionConditions id={id} data={data} />
    </div>
    </NodesWrapper>
  );
};

export default memo(ConversationNode);