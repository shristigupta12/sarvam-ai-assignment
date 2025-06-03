const generateUniqueId = () => {
    return `node_${Date.now()}`;
}

export { generateUniqueId };