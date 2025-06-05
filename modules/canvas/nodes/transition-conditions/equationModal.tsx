import { Trash2, X } from "lucide-react";
import { useEffect, useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";

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
      <div className="modal-overlay text-neutral-600 bg-white absolute -right-114 py-2 px-4 rounded-md border flex flex-col gap-2 w-[450px]">
          <div className="modal-content pb-3">
            <div className="flex justify-between items-center">
            <h3 className="text-md font-semibold text-neutral-700">Configure conditions</h3>
            <button className="close-button hover:cursor-pointer" onClick={onClose}><X className="size-4" /></button>
          </div>
  
          <div className="match-type-selector py-2 flex items-center gap-1">
            <Select value={matchType} onValueChange={setMatchType}>
              <SelectTrigger className="w-fit">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="any">Any</SelectItem>
                <SelectItem value="all">All</SelectItem>
              </SelectContent>
            </Select>
            <span className="ml-2">of the following conditions match</span>
          </div>
  
          {conditions.length > 0 && <div className="conditions-list pb-3 flex flex-col gap-2">
            {conditions.map((cond, index) => (
              <div key={cond.id} className="condition-row flex items-center gap-2 w-full justify-between">
                <div className="flex items-center gap-2">
                  <input
                    type="text"
                    placeholder="{{Variables}}"
                    value={cond.variable}
                    onChange={(e) => handleConditionChange(cond.id, 'variable', e.target.value)}
                    className="border rounded-md border-neutral-300 p-2 text-sm leading-tight hover:cursor-pointer w-[100px]"
                  />
                  <Select
                    value={cond.operator}
                    onValueChange={(value) => handleConditionChange(cond.id, 'operator', value)}
                  >
                    <SelectTrigger className="w-[100px] shadow-none border border-neutral-300 ">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="=">=</SelectItem>
                      <SelectItem value="!=">!=</SelectItem>
                      <SelectItem value=">">&gt;</SelectItem>
                      <SelectItem value="<">&lt;</SelectItem>
                      <SelectItem value=">=">&gt;=</SelectItem>
                      <SelectItem value="<=">&lt;=</SelectItem>
                    </SelectContent>
                  </Select>
                  <input
                    type="text"
                    placeholder="Value"
                    value={cond.value}
                    onChange={(e) => handleConditionChange(cond.id, 'value', e.target.value)}
                    className="border rounded-md border-neutral-300 p-2 text-sm leading-tight hover:cursor-pointer w-[100px]"
                  />
                </div>
                <button onClick={(e) => {
                  e.stopPropagation();
                  handleRemoveConditionRow(cond.id);
                }} className="hover:cursor-pointer"><Trash2 className="size-4" /></button>
              </div>
            ))}
          </div>}
  
          <button onClick={handleAddConditionRow} className="text-sm text-neutral-500 pb-3">+ Add Condition</button>
  
          <div className="modal-actions w-full items-center flex justify-between">
            <Button onClick={handleSave} className="bg-primary-300 hover:bg-primary-300 hover:cursor-pointer">Save</Button>
            <Button onClick={onClose} variant="outline" className="hover:cursor-pointer">Cancel</Button>
          </div>
        </div>
      </div>
    );
  };