import React from "react";

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
    <div className="border-r border-neutral-300 p-4 bg-white h-full overflow-y-auto">
      <div className="text-lg font-semibold text-neutral-400">Add New Node</div>
      <p className="text-sm text-gray-600 mb-4">
        Click or drag
      </p>

      {/* Conversation Node */}
      <div
        className="flex items-center justify-center p-3 mb-3 bg-blue-100 border border-blue-400 rounded-md cursor-grab active:cursor-grabbing "
        onDragStart={(event) => onDragStart(event, "conversationNode")}
        draggable
        onClick={() =>
          handleAddNodeClick("conversationNode", { prompt: "New conversation" })
        }
      >
        Conversation Node
      </div>

      {/* Function Node */}
      <div
        className="flex items-center justify-center p-3 mb-3 bg-green-100 border border-green-400 rounded-md cursor-grab active:cursor-grabbing"
        onDragStart={(event) => onDragStart(event, "functionNode")}
        draggable
        onClick={() =>
          handleAddNodeClick("functionNode", { prompt: "New Function" })
        }
      >
        Function Node
      </div>

      {/* Call Transfer Node */}
      <div
        className="flex items-center justify-center p-3 mb-3 bg-purple-100 border border-purple-400 rounded-md cursor-grab active:cursor-grabbing"
        onDragStart={(event) => onDragStart(event, "callTransferNode")}
        draggable
        onClick={() =>
          handleAddNodeClick("callTransferNode", { prompt: "New call transfer" })
        }
      >
        Call Transfer Node
      </div>

      {/* Press Digit Node */}
      <div
        className="flex items-center justify-center p-3 mb-3 bg-yellow-100 border border-yellow-400 rounded-md cursor-grab active:cursor-grabbing"
        onDragStart={(event) => onDragStart(event, "pressDigitNode")}
        draggable
        onClick={() =>
          handleAddNodeClick("pressDigitNode", { prompt: "New press digit" })
        }
      >
        Press Digit Node
      </div>

      {/* End Call Node */}
      <div
        className="flex items-center justify-center p-3 mb-3 bg-red-100 border border-red-400 rounded-md cursor-grab active:cursor-grabbing"
        onDragStart={(event) => onDragStart(event, "endCallNode")}
        draggable
        onClick={() =>
          handleAddNodeClick("endCallNode", { prompt: "New end call" })
        }
      >
        End Call Node
      </div>

    </div>
  );
};

export default NodeSidebar;
