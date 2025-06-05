import React, { useEffect } from 'react';
import useFlowStore from '@/modules/store/flow-store';
import { Edge, Node } from 'reactflow';
import { X, Settings } from 'lucide-react';
import {
  CustomEdgeData,
  ConversationNodeData,
  FunctionNodeData,
  CallTransferNodeData,
  PressDigitNodeData,
  CustomNodeData,
  EndCallNodeData,
  TransitionType,
  BeginNodeData,
} from '@/modules/types/flow';

const NodeSettingsPanel: React.FC = () => {
    const { selectedElements, updateNodeData, updateEdgeData, isSettingsPanelOpen, toggleSettingsPanel, openSettingsPanel } = useFlowStore();

    const selectedNode: Node<CustomNodeData> | undefined = selectedElements.nodes[0];
    const selectedEdge: Edge<CustomEdgeData> | undefined = selectedElements.edges[0];

    useEffect(() => {
      if ((selectedNode || selectedEdge) && window.innerWidth < 640) {
        openSettingsPanel();
      }
    }, [selectedNode, selectedEdge, openSettingsPanel]);

   

    const renderTransitionsEditor = (transitions: TransitionType[], nodeId: string) => (
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-2">Transitions:</label>
        {transitions.map((transition, index) => (
          <div key={index} className="mb-3 p-3 border border-gray-200 rounded-md bg-gray-50">
            <div className="mb-2">
              <label className="block text-xs font-medium text-gray-600 mb-1">Type:</label>
              <select
                value={transition.type}
                onChange={(e) => {
                  const newTransitions = [...transitions];
                  newTransitions[index] = { ...transition, type: e.target.value as "EQUATION" | "PROMPT" };
                  updateNodeData(nodeId, { transitions: newTransitions });
                }}
                className="w-full p-1 text-sm border border-gray-300 rounded focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="EQUATION">EQUATION</option>
                <option value="PROMPT">PROMPT</option>
              </select>
            </div>
            <div className="mb-2">
              <label className="block text-xs font-medium text-gray-600 mb-1">Content:</label>
              <input
                type="text"
                value={transition.content}
                onChange={(e) => {
                  const newTransitions = [...transitions];
                  newTransitions[index] = { ...transition, content: e.target.value };
                  updateNodeData(nodeId, { transitions: newTransitions });
                }}
                className="w-full p-1 text-sm border border-gray-300 rounded focus:ring-blue-500 focus:border-blue-500"
                placeholder="Enter transition content"
              />
            </div>
            <button
              onClick={() => {
                const newTransitions = transitions.filter((_, i) => i !== index);
                updateNodeData(nodeId, { transitions: newTransitions });
              }}
              className="text-xs text-neutral-500 hover:cursor-pointer"
            >
              Remove Transition
            </button>
          </div>
        ))}
        <button
          onClick={() => {
            const newTransitions = [...transitions, { type: "PROMPT" as const, content: "" }];
            updateNodeData(nodeId, { transitions: newTransitions });
          }}
          className="text-sm text-primary-300 hover:cursor-pointer"
        >
          + Add Transition
        </button>
      </div>
    );

    const renderCommonFields = (nodeData: CustomNodeData, nodeId: string, showTransitions: boolean = true) => (
      <>
        <label className="block text-sm font-medium text-gray-700 mb-1">Title:</label>
        <input
          type="text"
          value={nodeData?.title || ''}
          onChange={(e) => updateNodeData(nodeId, { title: e.target.value })}
          className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 mb-3"
          placeholder="Enter node title"
        />
        {showTransitions && 'transitions' in nodeData && nodeData.transitions && renderTransitionsEditor(nodeData.transitions, nodeId)}
      </>
    );

    const renderNodeSettings = (node: Node<CustomNodeData>) => {
      switch (node.type) {
        case 'conversationNode':
          const conversationData = node.data as ConversationNodeData;
          return (
            <>
              {renderCommonFields(conversationData, node.id)}
              <div className="flex items-center justify-between mb-3">
                <label htmlFor="toggle-Prompt Mode" className="text-sm font-medium text-gray-700">Prompt Mode:</label>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    id="toggle-Prompt Mode"
                    className="sr-only peer"
                    checked={conversationData?.promptMode || false}
                    onChange={(e) => updateNodeData(node.id, { promptMode: e.target.checked })}
                  />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-primary-300"></div>
                </label>
              </div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Prompt:</label>
              <textarea
                value={conversationData?.prompt || ''}
                onChange={(e) => updateNodeData(node.id, { prompt: e.target.value })}
                className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 min-h-[80px]"
                placeholder="Enter conversation prompt"
              />
            </>
          );
        case 'functionNode':
          const functionData = node.data as FunctionNodeData;
          return (
            <>
              {renderCommonFields(functionData, node.id)}
              <label className="block text-sm font-medium text-gray-700 mb-1">Function Name:</label>
              <input
                type="text"
                value={functionData?.functionName || ''}
                onChange={(e) => updateNodeData(node.id, { functionName: e.target.value })}
                className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 mb-3"
                placeholder="e.g., check_calendar_availability"
              />
            </>
          );
        case 'callTransferNode':
          const callTransferData = node.data as CallTransferNodeData;
          return (
            <>
              {renderCommonFields(callTransferData, node.id)}
              <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number:</label>
              <input
                type="text"
                value={callTransferData?.phoneNumber || ''}
                onChange={(e) => updateNodeData(node.id, { phoneNumber: e.target.value })}
                className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                placeholder="e.g., +1234567890"
              />
            </>
          );
        case 'pressDigitNode':
          const pressDigitData = node.data as PressDigitNodeData;
          return (
            <>
              {renderCommonFields(pressDigitData, node.id)}
              <label className="block text-sm font-medium text-gray-700 mb-1">Instructions:</label>
              <input
                type="text"
                value={pressDigitData?.instructions || ''}
                onChange={(e) => updateNodeData(node.id, { instructions: e.target.value })}
                className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 mb-3"
                placeholder="e.g., Press 1 for Sales"
              />
              <label className="block text-sm font-medium text-gray-700 mb-1">Pause Delay (ms):</label>
              <input
                type="number"
                value={pressDigitData?.pauseDetectionDelay || 0}
                onChange={(e) => updateNodeData(node.id, { pauseDetectionDelay: parseInt(e.target.value, 10) || 0 })}
                className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                placeholder="e.g., 2000"
              />
            </>
          );
        case 'endCallNode':
          const endCallData = node.data as EndCallNodeData;
          return (
            <>
              {renderCommonFields(endCallData, node.id, false)}
              <p className="text-sm text-gray-600">This node marks the termination of the flow.</p>
            </>
          );
        case 'beginNode':
          const beginData = node.data as BeginNodeData;
          return (
            <>
              {renderCommonFields(beginData, node.id, false)}
              <p className="text-sm text-gray-600">This is the starting point of the flow.</p>
            </>
          );
        default:
          return <p className="text-sm text-gray-600">No specific settings for this node type.</p>;
      }
    };

    const renderEdgeSettings = (edge: Edge<CustomEdgeData>) => {
      return (
        <>
          <label className="block text-sm font-medium text-gray-700 mb-1">Transition Condition:</label>
          <input
            type="text"
            value={edge.data?.condition || ''}
            onChange={(e) => updateEdgeData(edge.id, { condition: e.target.value })}
            className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
            placeholder="e.g., User needs to return the package"
          />
        </>
      );
    };

    return (
      <>
        {/* Mobile Settings Toggle Button */}
        <button
          onClick={toggleSettingsPanel}
          className="fixed bottom-4 right-4 z-30 bg-primary-300 text-white p-3 rounded-full shadow-lg sm:hidden"
        >
          <Settings className="w-5 h-5" />
        </button>

        {/* Settings Panel */}
        <aside className={`border-l border-neutral-300 bg-white p-3 sm:p-4 h-full w-full sm:w-80 md:w-96 lg:w-80 xl:w-96 max-w-screen-sm sm:max-w-none overflow-y-auto fixed right-0 top-0 sm:relative transform transition-transform duration-300 ease-in-out z-20 sm:z-auto ${
          isSettingsPanelOpen ? 'translate-x-0' : 'translate-x-full sm:translate-x-0'
        }`}>
          {/* Mobile Close Button */}
          <button
            onClick={toggleSettingsPanel}
            className="absolute top-4 right-4 p-2 hover:bg-gray-100 rounded-md sm:hidden"
          >
            <X className="w-4 h-4" />
          </button>

          <div className="text-base sm:text-lg font-semibold mb-3 pr-12 sm:pr-0">Properties</div>

          {!selectedNode && !selectedEdge && (
            <p className="text-sm text-neutral-500">Select a node or an edge to view its properties.</p>
          )}

          {selectedNode && (
            <div className="mb-6">
              {renderNodeSettings(selectedNode)}
            </div>
          )}

          {selectedEdge && (
            <div>
              <h3 className="text-sm sm:text-md font-semibold mb-2">Edge: {selectedEdge.id}</h3>
              <p className="text-xs text-gray-600 mb-2">From: {selectedEdge.source} to: {selectedEdge.target}</p>
              {renderEdgeSettings(selectedEdge)}
            </div>
          )}
        </aside>

        {/* Mobile Overlay */}
        {isSettingsPanelOpen && (
          <div
            className="fixed inset-0 bg-black bg-opacity-50 z-10 sm:hidden"
            onClick={toggleSettingsPanel}
          />
        )}
      </>
    );
};

export default NodeSettingsPanel;
