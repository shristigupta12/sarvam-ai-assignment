'use client'; 

import React, { useCallback, useRef } from 'react';
import ReactFlow, { ReactFlowProvider, Background, Controls, useReactFlow, Node as FlowNode, Edge, OnSelectionChangeFunc, DefaultEdgeOptions } from 'reactflow';
import 'reactflow/dist/style.css'; 
import useFlowStore, { CustomEdgeData } from '@/app/store/flowStore';
import { CallTransferNode, ConversationNode, EndCallNode, FunctionNode, PressDigitNode } from './nodes';
import NodeSidebar from './NodeSidebar';
import { generateUniqueId } from '@/app/utility/helper';
import CustomEdge from './CustomEdge';
import NodeSettingsPanel from './NodeSettingsPanel';


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
  const { nodes, edges, onNodesChange, onEdgesChange, onConnect, onEdgesDelete,  addNode, onSelectionChange} = useFlowStore();

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
                id: generateUniqueId(),
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
      <NodeSidebar onAddNode={(type, pos) => {
        const newNode: FlowNode = {
            id: generateUniqueId(),
            type,
            position: { x: 50, y: 50 },
            data: {},
        };
        let initialData: any = {};
        switch (type) {
            case 'conversationNode': initialData = { prompt: 'New conversation' }; break;
            case 'functionNode': initialData = { functionName: 'newFunction' }; break;
            case 'callTransferNode': initialData = { phoneNumber: '+1XXXXXXXXXX' }; break;
            case 'pressDigitNode': initialData = { instructions: 'Press...', pauseDetectionDelay: 1000 }; break;
            case 'endCallNode': initialData = {}; break;
            default: break;
        }
        newNode.data = initialData;
        addNode(newNode);
      }} />

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
  <ReactFlowProvider>
    <FlowCanvas />
  </ReactFlowProvider>
);

export default FlowCanvasWrapper;