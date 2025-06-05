import { CustomNodeData } from '@/modules/types/flow';
import { NodeProps } from 'reactflow';
import { Settings2 } from 'lucide-react';
import useFlowStore from '@/modules/store/flow-store';
import { TransitionConditions } from './transition-conditions/transition-conditions';
import React from 'react'; 

interface BaseNodeProps extends NodeProps<CustomNodeData> {
  children: React.ReactNode;
}

const BaseNode: React.FC<BaseNodeProps> = ({ id, data, children }) => {
  const { openSettingsPanel, selectedElements } = useFlowStore((state) => ({
    openSettingsPanel: state.openSettingsPanel,
    selectedElements: state.selectedElements,
  }));

  const isSelected = selectedElements.nodes.some(node => node.id === id);

  const handleSettingsClick = (event: React.MouseEvent) => {
    event.stopPropagation(); 
    const node = useFlowStore.getState().nodes.find(n => n.id === id);
    useFlowStore.setState({ selectedElements: { nodes: [node!], edges: [] } }); 
    openSettingsPanel();
  };

  return (
    <div 
      className={`relative p-3 border rounded-md shadow-sm bg-white ${(isSelected) ? 'border-blue-500 ring-2 ring-blue-500' : 'border-neutral-300'}`}
      style={{ width: 300, minHeight: 100 }}
    >
      {children}
      
      {isSelected && (
        <button 
          onClick={handleSettingsClick}
          className="absolute top-2 right-2 p-1 bg-neutral-100 hover:bg-neutral-200 rounded-full text-neutral-600 hover:text-neutral-800 transition-colors z-10"
          aria-label="Node settings"
        >
          <Settings2 size={16} />
        </button>
      )}


      {('transitions' in data) && <TransitionConditions id={id} data={data} />}
    </div>
  );
};

export default BaseNode; 