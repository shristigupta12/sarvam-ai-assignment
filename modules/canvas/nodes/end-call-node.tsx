import React, { memo } from 'react';
import { Handle, Position } from 'reactflow';
import { NodesWrapper } from './nodes-wrapper/nodes-wrapper';

const EndCallNode = ({ id }: { id: string }) => {
  return (
    <NodesWrapper nodeId={id} nodeType="endCallNode" title="End Call Node" handleTitleChange={() => {}}>
      <div className="text-sm font-semibold">End Call Node</div>

      <Handle type="target" position={Position.Top} />
    </NodesWrapper>
  );
};

export default memo(EndCallNode);