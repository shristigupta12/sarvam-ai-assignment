export type NodeType = 'conversationNode' | 'functionNode' | 'callTransferNode' | 'pressDigitNode' | 'endCallNode' | 'beginNode';

export type NodeTypeData = {
    [key in NodeType]: {
        prompt: string;
    };
};
