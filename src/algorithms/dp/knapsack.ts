import type { Algorithm, Step } from '../../core/types';

export const knapsack: Algorithm = {
    name: '0/1 Knapsack',
    category: 'DP',
    description: 'Maximizes total value of items in a knapsack of capacity W.',
    complexity: {
        time: 'O(N * W)',
        space: 'O(N * W)'
    },
    code: `function knapsack(capacity, weights, values, n) {
  const dp = Array(n + 1).fill().map(() => Array(capacity + 1).fill(0));

  for (let i = 1; i <= n; i++) {
    for (let w = 1; w <= capacity; w++) {
      if (weights[i - 1] <= w) {
        dp[i][w] = Math.max(
          values[i - 1] + dp[i - 1][w - weights[i - 1]],
          dp[i - 1][w]
        );
      } else {
        dp[i][w] = dp[i - 1][w];
      }
    }
  }
  return dp[n][capacity];
}`,
    run: (input: any) => {
        const { items, capacity } = input as { items: { id: number, weight: number, value: number }[], capacity: number };
        const steps: Step[] = [];
        const n = items.length;

        // Initialize table
        const table = Array(n + 1).fill(0).map(() => Array(capacity + 1).fill(0));

        steps.push({
            type: 'variable',
            indices: [],
            description: 'Initializing DP table',
            lineNumber: 2,
            variables: { table: JSON.parse(JSON.stringify(table)), items, capacity }
        });

        // Fill table
        for (let i = 1; i <= n; i++) {
            const item = items[i - 1];
            for (let w = 1; w <= capacity; w++) {

                steps.push({
                    type: 'comparison',
                    indices: [],
                    description: `Item ${item.id} (W:${item.weight}, V:${item.value}) at Capacity ${w}`,
                    lineNumber: 5,
                    variables: { table: JSON.parse(JSON.stringify(table)), i, w, items, capacity }
                });

                if (item.weight <= w) {
                    const includeVal = item.value + table[i - 1][w - item.weight];
                    const excludeVal = table[i - 1][w];
                    table[i][w] = Math.max(includeVal, excludeVal);

                    steps.push({
                        type: 'overwrite',
                        indices: [],
                        description: `Max(Include: ${includeVal}, Exclude: ${excludeVal}) = ${table[i][w]}`,
                        lineNumber: 7,
                        variables: { table: JSON.parse(JSON.stringify(table)), i, w, items, capacity }
                    });
                } else {
                    table[i][w] = table[i - 1][w];
                    steps.push({
                        type: 'overwrite',
                        indices: [],
                        description: `Too heavy. Exclude: ${table[i][w]}`,
                        lineNumber: 11,
                        variables: { table: JSON.parse(JSON.stringify(table)), i, w, items, capacity }
                    });
                }
            }
        }

        // Backtrack
        let i = n;
        let w = capacity;
        const path: [number, number][] = [];
        const chosenItems: number[] = [];

        while (i > 0 && w > 0) {
            path.push([i, w]);
            steps.push({
                type: 'highlight',
                indices: [],
                description: `Backtracking at Item ${i}, Capacity ${w}`,
                lineNumber: 15,
                variables: { table: JSON.parse(JSON.stringify(table)), i, w, path: [...path], items, capacity }
            });

            if (table[i][w] !== table[i - 1][w]) {
                chosenItems.push(items[i - 1].id);
                w -= items[i - 1].weight;
                i--;
            } else {
                i--;
            }
        }
        path.push([i, w]);

        steps.push({
            type: 'highlight',
            indices: [],
            description: `Chosen Items: ${chosenItems.reverse().join(', ')}`,
            lineNumber: 16,
            variables: { table: JSON.parse(JSON.stringify(table)), path: [...path], chosenItems, items, capacity }
        });

        return { steps };
    }
};
