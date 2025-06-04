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
      <DialogContent className="sm:max-w-[600px] overflow-y-auto max-h-[80vh]">
        <DialogHeader>
          <DialogTitle>Custom Function</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <div className="flex flex-col gap-2">
            <Label>Name</Label>
            <Input value={name} onChange={(e) => setName(e.target.value)} placeholder="Enter the name of the custom function" />
          </div>
          <div className="flex flex-col gap-2">
            <Label>Description</Label>
            <Input value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Enter the description" />
          </div>
          <div className="flex flex-col gap-2">
            <Label>Your URL</Label>
            <Input value={url} onChange={(e) => setUrl(e.target.value)} placeholder="Enter the URL of the function" />
          </div>
          <div className="flex flex-col gap-2">
            <Label>API Timeout (Optional)</Label>
            <Input
              type="number"
              value={timeout}
              onChange={(e) => setTimeout(e.target.value)}
              placeholder="Enter timeout in ms"
            />
          </div>
          <div className="flex flex-col gap-2">
            <Label>Parameters (Optional)</Label>
            <Textarea
              className="min-h-[150px] font-mono text-sm"
              value={jsonSchema}
              onChange={(e) => setJsonSchema(e.target.value)}
              placeholder="Enter JSON Schema here..."
            />
            <Button onClick={handleFormatJson} variant="outline" className="w-fit hover:cursor-pointer ml-auto">
              Format JSON
            </Button>
          </div>
        </div>
        <DialogFooter className="mt-4 w-full flex justify-between">
          <Button variant="outline" onClick={() => onOpenChange(false)}>Cancel</Button>
          <Button onClick={handleSave} className="bg-primary-300 hover:bg-primary-300 hover:cursor-pointer">Save</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
