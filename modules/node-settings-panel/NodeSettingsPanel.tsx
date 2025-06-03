import React, { useEffect } from 'react';
import useFlowStore from '@/modules/store/flow-store';
import { Edge, Node } from 'reactflow';
import { CustomEdgeData } from '@/modules/store/flow-store';

const NodeSettingsPanel: React.FC = () => {
    const { selectedElements, updateNodeData, updateEdgeData } = useFlowStore();

    const selectedNode = selectedElements.nodes[0]; 
    const selectedEdge = selectedElements.edges[0]; 

    const renderNodeSettings = (node: Node) => {
        switch (node.type) {
          case 'conversationNode':
            return (
              <>
                <label className="block text-sm font-medium text-gray-700 mb-1">Prompt:</label>
                <input
                  type="text"
                  value={node.data?.prompt || ''}
                  onChange={(e) => updateNodeData(node.id, { prompt: e.target.value })}
                  className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Enter conversation prompt"
                />
              </>
            );
          case 'functionNode':
            return (
              <>
                <label className="block text-sm font-medium text-gray-700 mb-1">Function Name:</label>
                <input
                  type="text"
                  value={selectedNode.data?.functionName || ''}
                  onChange={(e) => updateNodeData(node.id, { functionName: e.target.value })}
                  className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                  placeholder="e.g., processPayment"
                />
              </>
            );
          case 'callTransferNode':
            return (
              <>
                <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number:</label>
                <input
                  type="text"
                  value={node.data?.phoneNumber || ''}
                  onChange={(e) => updateNodeData(node.id, { phoneNumber: e.target.value })}
                  className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                  placeholder="e.g., +1234567890"
                />
              </>
            );
          case 'pressDigitNode':
            return (
              <>
                <label className="block text-sm font-medium text-gray-700 mb-1">Instructions:</label>
                <input
                  type="text"
                  value={node.data?.instructions || ''}
                  onChange={(e) => updateNodeData(node.id, { instructions: e.target.value })}
                  className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 mb-3"
                  placeholder="e.g., Press 1 for Sales"
                />
                <label className="block text-sm font-medium text-gray-700 mb-1">Pause Delay (ms):</label>
                <input
                  type="number"
                  value={node.data?.pauseDetectionDelay || 0}
                  onChange={(e) => updateNodeData(node.id, { pauseDetectionDelay: parseInt(e.target.value, 10) || 0 })}
                  className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                  placeholder="e.g., 2000"
                />
              </>
            );
          case 'endCallNode':
            return (
              <p className="text-sm text-gray-600">This node marks the end of the call flow.</p>
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

    
    return(
        <aside className="border-l border-gray-300 p-4 bg-white h-full w-80 overflow-y-auto">
        <div className="text-lg font-bold mb-4">Properties</div>
  
        {!selectedNode && !selectedEdge && (
          <p className="text-sm text-gray-600">Select a node or an edge to view its properties.</p>
        )}
  
        {selectedNode && (
          <div className="mb-6">
            <h3 className="text-md font-semibold mb-2">Node: {selectedNode.type} (ID: {selectedNode.id})</h3>
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
    )
}

export default NodeSettingsPanel;