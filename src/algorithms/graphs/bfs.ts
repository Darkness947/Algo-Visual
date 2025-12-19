import type { Algorithm, Step } from '../../core/types';
import { ADJ_LIST } from '../../core/graphData';

export const bfs: Algorithm = {
    name: 'Breadth-First Search',
    category: 'Graph',
    description: 'Explores the neighbor nodes first, before moving to the next level neighbors.',
    complexity: {
        time: 'O(V + E)',
        space: 'O(V)'
    },
    code: `function bfs(startNode) {
  const queue = [startNode];
  const visited = new Set();
  visited.add(startNode);

  while (queue.length > 0) {
    const node = queue.shift();
    // Process node...
    
    for (const neighbor of graph[node]) {
      if (!visited.has(neighbor)) {
        visited.add(neighbor);
        queue.push(neighbor);
      }
    }
  }
}`,
    run: () => {
        // Input is ignored for this fixed graph demo
        const steps: Step[] = [];
        const startNode = 0;
        const queue = [startNode];
        const visited = new Set<number>();
        visited.add(startNode);

        steps.push({
            type: 'highlight',
            indices: [startNode],
            description: `Starting BFS from node ${startNode}`,
            lineNumber: 2,
            variables: { queue: [...queue] }
        });

        while (queue.length > 0) {
            const node = queue.shift()!;

            steps.push({
                type: 'highlight',
                indices: [node],
                description: `Processing node ${node}`,
                lineNumber: 7,
                variables: { queue: [...queue] }
            });

            const neighbors = ADJ_LIST[node] || [];
            for (const { node: neighborNode } of neighbors) {
                steps.push({
                    type: 'comparison',
                    indices: [neighborNode],
                    description: `Checking neighbor ${neighborNode}`,
                    lineNumber: 10,
                    variables: { queue: [...queue] }
                });

                if (!visited.has(neighborNode)) {
                    visited.add(neighborNode);
                    queue.push(neighborNode);

                    steps.push({
                        type: 'highlight', // Or a new type 'visit'
                        indices: [neighborNode],
                        description: `Visited ${neighborNode} and added to queue`,
                        lineNumber: 12,
                        variables: { queue: [...queue] }
                    });
                }
            }

            // Mark as fully processed (optional visual state)
            steps.push({
                type: 'highlight',
                indices: [node],
                description: `Finished processing ${node}`,
                lineNumber: 8,
                variables: { queue: [...queue] }
            });
        }

        return { steps, sortedArray: [] };
    }
};
