'use client'; 

import React, { useCallback, useRef } from 'react';
import ReactFlow, { ReactFlowProvider, Background, Controls, useReactFlow, Node as FlowNode, Edge, OnSelectionChangeFunc, DefaultEdgeOptions } from 'reactflow';
import 'reactflow/dist/style.css'; 
import useFlowStore, { CustomEdgeData } from '@/modules/store/flowStore';
import { CallTransferNode, ConversationNode, EndCallNode, FunctionNode, PressDigitNode } from './canvas/nodes';
import NodeSidebar from './node-sidebar/node-sidebar';
import { generateUniqueNodeId } from '@/modules/utility/helper';
import CustomEdge from './canvas/edges/custom-edge';
import NodeSettingsPanel from './node-settings-panel/NodeSettingsPanel';
import { SidebarProvider } from './providers/sidebar-provider';


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
  const { nodes, edges, onNodesChange, onEdgesChange, onConnect, onEdgesDelete, addNode, onSelectionChange} = useFlowStore();

  const onDragOver = useCallback((event: React.DragEvent)=>{
    event?.preventDefault();
    event.dataTransfer.dropEffect = 'move';
  }, [])

  const onDrop = useCallback(
    (event: React.DragEvent) => {
        event.preventDefault();

        if(reactFlowWrapper.current){
            const reactFlowBounds = reactFlowWrapper.current.getBoundingClientRect();
            const type = event.dataTransfer.getData('application/reactflow') as string;

            if(typeof type === 'undefined' || !type){
                return;
            }

            const position = screenToFlowPosition({
                x: event.clientX - reactFlowBounds.left,
                y: event.clientY - reactFlowBounds.top,
            })

            let initialData: any = {};

            switch (type) {
                case 'conversationNode':
                  initialData = { prompt: 'New conversation prompt' };
                  break;
                case 'functionNode':
                  initialData = { functionName: 'newFunction' };
                  break;
                case 'callTransferNode':
                  initialData = { phoneNumber: '+1XXXXXXXXXX' };
                  break;
                case 'pressDigitNode':
                  initialData = { instructions: 'Press...', pauseDetectionDelay: 1000 };
                  break;
                case 'endCallNode':
                  initialData = {};
                  break;
                default:
                  break;
              }

              const newNode: FlowNode = {
                id: generateUniqueNodeId(),
                type,
                position,
                data: initialData,
              };

              addNode(newNode);
        }
    }, [screenToFlowPosition, addNode]
  )


  return (
    <div className="flex h-screen">
      <NodeSidebar />

      <div className="flex-grow h-full bg-primary-50" ref={reactFlowWrapper}>
        <ReactFlow
          nodes={nodes}
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