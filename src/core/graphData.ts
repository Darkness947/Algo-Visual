export interface GraphNode {
    id: number;
    x: number;
    y: number;
    label: string;
}

export interface GraphEdge {
    source: number;
    target: number;
    weight: number;
}

export const NODES: GraphNode[] = [
    { id: 0, x: 250, y: 50, label: '0' },
    { id: 1, x: 150, y: 150, label: '1' },
    { id: 2, x: 350, y: 150, label: '2' },
    { id: 3, x: 50, y: 250, label: '3' },
    { id: 4, x: 200, y: 250, label: '4' },
    { id: 5, x: 300, y: 250, label: '5' },
    { id: 6, x: 450, y: 250, label: '6' },
];

export const EDGES: GraphEdge[] = [
    { source: 0, target: 1, weight: 4 },
    { source: 0, target: 2, weight: 2 },
    { source: 1, target: 3, weight: 5 },
    { source: 1, target: 4, weight: 1 },
    { source: 2, target: 5, weight: 3 },
    { source: 2, target: 6, weight: 8 },
    { source: 4, target: 5, weight: 2 }, // Cross edge
];

export const ADJ_LIST: Record<number, { node: number, weight: number }[]> = {};

// Initialize Adjacency List
NODES.forEach(node => {
    ADJ_LIST[node.id] = [];
});

EDGES.forEach(edge => {
    ADJ_LIST[edge.source].push({ node: edge.target, weight: edge.weight });
    // For undirected graph, uncomment below:
    // ADJ_LIST[edge.target].push({ node: edge.source, weight: edge.weight });
});
