import React, {memo} from 'react';
import {
    BaseEdge,
    EdgeLabelRenderer,
    getBezierPath,
    EdgeProps,
    Edge as ReactFlowEdge
} from 'reactflow';
import useFlowStore from '@/modules/store/flow-store';
import { CustomEdgeData } from '@/modules/store/flow-store';

const CustomEdge: React.FC<EdgeProps<CustomEdgeData>> = ({
    id,
    sourceX,
    sourceY,
    targetX,
    targetY,
    sourcePosition,
    targetPosition,
    style = {},
    markerEnd,
    data,
    selected
}) => {
    const [edgePath, labelX, labelY] = getBezierPath({
        sourceX,
        sourceY,
        targetX,
        targetY,
        sourcePosition,
        targetPosition
    })
    
    const onEdgesDelete = useFlowStore((state)=>state.onEdgesDelete);

    const handleLabelClick = (event: React.MouseEvent) => {
        event.stopPropagation();
        alert(`Editing condition for edge ID: ${id}\nCurrent: "${data?.condition || ''}"\n(This will open a panel soon)`);
    }

    const handleDeleteClick = (event: React.MouseEvent) => {
        event.stopPropagation(); 
        const edgeToDelete: ReactFlowEdge = { id, source: '', target: '' }; // Minimal properties required by Edge
        onEdgesDelete([edgeToDelete]); 
    };
    

  return (
    <>
      <BaseEdge path={edgePath} markerEnd={markerEnd} style={style} />
      <EdgeLabelRenderer>
        <div
          style={{
            position: 'absolute',
            transform: `translate(-50%, -50%) translate(${labelX}px,${labelY}px)`,
            pointerEvents: 'all',
            background: 'white',
            padding: '4px 8px',
            borderRadius: '4px',
            fontSize: '10px',
            fontWeight: selected ? 'bold' : 'normal', 
            border: selected ? '1px solid #1a192b' : '1px solid #ccc',
            boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
            cursor: 'pointer',
          }}
          className="nodrag nopan" 
          onClick={handleLabelClick}
        >
          {data?.condition || 'Add Condition'}
          {selected && (
            <button
              onClick={handleDeleteClick}
              className="ml-2 px-1 py-0.5 rounded bg-red-500 text-white text-xs hover:bg-red-600"
            >
              x
            </button>
          )}
        </div>
      </EdgeLabelRenderer>
    </>
  );
};

export default memo(CustomEdge);
