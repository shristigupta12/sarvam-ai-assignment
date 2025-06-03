import { NodeType } from "../interfaces/main";
import { JSX } from "react";
import { Binary, Cog, Headset, Square, Hash } from "lucide-react";

export const NodeBackgroundColors: Record<NodeType, string> = {
    "conversationNode": "bg-primary-100",
    "functionNode": "bg-red-50",
    "callTransferNode": "bg-purple-50",
    "pressDigitNode": "bg-lime-50",
    "endCallNode": "bg-sky-50"
}

export const NodeTextColors: Record<NodeType, string> = {
    "conversationNode": "text-primary-300",
    "functionNode": "text-red-600",
    "callTransferNode": "text-purple-600",
    "pressDigitNode": "text-lime-600",
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
