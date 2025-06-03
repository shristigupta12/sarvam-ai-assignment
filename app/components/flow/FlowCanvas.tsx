'use client'; 

import React from 'react';
import ReactFlow, { ReactFlowProvider, Background, Controls } from 'reactflow';
import 'reactflow/dist/style.css'; 
import useFlowStore from '@/app/store/flowStore';
import { CallTransferNode, ConversationNode, EndCallNode, FunctionNode, PressDigitNode } from './nodes';

const nodeTypes = {
    conversationNode: ConversationNode,
    functionNode: FunctionNode,
    callTransferNode: CallTransferNode,
    pressDigitNode: PressDigitNode,
    endCallNode: EndCallNode,
};

const FlowCanvas = () => {
  const { nodes, edges, onNodesChange, onEdgesChange, onConnect } = useFlowStore();


  return (
    <div style={{ width: '100%', height: '100vh', flexGrow: 1 }}>
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        nodeTypes={nodeTypes}
        fitView
      >
        <Background />
        <Controls />
      </ReactFlow>
    </div>
  );
};

const FlowCanvasWrapper = () => (
  <ReactFlowProvider>
    <FlowCanvas />
  </ReactFlowProvider>
);

export default FlowCanvasWrapper;