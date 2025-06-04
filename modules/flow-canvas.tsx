'use client'; 

import React, { useCallback, useEffect, useRef } from 'react';
import ReactFlow, { ReactFlowProvider, Background, Controls, useReactFlow, Node as FlowNode, Edge, DefaultEdgeOptions } from 'reactflow';
import 'reactflow/dist/style.css'; 
import useFlowStore from '@/modules/store/flow-store';
import { CallTransferNode, ConversationNode, EndCallNode, FunctionNode, PressDigitNode } from './canvas/nodes';
import NodeSidebar from './node-sidebar/node-sidebar';
import CustomEdge from './canvas/edges/custom-edge';
import NodeSettingsPanel from './node-settings-panel/NodeSettingsPanel';
import { SidebarProvider } from './providers/sidebar-provider';
import { useCreateNode } from './hooks/useCreateNode';
import { NodeType } from './interfaces/main';
import { CustomEdgeData, CustomNodeData } from './types/flow';


const nodeTypes = {
    conversationNode: ConversationNode,
    functionNode: FunctionNode,
    callTransferNode: CallTransferNode,
    pressDigitNode: PressDigitNode,
    endCallNode: EndCallNode,
};

const edgeTypes = {
    customEdge: CustomEdge
};

const defaultEdgeOptions: DefaultEdgeOptions = {
    type: 'customEdge'
}


const FlowCanvas = () => {
  const reactFlowWrapper = useRef<HTMLDivElement>(null);
  const { screenToFlowPosition } = useReactFlow();
  const { nodes, edges, onNodesChange, onEdgesChange, onConnect, onEdgesDelete, addNode, onSelectionChange, selectedElements} = useFlowStore();
  const { createNode } = useCreateNode();

  const onDragOver = useCallback((event: React.DragEvent)=>{
    event?.preventDefault();
    event.dataTransfer.dropEffect = 'move';
  }, [])

  const onDrop = useCallback(
    (event: React.DragEvent) => {
        event.preventDefault();

        if(reactFlowWrapper.current){
            const reactFlowBounds = reactFlowWrapper.current.getBoundingClientRect();
            const type = event.dataTransfer.getData('application/reactflow') as NodeType;

            if(typeof type === 'undefined' || !type){
                return;
            }

            const position = screenToFlowPosition({
                x: event.clientX - reactFlowBounds.left,
                y: event.clientY - reactFlowBounds.top,
            })

            createNode(type, position);
        }
    }, [screenToFlowPosition, addNode]
  )


  return (
    <div className="flex h-screen">
      <NodeSidebar />

      <div className="flex-grow h-full bg-neutral-50" ref={reactFlowWrapper}>
        <ReactFlow
          nodes={nodes as FlowNode<CustomNodeData>[]}
          edges={edges as Edge<CustomEdgeData>[]} 
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          onConnect={onConnect}
          onEdgesDelete={onEdgesDelete}
          onSelectionChange={onSelectionChange} 
          nodeTypes={nodeTypes}
          edgeTypes={edgeTypes}  
          defaultEdgeOptions={defaultEdgeOptions} 
          fitView
          onDrop={onDrop}
          onDragOver={onDragOver}
        >
          <Background />
          <Controls />
        </ReactFlow>
      </div>
      <NodeSettingsPanel />
    </div>
  );
};

const FlowCanvasWrapper = () => (
  <SidebarProvider>
    <ReactFlowProvider>
      <FlowCanvas />
    </ReactFlowProvider>
  </SidebarProvider>
);

export default FlowCanvasWrapper;