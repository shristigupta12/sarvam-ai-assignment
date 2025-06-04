import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { useState, useEffect } from "react"

interface KeyValuePair {
  key: string
  value: string
}

interface ApiCallFormData {
  name: string
  description: string
  url: string
  method: string
  headers: KeyValuePair[]
  queryParams: KeyValuePair[]
  timeout: string
}

interface ExecuteFunctionFormData {
  name: string
  description: string
  functionName: string
  params: KeyValuePair[]
  timeout: string
  waitForResult: boolean
}

const predefinedUseCases: Record<string, ApiCallFormData> = {
  fetchUserDetails: {
    name: "Fetch User Details",
    description: "Get user details by ID",
    url: "/api/users",
    method: "GET",
    headers: [{ key: "Authorization", value: "Bearer token" }],
    queryParams: [{ key: "userId", value: "123" }],
    timeout: "3000"
  },
  getOtp: {
    name: "Get OTP",
    description: "Send OTP to user's phone",
    url: "/api/send-otp",
    method: "POST",
    headers: [{ key: "Content-Type", value: "application/json" }],
    queryParams: [],
    timeout: "5000"
  }
}

interface ApiCallFormDialogProps {
  open: boolean
  onClose: () => void
  useCase?: keyof typeof predefinedUseCases | null
  onSave?: (functionName: string) => void
}

export function ApiCallFormDialog({ open, onClose, useCase = null, onSave }: ApiCallFormDialogProps) {
  const [formData, setFormData] = useState<ApiCallFormData>({
    name: "",
    description: "",
    url: "",
    method: "GET",
    headers: [{ key: "", value: "" }],
    queryParams: [{ key: "", value: "" }],
    timeout: ""
  })

  useEffect(() => {
    if (useCase && predefinedUseCases[useCase]) {
      setFormData(predefinedUseCases[useCase])
    }
  }, [useCase])

  const updateArrayField = (field: keyof ApiCallFormData, index: number, key: keyof KeyValuePair, value: string) => {
    const updated = [...(formData[field] as KeyValuePair[])]
    updated[index][key] = value
    setFormData({ ...formData, [field]: updated })
  }

  const addKeyValueField = (field: keyof ApiCallFormData) => {
    setFormData({ ...formData, [field]: [...(formData[field] as KeyValuePair[]), { key: "", value: "" }] })
  }

  const handleSave = () => {
    if (onSave && formData.name) {
      onSave(formData.name)
    } else {
      console.log(formData)
    }
  }

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[600px] overflow-y-auto max-h-[80vh] flex flex-col gap-6">
        <DialogHeader>
          <DialogTitle>Function</DialogTitle>
        </DialogHeader>
        <div className="flex flex-col gap-2">
          <Label>Name</Label>
          <Input value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} />
        </div>
        <div className="flex flex-col gap-2">
          <Label>Description (Optional)</Label>
          <Textarea value={formData.description} onChange={(e) => setFormData({ ...formData, description: e.target.value })} />
        </div>
        <div className="flex flex-col gap-2">
          <Label>API URL</Label>
          <Input value={formData.url} onChange={(e) => setFormData({ ...formData, url: e.target.value })} />
        </div>
        <div className="flex flex-col gap-2">
          <Label>Method</Label>
          <select className="border rounded px-2 py-1" value={formData.method} onChange={(e) => setFormData({ ...formData, method: e.target.value })}>
          <option>GET</option>
          <option>POST</option>
            <option>PUT</option>
            <option>DELETE</option>
          </select>
        </div>
        <div className="flex flex-col gap-2">
        <Label>Headers (Optional)</Label>
        {formData.headers.map((pair, i) => (
          <div key={i} className="flex gap-2 mb-1">
            <Input placeholder="Key" value={pair.key} onChange={(e) => updateArrayField("headers", i, "key", e.target.value)} />
            <Input placeholder="Value" value={pair.value} onChange={(e) => updateArrayField("headers", i, "value", e.target.value)} />
            </div>
          ))}
          <Button variant="outline" size="sm" onClick={() => addKeyValueField("headers")}>+ Add Header</Button>
        </div>
        <div className="flex flex-col gap-2">
        <Label>Query Params (Optional)</Label>
        {formData.queryParams.map((pair, i) => (
          <div key={i} className="flex gap-2 mb-1">
            <Input placeholder="Key" value={pair.key} onChange={(e) => updateArrayField("queryParams", i, "key", e.target.value)} />
            <Input placeholder="Value" value={pair.value} onChange={(e) => updateArrayField("queryParams", i, "value", e.target.value)} />
            </div>
          ))}
          <Button variant="outline" size="sm" onClick={() => addKeyValueField("queryParams")}>+ Add Param</Button>
        </div>
        <div className="flex flex-col gap-2">
        <Label>Timeout (ms) (Optional)</Label>
        <Input value={formData.timeout} type="number" onChange={(e) => setFormData({ ...formData, timeout: e.target.value })} />
        </div>
        <DialogFooter>
          <Button onClick={handleSave} className="bg-primary-300 hover:bg-primary-300 hover:cursor-pointer">Save</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

interface ExecuteFunctionFormDialogProps {
  open: boolean
  onClose: () => void
}

export function ExecuteFunctionFormDialog({ open, onClose }: ExecuteFunctionFormDialogProps) {
  const [formData, setFormData] = useState<ExecuteFunctionFormData>({
    name: "",
    description: "",
    functionName: "",
    params: [{ key: "", value: "" }],
    timeout: "",
    waitForResult: false
  })

  const updateParam = (index: number, key: keyof KeyValuePair, value: string) => {
    const updated = [...formData.params]
    updated[index][key] = value
    setFormData({ ...formData, params: updated })
  }

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[600px] overflow-y-auto max-h-[80vh]">
        <DialogHeader>
          <DialogTitle>Execute Function</DialogTitle>
        </DialogHeader>

        <Label>Name</Label>
        <Input value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} />

        <Label>Description (Optional)</Label>
        <Textarea value={formData.description} onChange={(e) => setFormData({ ...formData, description: e.target.value })} />

        <Label>Function Name</Label>
        <Input value={formData.functionName} onChange={(e) => setFormData({ ...formData, functionName: e.target.value })} />

        <Label>Parameters</Label>
        {formData.params.map((pair, i) => (
          <div key={i} className="flex gap-2 mb-1">
            <Input placeholder="Key" value={pair.key} onChange={(e) => updateParam(i, "key", e.target.value)} />
            <Input placeholder="Value" value={pair.value} onChange={(e) => updateParam(i, "value", e.target.value)} />
          </div>
        ))}
        <Button variant="outline" size="sm" onClick={() => setFormData({ ...formData, params: [...formData.params, { key: "", value: "" }] })}>+ Add Param</Button>

        <Label>Timeout (ms) (Optional)</Label>
        <Input type="number" value={formData.timeout} onChange={(e) => setFormData({ ...formData, timeout: e.target.value })} />

        <div className="flex items-center gap-2 mt-2">
          <input type="checkbox" checked={formData.waitForResult} onChange={(e) => setFormData({ ...formData, waitForResult: e.target.checked })} />
          <Label>Wait for Result</Label>
        </div>

        <DialogFooter>
          <Button onClick={() => console.log(formData)}>Save</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
