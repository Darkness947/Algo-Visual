import type { Algorithm, Step } from '../../core/types';

export const mergeSort: Algorithm = {
    name: 'Merge Sort',
    category: 'Sorting',
    description: 'A divide and conquer algorithm that divides the input array into two halves, calls itself for the two halves, and then merges the two sorted halves.',
    complexity: {
        time: 'O(n log n)',
        space: 'O(n)'
    },
    code: `function mergeSort(arr) {
  if (arr.length <= 1) return arr;

  const mid = Math.floor(arr.length / 2);
  const left = mergeSort(arr.slice(0, mid));
  const right = mergeSort(arr.slice(mid));

  return merge(left, right);
}

function merge(left, right) {
  let result = [];
  let i = 0;
  let j = 0;

  while (i < left.length && j < right.length) {
    if (left[i] < right[j]) {
      result.push(left[i]);
      i++;
    } else {
      result.push(right[j]);
      j++;
    }
  }

  return result.concat(left.slice(i)).concat(right.slice(j));
}`,
    run: (input: any) => {
        const array = input as number[];
        const steps: Step[] = [];
        const arr = [...array];

        const merge = (start: number, mid: number, end: number) => {
            const left = arr.slice(start, mid + 1);
            const right = arr.slice(mid + 1, end + 1);
            let i = 0, j = 0, k = start;

            while (i < left.length && j < right.length) {
                steps.push({
                    type: 'comparison',
                    indices: [start + i, mid + 1 + j],
                    description: `Comparing ${left[i]} and ${right[j]}`,
                    lineNumber: 16
                });

                if (left[i] <= right[j]) {
                    steps.push({
                        type: 'overwrite',
                        indices: [k],
                        values: [left[i]],
                        description: `Placing ${left[i]} at index ${k}`,
                        lineNumber: 17
                    });
                    arr[k++] = left[i++];
                } else {
                    steps.push({
                        type: 'overwrite',
                        indices: [k],
                        values: [right[j]],
                        description: `Placing ${right[j]} at index ${k}`,
                        lineNumber: 20
                    });
                    arr[k++] = right[j++];
                }
            }

            while (i < left.length) {
                steps.push({
                    type: 'overwrite',
                    indices: [k],
                    values: [left[i]],
                    description: `Placing remaining ${left[i]} at index ${k}`,
                    lineNumber: 25
                });
                arr[k++] = left[i++];
            }

            while (j < right.length) {
                steps.push({
                    type: 'overwrite',
                    indices: [k],
                    values: [right[j]],
                    description: `Placing remaining ${right[j]} at index ${k}`,
                    lineNumber: 25
                });
                arr[k++] = right[j++];
            }
        };

        const mergeSortHelper = (start: number, end: number) => {
            if (start < end) {
                const mid = Math.floor((start + end) / 2);

                steps.push({
                    type: 'highlight',
                    indices: Array.from({ length: mid - start + 1 }, (_, i) => start + i),
                    description: `Dividing: Left [${start}-${mid}]`,
                    lineNumber: 14
                });
                mergeSortHelper(start, mid);

                steps.push({
                    type: 'highlight',
                    indices: Array.from({ length: end - mid }, (_, i) => mid + 1 + i),
                    description: `Dividing: Right [${mid + 1}-${end}]`,
                    lineNumber: 15
                });
                mergeSortHelper(mid + 1, end);

                merge(start, mid, end);
            }
        };

        mergeSortHelper(0, arr.length - 1);

        steps.push({
            type: 'highlight',
            indices: Array.from({ length: arr.length }, (_, i) => i),
            description: 'Array is sorted',
            lineNumber: 30
        });

        return { steps, sortedArray: arr };
    }
};
