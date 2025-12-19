import type { Algorithm, Step } from '../../core/types';

export const heapSort: Algorithm = {
  name: 'Heap Sort',
  category: 'Sorting',
  description: 'A comparison-based sorting algorithm that uses a binary heap data structure.',
  complexity: {
    time: 'O(n log n)',
    space: 'O(1)'
  },
  code: `function heapSort(arr) {
  const n = arr.length;

  // Build max heap
  for (let i = Math.floor(n / 2) - 1; i >= 0; i--) {
    heapify(arr, n, i);
  }

  // Extract elements from heap
  for (let i = n - 1; i > 0; i--) {
    [arr[0], arr[i]] = [arr[i], arr[0]];
    heapify(arr, i, 0);
  }
  return arr;
}

function heapify(arr, n, i) {
  let largest = i;
  const l = 2 * i + 1;
  const r = 2 * i + 2;

  if (l < n && arr[l] > arr[largest]) largest = l;
  if (r < n && arr[r] > arr[largest]) largest = r;

  if (largest !== i) {
    [arr[i], arr[largest]] = [arr[largest], arr[i]];
    heapify(arr, n, largest);
  }
}`,
  run: (input: any) => {
    const array = input as number[];
    const steps: Step[] = [];
    const arr = [...array];
    const n = arr.length;

    const heapify = (n: number, i: number) => {
      let largest = i;
      const l = 2 * i + 1;
      const r = 2 * i + 2;

      steps.push({
        type: 'comparison',
        indices: [i, l, r].filter(idx => idx < n),
        description: `Heapifying node ${i}. Checking children ${l < n ? l : ''} ${r < n ? r : ''}`,
        lineNumber: 17,
        arrayState: [...arr]
      });

      if (l < n && arr[l] > arr[largest]) {
        largest = l;
      }

      if (r < n && arr[r] > arr[largest]) {
        largest = r;
      }

      if (largest !== i) {
        steps.push({
          type: 'swap',
          indices: [i, largest],
          values: [arr[largest], arr[i]],
          description: `Swapping ${arr[i]} with larger child ${arr[largest]}`,
          lineNumber: 26,
          arrayState: [...arr]
        });

        [arr[i], arr[largest]] = [arr[largest], arr[i]];

        // State after swap
        steps.push({
          type: 'highlight',
          indices: [i, largest],
          description: 'Swapped',
          lineNumber: 26,
          arrayState: [...arr]
        });

        heapify(n, largest);
      }
    };

    // Build max heap
    for (let i = Math.floor(n / 2) - 1; i >= 0; i--) {
      heapify(n, i);
    }

    // Extract elements
    for (let i = n - 1; i > 0; i--) {
      steps.push({
        type: 'swap',
        indices: [0, i],
        values: [arr[i], arr[0]],
        description: `Moving max element ${arr[0]} to end (index ${i})`,
        lineNumber: 12,
        arrayState: [...arr]
      });

      [arr[0], arr[i]] = [arr[i], arr[0]];

      steps.push({
        type: 'highlight',
        indices: [i],
        description: `${arr[i]} is sorted`,
        lineNumber: 12,
        arrayState: [...arr]
      });

      heapify(i, 0);
    }

    steps.push({
      type: 'highlight',
      indices: Array.from({ length: n }, (_, i) => i),
      description: 'Array is sorted',
      lineNumber: 15,
      arrayState: [...arr]
    });

    return { steps, sortedArray: arr };
  }
};
