const generateUniqueNodeId = () => {
    return `node_${Date.now()}`;
}

const generateUniqueEdgeId = () => {
    return `edge_${Date.now()}`;
}

export { generateUniqueNodeId, generateUniqueEdgeId };