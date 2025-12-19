import type { Algorithm, Step } from '../../core/types';

export const bubbleSort: Algorithm = {
    name: 'Bubble Sort',
    category: 'Sorting',
    description: 'A simple sorting algorithm that repeatedly steps through the list, compares adjacent elements and swaps them if they are in the wrong order.',
    complexity: {
        time: 'O(n²)',
        space: 'O(1)'
    },
    code: `function bubbleSort(arr) {
  const n = arr.length;
  for (let i = 0; i < n - 1; i++) {
    for (let j = 0; j < n - i - 1; j++) {
      if (arr[j] > arr[j + 1]) {
        // Swap
        [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
      }
    }
  }
  return arr;
}`,
    run: (input: any) => {
        const array = input as number[];
        const steps: Step[] = [];
        const arr = [...array];
        const n = arr.length;

        for (let i = 0; i < n - 1; i++) {
            for (let j = 0; j < n - i - 1; j++) {
                // Comparison Step
                steps.push({
                    type: 'comparison',
                    indices: [j, j + 1],
                    description: `Comparing ${arr[j]} and ${arr[j + 1]}`,
                    lineNumber: 4
                });

                if (arr[j] > arr[j + 1]) {
                    // Swap Step
                    steps.push({
                        type: 'swap',
                        indices: [j, j + 1],
                        values: [arr[j + 1], arr[j]], // New values at these indices
                        description: `Swapping ${arr[j]} and ${arr[j + 1]}`,
                        lineNumber: 6
                    });

                    [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
                }
            }
            // Element at n-i-1 is sorted
            steps.push({
                type: 'highlight',
                indices: [n - i - 1],
                description: `${arr[n - i - 1]} is now in its sorted position`,
                lineNumber: 2
            });
        }
        // First element is also sorted
        steps.push({
            type: 'highlight',
            indices: [0],
            description: 'Array is sorted',
            lineNumber: 10
        });

        return { steps, sortedArray: arr };
    }
};
