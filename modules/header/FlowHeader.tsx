'use client';

import React, { useState, useEffect, useRef } from 'react';
import useFlowStore from '@/modules/store/flow-store';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ArrowLeft, Edit3, Check, X, Save, Download } from 'lucide-react';

const FlowHeader: React.FC = () => {
  const flowTitle = useFlowStore((state) => state.flowTitle);
  const setFlowTitle = useFlowStore((state) => state.setFlowTitle);
  const saveFlowToLocalStorage = useFlowStore((state) => state.saveFlowToLocalStorage);
  const loadFlowFromLocalStorage = useFlowStore((state) => state.loadFlowFromLocalStorage);
  const [isEditingTitle, setIsEditingTitle] = useState(false);
  const [editableTitle, setEditableTitle] = useState(flowTitle);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    setEditableTitle(flowTitle);
  }, [flowTitle]);

  useEffect(() => {
    if (isEditingTitle && inputRef.current) {
      inputRef.current.focus();
      inputRef.current.select();
    }
  }, [isEditingTitle]);

  const handleTitleSave = () => {
    if (editableTitle.trim() === '') {
      setEditableTitle(flowTitle); // Reset to original if empty
    } else {
      setFlowTitle(editableTitle.trim());
    }
    setIsEditingTitle(false);
  };

  const handleTitleCancel = () => {
    setEditableTitle(flowTitle);
    setIsEditingTitle(false);
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      handleTitleSave();
    }
    if (event.key === 'Escape') {
      handleTitleCancel();
    }
  };

  return (
    <div className="w-full bg-neutral-100 p-3 border-b border-neutral-300 flex items-center justify-between sticky top-0 z-20">
      <div className="flex items-center gap-3">
        <Button variant="outline" size="sm" className="text-neutral-700 hover:bg-neutral-200">
          <ArrowLeft size={16} className="mr-2" />
          Back to Flows
        </Button>
      </div>
      <div className="flex-1 flex items-center justify-center min-w-0 px-4">
        {isEditingTitle ? (
          <div className="flex items-center gap-2 w-full max-w-md">
            <Input
              ref={inputRef}
              value={editableTitle}
              onChange={(e) => setEditableTitle(e.target.value)}
              onKeyDown={handleKeyDown}
              className="text-lg font-semibold flex-1"
            />
            <Button variant="ghost" size="icon" onClick={handleTitleSave} className="text-green-600 hover:text-green-700">
              <Check size={20} />
            </Button>
            <Button variant="ghost" size="icon" onClick={handleTitleCancel} className="text-red-600 hover:text-red-700">
              <X size={20} />
            </Button>
          </div>
        ) : (
          <div 
            className="flex items-center gap-2 cursor-pointer group p-2 rounded-md hover:bg-neutral-200 transition-colors"
            onClick={() => setIsEditingTitle(true)}
            title="Edit Flow Title"
          >
            <h1 className="text-lg font-semibold text-neutral-800 truncate">
              {flowTitle}
            </h1>
            <Edit3 size={16} className="text-neutral-500 opacity-0 group-hover:opacity-100 transition-opacity" />
          </div>
        )}
      </div>
      <div className="flex items-center gap-2 min-w-[200px] justify-end">
        <Button variant="outline" size="sm" onClick={loadFlowFromLocalStorage} className="text-neutral-700 hover:bg-neutral-200">
          <Download size={16} className="mr-2" />
          Load
        </Button>
        <Button variant="default" size="sm" onClick={saveFlowToLocalStorage} className="bg-primary-300 hover:bg-primary-400 text-white">
          <Save size={16} className="mr-2" />
          Save
        </Button>
      </div>
    </div>
  );
};

export default FlowHeader; 