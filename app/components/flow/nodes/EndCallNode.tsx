import React, { memo } from 'react';
import { Handle, Position } from 'reactflow';

const EndCallNode = () => {
  return (
    <div className="bg-red-200 border border-red-500 rounded-md p-4 shadow-md min-w-[200px]">
      <div className="text-sm font-semibold">End Call Node</div>

      <Handle type="target" position={Position.Top} className="!bg-red-500" />
    </div>
  );
};

export default memo(EndCallNode);