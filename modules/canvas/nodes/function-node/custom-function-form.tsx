// components/CustomFunctionDialog.tsx
"use client";

import { useState } from "react";
import {
  Dialog,
  DialogTrigger,
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
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>Custom Function</DialogTitle>
          <DialogDescription>
            JSON schema that defines the format in which the LLM will return. Please refer to the docs.
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-4">
          <div>
            <Label>Name</Label>
            <Input value={name} onChange={(e) => setName(e.target.value)} placeholder="Enter the name of the custom function" />
          </div>
          <div>
            <Label>Description</Label>
            <Input value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Enter the description" />
          </div>
          <div>
            <Label>Your URL</Label>
            <Input value={url} onChange={(e) => setUrl(e.target.value)} placeholder="Enter the URL of the function" />
          </div>
          <div>
            <Label>API Timeout (Optional)</Label>
            <Input
              type="number"
              value={timeout}
              onChange={(e) => setTimeout(e.target.value)}
              placeholder="Enter timeout in ms"
            />
          </div>
          <div>
            <Label>Parameters (Optional)</Label>
            <Textarea
              className="min-h-[150px] font-mono text-sm"
              value={jsonSchema}
              onChange={(e) => setJsonSchema(e.target.value)}
              placeholder="Enter JSON Schema here..."
            />
            <div className="flex gap-2 mt-2">
              <Button variant="outline" size="sm">example 1</Button>
              <Button variant="outline" size="sm">example 2</Button>
              <Button variant="outline" size="sm">example 3</Button>
            </div>
            <Button onClick={handleFormatJson} className="mt-2 w-full">
              Format JSON
            </Button>
          </div>
        </div>
        <DialogFooter className="mt-4">
          <Button variant="outline" onClick={() => onOpenChange(false)}>Cancel</Button>
          <Button onClick={handleSave}>Save</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
