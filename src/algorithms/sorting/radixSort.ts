import type { Algorithm, Step } from '../../core/types';

export const radixSort: Algorithm = {
    name: 'Radix Sort',
    category: 'Sorting',
    description: 'Sorts numbers by processing individual digits. LSD (Least Significant Digit) version.',
    complexity: {
        time: 'O(nk)',
        space: 'O(n + k)'
    },
    code: `function radixSort(arr) {
  const max = Math.max(...arr);

  for (let exp = 1; Math.floor(max / exp) > 0; exp *= 10) {
    countingSortByDigit(arr, exp);
  }
}

function countingSortByDigit(arr, exp) {
  const output = new Array(arr.length).fill(0);
  const count = new Array(10).fill(0);

  // Store count of occurrences in count[]
  for (let i = 0; i < arr.length; i++) {
    const digit = Math.floor(arr[i] / exp) % 10;
    count[digit]++;
  }

  // Change count[i] so that count[i] now contains
  // actual position of this digit in output[]
  for (let i = 1; i < 10; i++) {
    count[i] += count[i - 1];
  }

  // Build the output array
  for (let i = arr.length - 1; i >= 0; i--) {
    const digit = Math.floor(arr[i] / exp) % 10;
    output[count[digit] - 1] = arr[i];
    count[digit]--;
  }

  // Copy the output array to arr[], so that arr[] now
  // contains sorted numbers according to current digit
  for (let i = 0; i < arr.length; i++) {
    arr[i] = output[i];
  }
}`,
    run: (input: any) => {
        const array = input as number[];
        const steps: Step[] = [];
        const arr = [...array];
        const max = Math.max(...arr, 0);


        for (let exp = 1; Math.floor(max / exp) > 0; exp *= 10) {
            steps.push({
                type: 'variable',
                indices: [],
                description: `Sorting by digit place: ${exp}`,
                lineNumber: 4,
                variables: { currentDigit: exp, buckets: Array.from({ length: 10 }, () => []) }
            });

            const output = new Array(arr.length).fill(0);
            const count = new Array(10).fill(0);

            // Visualization: Distribution into buckets
            // We'll simulate the bucket filling for visualization purposes
            const currentBuckets: number[][] = Array.from({ length: 10 }, () => []);

            for (let i = 0; i < arr.length; i++) {
                const digit = Math.floor(arr[i] / exp) % 10;
                count[digit]++;
                currentBuckets[digit].push(arr[i]);

                steps.push({
                    type: 'highlight',
                    indices: [i],
                    description: `Moving ${arr[i]} to bucket ${digit}`,
                    lineNumber: 15,
                    variables: { currentDigit: exp, buckets: JSON.parse(JSON.stringify(currentBuckets)) }
                });
            }

            for (let i = 1; i < 10; i++) {
                count[i] += count[i - 1];
            }

            for (let i = arr.length - 1; i >= 0; i--) {
                const digit = Math.floor(arr[i] / exp) % 10;
                output[count[digit] - 1] = arr[i];
                count[digit]--;
            }

            for (let i = 0; i < arr.length; i++) {
                arr[i] = output[i];
                steps.push({
                    type: 'overwrite',
                    indices: [i],
                    arrayState: [...arr],
                    description: `Collecting ${arr[i]} back from buckets`,
                    lineNumber: 43,
                    variables: { currentDigit: exp, buckets: JSON.parse(JSON.stringify(currentBuckets)) } // Keep buckets visible while collecting? Or clear them?
                    // Let's keep them visible but maybe highlight the one being taken? 
                    // For simplicity, just show the buckets state.
                });
            }
        }

        return { steps, sortedArray: arr };
    }
};
