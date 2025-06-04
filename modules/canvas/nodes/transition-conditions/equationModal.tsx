import { useEffect } from "react";

import { useState } from "react";

export const EquationModal = ({ initialConditionString, onSave, onClose }: { initialConditionString: string, onSave: ( conditionString: string) => void, onClose: () => void }) => {
    const [conditions, setConditions] = useState<{
        id: number;
        variable: string; 
        operator: string;
        value: string;
      }[]>([]);
    const [matchType, setMatchType] = useState('any');
    
    useEffect(() => {
      if (initialConditionString) {
        const parsedConditions = parseConditionString(initialConditionString);
        setConditions(parsedConditions);
      } else {
        setConditions([{ id: Date.now(), variable: '', operator: '=', value: '' }]);
      }
    }, [initialConditionString]);
  
    const generateId = () => Date.now() + Math.random();
  
    const handleAddConditionRow = () => {
      setConditions([...conditions, { id: generateId(), variable: '', operator: '=', value: '' }]);
    };
  
    const handleConditionChange = (id: number, field: string, value: string) => {
      setConditions(conditions.map(cond =>
        cond.id === id ? { ...cond, [field]: value } : cond
      ));
    };
  
    const handleRemoveConditionRow = (id: number) => {
      setConditions(conditions.filter(cond => cond.id !== id));
    };
  
    const generateConditionString = () => {
      if (conditions.length === 0) return "";
      const conditionParts = conditions.map(cond => {
        if (!cond.variable || !cond.operator || !cond.value) {
          return "";
        }
        return `${cond.variable} ${cond.operator} ${cond.value}`;
      }).filter(Boolean);
  
      if (conditionParts.length === 0) return "";
  
      const conjunction = matchType === 'any' ? 'OR' : 'AND';
      return conditionParts.join(` ${conjunction} `);
    };
    const parseConditionString = (str: string) => {
        if (!str) return [];
        const parts = str.split(/ (AND|OR) /i); 
        const parsed = [];
        let currentMatchType = 'AND'; 
  
        for (let i = 0; i < parts.length; i++) {
            const part = parts[i].trim();
            if (part.toLowerCase() === 'and' || part.toLowerCase() === 'or') {
                currentMatchType = part.toLowerCase();
                setMatchType(currentMatchType); 
                continue;
            }
  
            const regex = /(.+?)\s*(=|!=|>|<|>=|<=)\s*(.+)/; 
            const match = part.match(regex);
  
            if (match) {
                parsed.push({
                    id: generateId(),
                    variable: match[1].trim(),
                    operator: match[2].trim(),
                    value: match[3].trim()
                });
            }
        }
        return parsed.length > 0 ? parsed : [{ id: generateId(), variable: '', operator: '=', value: '' }];
    };
  
  
    const handleSave = () => {
      const conditionString = generateConditionString();
      onSave(conditionString);
    };
  
    return (
      <div className="modal-overlay text-neutral-600 bg-white absolute -right-40">
        <div className="modal-content">
            <div className="flex justify-between items-center">
          <h3>Configure conditions</h3>
          <button className="close-button" onClick={onClose}>X</button>
          </div>
  
          <div className="match-type-selector">
            <select value={matchType} onChange={(e) => setMatchType(e.target.value)}>
              <option value="any">Any</option>
              <option value="all">All</option>
            </select>
            <span> of the following conditions match</span>
          </div>
  
          <div className="conditions-list">
            {conditions.map((cond, index) => (
              <div key={cond.id} className="condition-row flex items-center gap-2">
                <input
                  type="text"
                  placeholder="{{Variables}}"
                  value={cond.variable}
                  onChange={(e) => handleConditionChange(cond.id, 'variable', e.target.value)}
                />
                <select
                  value={cond.operator}
                  onChange={(e) => handleConditionChange(cond.id, 'operator', e.target.value)}
                >
                  <option value="=">=</option>
                  <option value="!=">!=</option>
                  <option value=">">&gt;</option>
                  <option value="<">&lt;</option>
                  <option value=">=">&gt;=</option>
                  <option value="<=">&lt;=</option>
                </select>
                <input
                  type="text"
                  placeholder="Value"
                  value={cond.value}
                  onChange={(e) => handleConditionChange(cond.id, 'value', e.target.value)}
                />
                <button onClick={() => handleRemoveConditionRow(cond.id)}>🗑️</button>
              </div>
            ))}
          </div>
  
          <button onClick={handleAddConditionRow}>+ Add Condition</button>
  
          <div className="modal-actions">
            <button onClick={handleSave}>Save</button>
            <button onClick={onClose}>Cancel</button>
          </div>
        </div>
      </div>
    );
  };