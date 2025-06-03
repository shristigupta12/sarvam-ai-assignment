
import { NodeType } from "@/modules/interfaces/main";
import { Binary, Cog, Hash, Headset, Square } from "lucide-react";
import { NodeIcons, NodeTextColors } from "@/modules/constants/node-data";

export const SidebarComponentData = [
    {
      nodeType: "conversationNode" as NodeType,
      prompt: "New conversation",
      children: NodeIcons("conversationNode", 4),
      name: "Conversation"
    },
    {
      nodeType: "functionNode" as NodeType,
      prompt: "New Function",
      children: NodeIcons("functionNode", 4),
      name: "Function"
    },
    {
      nodeType: "callTransferNode" as NodeType,
      prompt: "New call transfer",
      children: NodeIcons("callTransferNode", 4),
      name: "Call Transfer"
    },
    {
      nodeType: "pressDigitNode" as NodeType,
      prompt: "New press digit",
      children: NodeIcons("pressDigitNode", 4),
      name: "Press Digit"
    },
    {
      nodeType: "endCallNode" as NodeType,
      prompt: "New end call",
      children: NodeIcons("endCallNode", 4),
      name: "End Call"
    }
  ]