import React from 'react';
import useFlowStore from '@/modules/store/flow-store';
import { Edge, Node } from 'reactflow';
import {
  CustomEdgeData,
  ConversationNodeData,
  FunctionNodeData,
  CallTransferNodeData,
  PressDigitNodeData,
  CustomNodeData, 
} from '@/modules/types/flow';

const NodeSettingsPanel: React.FC = () => {
    const { selectedElements, updateNodeData, updateEdgeData } = useFlowStore();

    const selectedNode: Node<CustomNodeData> | undefined = selectedElements.nodes[0];
    const selectedEdge: Edge<CustomEdgeData> | undefined = selectedElements.edges[0];

    const renderToggle = (label: string, value: boolean, onChange: (checked: boolean) => void) => (
      <div className="flex items-center justify-between mb-3">
        <label htmlFor={`toggle-${label}`} className="text-sm font-medium text-gray-700">{label}:</label>
        <label className="relative inline-flex items-center cursor-pointer">
          <input
            type="checkbox"
            id={`toggle-${label}`}
            className="sr-only peer"
            checked={value}
            onChange={(e) => onChange(e.target.checked)}
          />
          <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
        </label>
      </div>
    );


    const renderNodeSettings = (node: Node<CustomNodeData>) => {
      switch (node.type) {
        case 'conversationNode':
          const conversationData = node.data as ConversationNodeData;
          return (
            <>
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
              <label className="block text-sm font-medium text-gray-700 mb-1">Function Name:</label>
              <input
                type="text"
                value={functionData?.functionName || ''}
                onChange={(e) => updateNodeData(node.id, { functionName: e.target.value })}
                className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 mb-3"
                placeholder="e.g., check_calendar_availability"
              />
              {renderToggle("Wait for Result", functionData?.waitForResult || false, (checked) =>
                updateNodeData(node.id, { waitForResult: checked })
              )}
              {renderToggle("Speak During Execution", functionData?.speakDuringExecution || false, (checked) =>
                updateNodeData(node.id, { speakDuringExecution: checked })
              )}
              {renderToggle("Global Node", functionData?.globalNode || false, (checked) =>
                updateNodeData(node.id, { globalNode: checked })
              )}
            </>
          );
        case 'callTransferNode':
          const callTransferData = node.data as CallTransferNodeData;
          return (
            <>
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
          return (
            <p className="text-sm text-gray-600">This node marks the termination of the flow.</p>
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
      <aside className="border-l border-gray-300 p-4 bg-gray-50 h-full w-80 overflow-y-auto">
        <div className="text-lg font-bold mb-4">Properties</div>

        {!selectedNode && !selectedEdge && (
          <p className="text-sm text-gray-600">Select a node or an edge to view its properties.</p>
        )}

        {selectedNode && (
          <div className="mb-6">
            <h3 className="text-md font-semibold mb-2">Node: {selectedNode.type} </h3>
            {renderNodeSettings(selectedNode)}
          </div>
        )}

        {selectedEdge && (
          <div>
            <h3 className="text-md font-semibold mb-2">Edge: {selectedEdge.id}</h3>
            <p className="text-xs text-gray-600 mb-2">From: {selectedEdge.source} to: {selectedEdge.target}</p>
            {renderEdgeSettings(selectedEdge)}
          </div>
        )}
      </aside>
    );
};

export default NodeSettingsPanel;
