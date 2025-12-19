import type { Algorithm, Step } from '../../core/types';

export const insertionSort: Algorithm = {
    name: 'Insertion Sort',
    category: 'Sorting',
    description: 'Builds the final sorted array one item at a time. It is much less efficient on large lists than more advanced algorithms such as quicksort, heapsort, or merge sort.',
    complexity: {
        time: 'O(n²)',
        space: 'O(1)'
    },
    code: `function insertionSort(arr) {
  const n = arr.length;
  for (let i = 1; i < n; i++) {
    let key = arr[i];
    let j = i - 1;
    while (j >= 0 && arr[j] > key) {
      arr[j + 1] = arr[j];
      j = j - 1;
    }
    arr[j + 1] = key;
  }
  return arr;
}`,
    run: (input: any) => {
        const array = input as number[];
        const steps: Step[] = [];
        const arr = [...array];
        const n = arr.length;

        for (let i = 1; i < n; i++) {
            let key = arr[i];
            let j = i - 1;

            steps.push({
                type: 'highlight',
                indices: [i],
                description: `Selected key ${key} at index ${i}`,
                lineNumber: 3
            });

            while (j >= 0 && arr[j] > key) {
                steps.push({
                    type: 'comparison',
                    indices: [j, i], // Visually compare with key (which was at i)
                    description: `Comparing ${arr[j]} > ${key}`,
                    lineNumber: 5
                });

                steps.push({
                    type: 'overwrite',
                    indices: [j + 1],
                    values: [arr[j]],
                    description: `Moving ${arr[j]} to index ${j + 1}`,
                    lineNumber: 6
                });

                arr[j + 1] = arr[j];
                j = j - 1;
            }

            // Final placement
            steps.push({
                type: 'overwrite',
                indices: [j + 1],
                values: [key],
                description: `Inserted key ${key} at index ${j + 1}`,
                lineNumber: 9
            });
            arr[j + 1] = key;
        }

        steps.push({
            type: 'highlight',
            indices: Array.from({ length: n }, (_, i) => i),
            description: 'Array is sorted',
            lineNumber: 12
        });

        return { steps, sortedArray: arr };
    }
};
