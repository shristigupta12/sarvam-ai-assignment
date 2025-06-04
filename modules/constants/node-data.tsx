import { NodeType } from "../interfaces/main";
import { Binary, Cog, Headset, Square, Hash } from "lucide-react";

export const NodeBackgroundColors: Record<NodeType, string> = {
    "conversationNode": "bg-indigo-50",
    "functionNode": "bg-rose-50",
    "callTransferNode": "bg-fuchsia-50",
    "pressDigitNode": "bg-emerald-50",
    "endCallNode": "bg-sky-50"
}

export const NodeTextColors: Record<NodeType, string> = {
    "conversationNode": "text-indigo-600",
    "functionNode": "text-rose-600",
    "callTransferNode": "text-fuchsia-600",
    "pressDigitNode": "text-emerald-600",
    "endCallNode": "text-sky-600"
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
    }
    return <></>
}
