export type NodeType = 'conversationNode' | 'functionNode' | 'callTransferNode' | 'pressDigitNode' | 'endCallNode';

export type NodeTypeData = {
    [key in NodeType]: {
        prompt: string;
    };
};
