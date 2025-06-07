'use client';

import React, { useCallback, useRef } from 'react';
import ReactFlow, { ReactFlowProvider, Background, Controls, useReactFlow, Node as FlowNode, Edge, DefaultEdgeOptions, ConnectionLineType } from 'reactflow';
import 'reactflow/dist/style.css';

import { useFlowStore } from '@/modules/stores/use-flow-store';
import { useFlowEditor } from '@/modules/stores/use-flow-editor-store';
import { useUIStore } from '@/modules/stores/use-ui-store';

import { CallTransferNode, ConversationNode, EndCallNode, FunctionNode, PressDigitNode } from './canvas/nodes';
import BeginNode from './canvas/nodes/begin-node';
import NodeSidebar from './node-sidebar/node-sidebar';
import CustomEdge from './canvas/edges/custom-edge';
import NodeSettingsPanel from './node-settings-panel/node-settings-panel';
import { SidebarProvider } from './providers/sidebar-provider';
import { useCreateNode } from './hooks/useCreateNode';
import { NodeType } from './interfaces/main';
import { CustomEdgeData, CustomNodeData } from './types/flow';
import FunctionNodeModal from './canvas/nodes/function-node/function-node-modal';

const nodeTypes = {
    conversationNode: ConversationNode,
    functionNode: FunctionNode,
    callTransferNode: CallTransferNode,
    pressDigitNode: PressDigitNode,
    endCallNode: EndCallNode,
    beginNode: BeginNode,
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

  const { nodes, edges, onNodesChange, onEdgesChange, onConnect, onEdgesDelete } = useFlowStore();
  const { onSelectionChange, addFunctionNode } = useFlowEditor();
  const { isFunctionModalOpen, functionNodePendingPosition, openFunctionModal, closeFunctionModal } = useUIStore();

  const { createNode } = useCreateNode(); 

  const onDragOver = useCallback((event: React.DragEvent) => {
    event?.preventDefault();
    event.dataTransfer.dropEffect = 'move';
  }, []);

  const onDrop = useCallback(
    (event: React.DragEvent) => {
      event.preventDefault();

      if (reactFlowWrapper.current) {
        const reactFlowBounds = reactFlowWrapper.current.getBoundingClientRect();
        const type = event.dataTransfer.getData('application/reactflow') as NodeType;

        if (typeof type === 'undefined' || !type) {
          return;
        }

        const position = screenToFlowPosition({
          x: event.clientX - reactFlowBounds.left,
          y: event.clientY - reactFlowBounds.top,
        });

        if (type === "functionNode") {
          openFunctionModal(position);
        } else {
          createNode(type, position); 
        }
      }
    },
    [screenToFlowPosition, createNode, openFunctionModal] 
  );

  const handleFunctionSelect = (functionName: string) => {
    if (functionNodePendingPosition) {
      addFunctionNode(functionName, functionNodePendingPosition);
      closeFunctionModal();
    }
  };


  return (
    <>
      <style jsx global>{`
        @keyframes dashAnimation {
          from {
            stroke-dashoffset: 0;
          }
          to {
            stroke-dashoffset: -20;
          }
        }
        
        .react-flow__connection-line {
          animation: dashAnimation 0.5s linear infinite;
        }
        
        .react-flow__edge path {
          stroke: #6b7280;
          stroke-width: 2;
          stroke-dasharray: 8,4;
          animation: dashAnimation 1s linear infinite;
        }
      `}</style>
      
      <div className="flex h-screen bg-neutral-50 relative">
        <NodeSidebar />

        <div className="flex-1 h-full min-w-0" ref={reactFlowWrapper}>
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
            connectionLineStyle={{
              stroke: '#6b7280',
              strokeWidth: 2,
              strokeDasharray: '8,4',
            }}
            connectionLineType={ConnectionLineType.SmoothStep}
            selectNodesOnDrag={false}
            panOnDrag={true}
            onDrop={onDrop}
            onDragOver={onDragOver}
          >
            <Background />
            <Controls 
              className="[&>button]:text-xs [&>button]:sm:text-sm [&>button]:p-1 [&>button]:sm:p-2"
              showZoom={true}
              showFitView={true}
              showInteractive={false}
            />
          </ReactFlow>
        </div>
        <NodeSettingsPanel />

        {isFunctionModalOpen && (
          <FunctionNodeModal
            isOpen={isFunctionModalOpen}
            onClose={closeFunctionModal} 
            onSelectFunction={handleFunctionSelect}
          />
        )}
      </div>
    </>
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