import React from "react";
import { Node } from "reactflow";

interface CustomNodeData {
  prompt?: string;
  functionName?: string;
  phoneNumber?: string;
  instructions?: string;
  pauseDetectionDelay?: number;
}



interface NodeSidebarProps {
  onAddNode: (type: string, position: { x: number; y: number }) => void;
}

const NodeSidebar: React.FC<NodeSidebarProps> = ({ onAddNode }) => {
  const onDragStart = (event: React.DragEvent, nodeType: string) => {
    event.dataTransfer.setData("application/reactflow", nodeType),
      (event.dataTransfer.effectAllowed = "move");
  };

  const handleAddNodeClick = (
    nodeType: string,
    defaultData: CustomNodeData = {}
  ) => {
    onAddNode(nodeType, { x: 50, y: 50 });
  };

  return (
    <aside className="border-r border-gray-300 p-4 bg-gray-50 h-full overflow-y-auto">
      <div className="text-lg font-bold mb-4">Node Types</div>
      <p className="text-sm text-gray-600 mb-4">
        Drag these nodes to the canvas.
      </p>

      {/* Conversation Node */}
      <div
        className="flex items-center justify-center p-3 mb-3 bg-blue-100 border border-blue-400 rounded-md cursor-grab active:cursor-grabbing"
        onDragStart={(event) => onDragStart(event, "conversationNode")}
        draggable
      >
        Conversation Node
      </div>

      {/* Function Node */}
      <div
        className="flex items-center justify-center p-3 mb-3 bg-green-100 border border-green-400 rounded-md cursor-grab active:cursor-grabbing"
        onDragStart={(event) => onDragStart(event, "functionNode")}
        draggable
      >
        Function Node
      </div>

      {/* Call Transfer Node */}
      <div
        className="flex items-center justify-center p-3 mb-3 bg-purple-100 border border-purple-400 rounded-md cursor-grab active:cursor-grabbing"
        onDragStart={(event) => onDragStart(event, "callTransferNode")}
        draggable
      >
        Call Transfer Node
      </div>

      {/* Press Digit Node */}
      <div
        className="flex items-center justify-center p-3 mb-3 bg-yellow-100 border border-yellow-400 rounded-md cursor-grab active:cursor-grabbing"
        onDragStart={(event) => onDragStart(event, "pressDigitNode")}
        draggable
      >
        Press Digit Node
      </div>

      {/* End Call Node */}
      <div
        className="flex items-center justify-center p-3 mb-3 bg-red-100 border border-red-400 rounded-md cursor-grab active:cursor-grabbing"
        onDragStart={(event) => onDragStart(event, "endCallNode")}
        draggable
      >
        End Call Node
      </div>

      {/* Optional: Add nodes via button click (for testing/alternative UX) */}
      <div className="mt-8 text-lg font-bold mb-4">Click to Add (Dev Only)</div>
      <button
        className="w-full p-2 mb-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        onClick={() =>
          handleAddNodeClick("conversationNode", { prompt: "New conversation" })
        }
      >
        Add Conversation
      </button>
    </aside>
  );
};

export default NodeSidebar;
