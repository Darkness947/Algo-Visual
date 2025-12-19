import type { Algorithm, Step } from '../../core/types';
import { ADJ_LIST } from '../../core/graphData';

export const dfs: Algorithm = {
    name: 'Depth-First Search',
    category: 'Graph',
    description: 'Explores as far as possible along each branch before backtracking.',
    complexity: {
        time: 'O(V + E)',
        space: 'O(V)'
    },
    code: `function dfs(node, visited) {
  visited.add(node);
  // Process node...
  
  for (const neighbor of graph[node]) {
    if (!visited.has(neighbor)) {
      dfs(neighbor, visited);
    }
  }
}`,
    run: () => {
        const steps: Step[] = [];
        const visited = new Set<number>();
        const stack: number[] = []; // To visualize the recursion stack

        const traverse = (node: number) => {
            visited.add(node);
            stack.push(node);

            steps.push({
                type: 'highlight',
                indices: [node],
                description: `Visiting node ${node}`,
                lineNumber: 2,
                variables: { stack: [...stack] }
            });

            const neighbors = ADJ_LIST[node] || [];
            for (const { node: neighborNode } of neighbors) {
                steps.push({
                    type: 'comparison',
                    indices: [neighborNode],
                    description: `Checking neighbor ${neighborNode}`,
                    lineNumber: 5,
                    variables: { stack: [...stack] }
                });

                if (!visited.has(neighborNode)) {
                    traverse(neighborNode);
                    // After returning from recursion, we are back at 'node'
                    steps.push({
                        type: 'highlight',
                        indices: [node],
                        description: `Backtracked to node ${node}`,
                        lineNumber: 2,
                        variables: { stack: [...stack] }
                    });
                }
            }

            stack.pop();
            steps.push({
                type: 'highlight',
                indices: [],
                description: `Finished processing node ${node}`,
                lineNumber: 8,
                variables: { stack: [...stack] }
            });
        };

        traverse(0);

        return { steps, sortedArray: [] };
    }
};
