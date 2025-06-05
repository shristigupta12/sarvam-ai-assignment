import { NodeType } from "../interfaces/main";
import { Binary, Cog, Headset, Square, Hash, Play } from "lucide-react";

export const NodeBackgroundColors: Record<NodeType, string> = {
    "conversationNode": "bg-indigo-50",
    "functionNode": "bg-rose-50",
    "callTransferNode": "bg-fuchsia-50",
    "pressDigitNode": "bg-emerald-50",
    "endCallNode": "bg-sky-50",
    "beginNode": "bg-green-50"
}

export const NodeBorderColors: Record<NodeType, string> = {
    "conversationNode": "border-indigo-300",
    "functionNode": "border-rose-300",
    "callTransferNode": "border-fuchsia-300",
    "pressDigitNode": "border-emerald-300",
    "endCallNode": "border-sky-300",
    "beginNode": "border-green-300"
}

export const NodeTextColors: Record<NodeType, string> = {
    "conversationNode": "text-indigo-500",
    "functionNode": "text-rose-500",
    "callTransferNode": "text-fuchsia-500",
    "pressDigitNode": "text-emerald-500",
    "endCallNode": "text-sky-500",
    "beginNode": "text-green-500"
}

export const NodeIcons = (nodeType: NodeType, size: number = 4) => {
    switch(nodeType){
        case "conversationNode":
            return <Hash className={`size-${size} ${NodeTextColors["conversationNode"]}`} />
        case "functionNode":
            return <Cog className={`size-${size} ${NodeTextColors["functionNode"]}`} />
        case "callTransferNode":
            return <Headset className={`size-${size} ${NodeTextColors["callTransferNode"]}`} />
        case "pressDigitNode":
            return <Binary className={`size-${size} ${NodeTextColors["pressDigitNode"]}`} />
        case "endCallNode":
            return <Square className={`size-${size} ${NodeTextColors["endCallNode"]}`} />
        case "beginNode":
            return <Play className={`size-${size} ${NodeTextColors["beginNode"]}`} />
    }
    return <></>
}
