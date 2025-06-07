import React, {memo, useState} from 'react';
import {
    BaseEdge,
    EdgeLabelRenderer,
    getSmoothStepPath,
    EdgeProps,
    Edge as ReactFlowEdge
} from 'reactflow';
import { useFlowStore } from '@/modules/stores/use-flow-store';
import { CustomEdgeData } from '@/modules/types/flow';
import { X } from 'lucide-react';

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
    selected,
    source,
    target
}) => {
    const [isHovered, setIsHovered] = useState(false);
    
    const [edgePath, labelX, labelY] = getSmoothStepPath({
        sourceX,
        sourceY,
        targetX,
        targetY,
        sourcePosition,
        targetPosition,
    })
    
    const onEdgesDelete = useFlowStore((state)=>state.onEdgesDelete);

    const handleDeleteClick = (event: React.MouseEvent) => {
        event.stopPropagation(); 
        const edgeToDelete: ReactFlowEdge = { 
            id, 
            source: source || '', 
            target: target || '',
            sourceHandle: null,
            targetHandle: null
        }; 
        onEdgesDelete([edgeToDelete]); 
    };
    
    const handleEdgeMouseEnter = () => {
        setIsHovered(true);
    };

    const handleEdgeMouseLeave = () => {
        setIsHovered(false);
    };

    const handleButtonMouseEnter = () => {
        setIsHovered(true);
    };

    // Show delete button if edge is hovered OR selected
    const showDeleteButton = isHovered || selected;

  return (
    <g>
      <BaseEdge 
        path={edgePath} 
        markerEnd={markerEnd} 
        style={style}
      />
      
      {/* Invisible hover area */}
      <path
        d={edgePath}
        fill="none"
        stroke="transparent"
        strokeWidth="20"
        onMouseEnter={handleEdgeMouseEnter}
        onMouseLeave={handleEdgeMouseLeave}
        style={{ cursor: 'pointer' }}
      />
      
      {showDeleteButton && (
        <EdgeLabelRenderer>
          <div
            style={{
              position: 'absolute',
              transform: `translate(-50%, -50%) translate(${labelX}px,${labelY}px)`,
              pointerEvents: 'all',
            }}
            className="nodrag nopan"
            onMouseEnter={handleButtonMouseEnter}
            onMouseLeave={handleEdgeMouseLeave}
          >
            <button
              onClick={handleDeleteClick}
              className="w-6 h-6 rounded-full bg-red-500 text-white hover:bg-red-600 flex items-center justify-center shadow-lg border border-white"
              title="Delete edge"
            >
              <X size={12} />
            </button>
          </div>
        </EdgeLabelRenderer>
      )}
    </g>
  );
};

export default memo(CustomEdge);
