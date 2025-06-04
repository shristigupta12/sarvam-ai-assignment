// components/CustomFunctionDialog.tsx
"use client";

import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogDescription,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";

interface CustomFunctionDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSave?: (functionName: string) => void;
}

export default function CustomFunctionDialog({ open, onOpenChange, onSave }: CustomFunctionDialogProps) {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [url, setUrl] = useState("");
  const [timeout, setTimeout] = useState("");
  const [jsonSchema, setJsonSchema] = useState("");

  const handleFormatJson = () => {
    try {
      const parsed = JSON.parse(jsonSchema);
      const formatted = JSON.stringify(parsed, null, 2);
      setJsonSchema(formatted);
    } catch {
      alert("Invalid JSON");
    }
  };

  const handleSave = () => {
    if (onSave && name.trim()) {
      onSave(name.trim());
    } else {
      console.log({ name, description, url, timeout, jsonSchema });
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="w-[95vw] max-w-[600px] sm:max-w-[700px] overflow-y-auto max-h-[90vh] p-4 sm:p-6">
        <DialogHeader>
          <DialogTitle className="text-lg sm:text-xl">Custom Function</DialogTitle>
        </DialogHeader>
        <div className="space-y-3 sm:space-y-4">
          <div className="flex flex-col gap-1.5 sm:gap-2">
            <Label className="text-sm sm:text-base font-medium">Name</Label>
            <Input 
              value={name} 
              onChange={(e) => setName(e.target.value)} 
              placeholder="Enter the name of the custom function" 
              className="text-sm sm:text-base h-9 sm:h-10"
            />
          </div>
          <div className="flex flex-col gap-1.5 sm:gap-2">
            <Label className="text-sm sm:text-base font-medium">Description</Label>
            <Input 
              value={description} 
              onChange={(e) => setDescription(e.target.value)} 
              placeholder="Enter the description" 
              className="text-sm sm:text-base h-9 sm:h-10"
            />
          </div>
          <div className="flex flex-col gap-1.5 sm:gap-2">
            <Label className="text-sm sm:text-base font-medium">Your URL</Label>
            <Input 
              value={url} 
              onChange={(e) => setUrl(e.target.value)} 
              placeholder="Enter the URL of the function" 
              className="text-sm sm:text-base h-9 sm:h-10"
            />
          </div>
          <div className="flex flex-col gap-1.5 sm:gap-2">
            <Label className="text-sm sm:text-base font-medium">API Timeout (Optional)</Label>
            <Input
              type="number"
              value={timeout}
              onChange={(e) => setTimeout(e.target.value)}
              placeholder="Enter timeout in ms"
              className="text-sm sm:text-base h-9 sm:h-10"
            />
          </div>
          <div className="flex flex-col gap-1.5 sm:gap-2">
            <Label className="text-sm sm:text-base font-medium">Parameters (Optional)</Label>
            <Textarea
              className="min-h-[120px] sm:min-h-[150px] font-mono text-xs sm:text-sm resize-none"
              value={jsonSchema}
              onChange={(e) => setJsonSchema(e.target.value)}
              placeholder="Enter JSON Schema here..."
            />
            <Button 
              onClick={handleFormatJson} 
              variant="outline" 
              className="w-full sm:w-fit hover:cursor-pointer sm:ml-auto text-sm"
            >
              Format JSON
            </Button>
          </div>
        </div>
        <DialogFooter className="mt-4 w-full flex flex-col-reverse sm:flex-row justify-between gap-2 sm:gap-0">
          <Button 
            variant="outline" 
            onClick={() => onOpenChange(false)}
            className="w-full sm:w-auto"
          >
            Cancel
          </Button>
          <Button 
            onClick={handleSave} 
            className="bg-primary-300 hover:bg-primary-300 hover:cursor-pointer w-full sm:w-auto"
          >
            Save
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
