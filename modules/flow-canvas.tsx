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
import FunctionNodeModal from './canvas/nodes/function-node/function-node-modal';

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
  const {
    nodes,
    edges,
    onNodesChange,
    onEdgesChange,
    onConnect,
    onEdgesDelete,
    onSelectionChange,
    isFunctionModalOpen, // Get modal state
    functionNodePendingPosition, // Get pending position
    openFunctionModal, // Get open modal action
    addFunctionNodeWithSelectedData, // Get action to add function node with data
  } = useFlowStore();
  const { createNode } = useCreateNode(); // Keep createNode for other types

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
      addFunctionNodeWithSelectedData(functionName, functionNodePendingPosition);
    }
    // No need to close modal here, addFunctionNodeWithSelectedData handles it
  };


  return (
    <div className="flex h-screen bg-primary-50">
      <NodeSidebar />

      <div className="flex-grow h-full bg-primary-50" ref={reactFlowWrapper}>
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

      {/* Render the FunctionNodeModal */}
      {isFunctionModalOpen && (
        <FunctionNodeModal
          isOpen={isFunctionModalOpen}
          onClose={useFlowStore.getState().closeFunctionModal} // Direct call to close
          onSelectFunction={handleFunctionSelect}
        />
      )}
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