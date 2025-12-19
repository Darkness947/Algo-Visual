import type { Algorithm, Step } from '../../core/types';
import { ADJ_LIST, NODES } from '../../core/graphData';

export const dijkstra: Algorithm = {
    name: "Dijkstra's Algorithm",
    category: 'Graph',
    description: 'Finds the shortest path from a source node to all other nodes in a weighted graph.',
    complexity: {
        time: 'O((V + E) log V)',
        space: 'O(V)'
    },
    code: `function dijkstra(startNode) {
  const distances = {};
  const pq = new PriorityQueue();

  // Initialize
  for (const node of nodes) {
    distances[node] = Infinity;
  }
  distances[startNode] = 0;
  pq.enqueue(startNode, 0);

  while (!pq.isEmpty()) {
    const { node, priority } = pq.dequeue();

    if (priority > distances[node]) continue;

    for (const neighbor of graph[node]) {
      const newDist = distances[node] + neighbor.weight;
      if (newDist < distances[neighbor.node]) {
        distances[neighbor.node] = newDist;
        pq.enqueue(neighbor.node, newDist);
      }
    }
  }
}`,
    run: () => {
        const steps: Step[] = [];
        const startNode = 0;
        const distances: Record<number, number> = {};
        const visited = new Set<number>();

        // Initialize distances
        NODES.forEach(node => {
            distances[node.id] = Infinity;
        });
        distances[startNode] = 0;

        // Simple PQ simulation using array
        // In real app, use a proper MinHeap
        const pq: { node: number, dist: number }[] = [{ node: startNode, dist: 0 }];

        steps.push({
            type: 'highlight',
            indices: [startNode],
            description: `Initialize distances. Start node ${startNode} is 0, others Infinity.`,
            lineNumber: 9,
            variables: { distances: { ...distances }, queue: pq.map(i => i.node) }
        });

        while (pq.length > 0) {
            // Sort to simulate Priority Queue (pop min)
            pq.sort((a, b) => a.dist - b.dist);
            const { node, dist } = pq.shift()!;

            if (visited.has(node)) continue;
            visited.add(node);

            steps.push({
                type: 'highlight',
                indices: [node],
                description: `Processing node ${node} with distance ${dist}`,
                lineNumber: 13,
                variables: { distances: { ...distances }, queue: pq.map(i => i.node) }
            });

            const neighbors = ADJ_LIST[node] || [];
            for (const { node: neighborNode, weight } of neighbors) {
                steps.push({
                    type: 'comparison',
                    indices: [neighborNode],
                    description: `Checking neighbor ${neighborNode} (weight ${weight})`,
                    lineNumber: 17,
                    variables: { distances: { ...distances }, queue: pq.map(i => i.node) }
                });

                const newDist = dist + weight;
                if (newDist < distances[neighborNode]) {
                    distances[neighborNode] = newDist;
                    pq.push({ node: neighborNode, dist: newDist });

                    steps.push({
                        type: 'overwrite', // Using overwrite to signify update
                        indices: [neighborNode],
                        description: `Updated distance for ${neighborNode} to ${newDist}`,
                        lineNumber: 20,
                        variables: { distances: { ...distances }, queue: pq.map(i => i.node) }
                    });
                }
            }
        }

        return { steps, sortedArray: [] };
    }
};
