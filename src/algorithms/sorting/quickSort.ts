import type { Algorithm, Step } from '../../core/types';

export const quickSort: Algorithm = {
    name: 'Quick Sort',
    category: 'Sorting',
    description: 'A divide and conquer algorithm that picks an element as pivot and partitions the given array around the picked pivot.',
    complexity: {
        time: 'O(n log n)',
        space: 'O(log n)'
    },
    code: `function quickSort(arr, low, high) {
  if (low < high) {
    const pi = partition(arr, low, high);
    quickSort(arr, low, pi - 1);
    quickSort(arr, pi + 1, high);
  }
}

function partition(arr, low, high) {
  const pivot = arr[high];
  let i = low - 1;
  for (let j = low; j < high; j++) {
    if (arr[j] < pivot) {
      i++;
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
  }
  [arr[i + 1], arr[high]] = [arr[high], arr[i + 1]];
  return i + 1;
}`,
    run: (input: any) => {
        const array = input as number[];
        const steps: Step[] = [];
        const arr = [...array];

        const partition = (low: number, high: number): number => {
            const pivot = arr[high];
            let i = low - 1;

            steps.push({
                type: 'highlight',
                indices: [high],
                description: `Pivot chosen: ${pivot}`,
                lineNumber: 10
            });

            for (let j = low; j < high; j++) {
                steps.push({
                    type: 'comparison',
                    indices: [j, high],
                    description: `Comparing ${arr[j]} < ${pivot}`,
                    lineNumber: 13
                });

                if (arr[j] < pivot) {
                    i++;
                    steps.push({
                        type: 'swap',
                        indices: [i, j],
                        values: [arr[j], arr[i]],
                        description: `Swapping ${arr[i]} and ${arr[j]}`,
                        lineNumber: 15
                    });
                    [arr[i], arr[j]] = [arr[j], arr[i]];
                }
            }
            steps.push({
                type: 'swap',
                indices: [i + 1, high],
                values: [arr[high], arr[i + 1]],
                description: `Placing pivot ${pivot} at correct position ${i + 1}`,
                lineNumber: 18
            });
            [arr[i + 1], arr[high]] = [arr[high], arr[i + 1]];
            return i + 1;
        };

        const quickSortHelper = (low: number, high: number) => {
            if (low < high) {
                const pi = partition(low, high);
                quickSortHelper(low, pi - 1);
                quickSortHelper(pi + 1, high);
            }
        };

        quickSortHelper(0, arr.length - 1);

        steps.push({
            type: 'highlight',
            indices: Array.from({ length: arr.length }, (_, i) => i),
            description: 'Array is sorted',
            lineNumber: 20
        });

        return { steps, sortedArray: arr };
    }
};
