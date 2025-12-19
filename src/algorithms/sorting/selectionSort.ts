import type { Algorithm, Step } from '../../core/types';

export const selectionSort: Algorithm = {
    name: 'Selection Sort',
    category: 'Sorting',
    description: 'A simple sorting algorithm that repeatedly finds the minimum element from the unsorted part and puts it at the beginning.',
    complexity: {
        time: 'O(n²)',
        space: 'O(1)'
    },
    code: `function selectionSort(arr) {
  const n = arr.length;
  for (let i = 0; i < n - 1; i++) {
    let minIdx = i;
    for (let j = i + 1; j < n; j++) {
      if (arr[j] < arr[minIdx]) {
        minIdx = j;
      }
    }
    if (minIdx !== i) {
      [arr[i], arr[minIdx]] = [arr[minIdx], arr[i]];
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
            let minIdx = i;

            // Highlight current position being sorted
            steps.push({
                type: 'highlight',
                indices: [i],
                description: `Current position: ${i}. Assuming minimum is ${arr[i]}`,
                lineNumber: 4
            });

            for (let j = i + 1; j < n; j++) {
                // Comparison
                steps.push({
                    type: 'comparison',
                    indices: [j, minIdx],
                    description: `Comparing ${arr[j]} with current minimum ${arr[minIdx]}`,
                    lineNumber: 6
                });

                if (arr[j] < arr[minIdx]) {
                    minIdx = j;
                    steps.push({
                        type: 'highlight',
                        indices: [minIdx],
                        description: `New minimum found: ${arr[minIdx]}`,
                        lineNumber: 7
                    });
                }
            }

            if (minIdx !== i) {
                steps.push({
                    type: 'swap',
                    indices: [i, minIdx],
                    values: [arr[minIdx], arr[i]],
                    description: `Swapping ${arr[i]} with minimum ${arr[minIdx]}`,
                    lineNumber: 11
                });
                [arr[i], arr[minIdx]] = [arr[minIdx], arr[i]];
            }

            steps.push({
                type: 'highlight',
                indices: [i],
                description: `${arr[i]} is now sorted`,
                lineNumber: 1
            });
        }

        steps.push({
            type: 'highlight',
            indices: [n - 1],
            description: 'Array is sorted',
            lineNumber: 14
        });

        return { steps, sortedArray: arr };
    }
};
