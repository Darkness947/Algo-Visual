import type { Algorithm, Step } from '../../core/types';

export const countingSort: Algorithm = {
    name: 'Counting Sort',
    category: 'Sorting',
    description: 'A non-comparison-based sorting algorithm that counts the occurrences of each element.',
    complexity: {
        time: 'O(n + k)',
        space: 'O(k)'
    },
    code: `function countingSort(arr) {
  const max = Math.max(...arr);
  const count = new Array(max + 1).fill(0);
  const output = new Array(arr.length).fill(0);

  // Count occurrences
  for (let i = 0; i < arr.length; i++) {
    count[arr[i]]++;
  }

  // Calculate cumulative counts
  for (let i = 1; i <= max; i++) {
    count[i] += count[i - 1];
  }

  // Build output array
  for (let i = arr.length - 1; i >= 0; i--) {
    output[count[arr[i]] - 1] = arr[i];
    count[arr[i]]--;
  }

  return output;
}`,
    run: (input: any) => {
        const array = input as number[];
        const steps: Step[] = [];
        const arr = [...array];
        const max = Math.max(...arr, 0); // Ensure max is at least 0
        const count = new Array(max + 1).fill(0);
        const output = new Array(arr.length).fill(0);

        // Initial State
        steps.push({
            type: 'variable',
            indices: [],
            description: 'Initializing Count Array and Output Array',
            lineNumber: 2,
            variables: { count: [...count], output: [...output] }
        });

        // Count occurrences
        for (let i = 0; i < arr.length; i++) {
            steps.push({
                type: 'highlight',
                indices: [i],
                description: `Counting occurrences of ${arr[i]}`,
                lineNumber: 6,
                variables: { count: [...count], output: [...output] }
            });

            count[arr[i]]++;

            steps.push({
                type: 'variable',
                indices: [i],
                description: `Incremented count for ${arr[i]} to ${count[arr[i]]}`,
                lineNumber: 7,
                variables: { count: [...count], output: [...output] }
            });
        }

        // Cumulative counts
        for (let i = 1; i <= max; i++) {
            steps.push({
                type: 'variable',
                indices: [],
                description: `Adding count[${i - 1}] to count[${i}]`,
                lineNumber: 12,
                variables: { count: [...count], output: [...output] }
            });

            count[i] += count[i - 1];

            steps.push({
                type: 'variable',
                indices: [],
                description: `Updated count[${i}] to ${count[i]}`,
                lineNumber: 12,
                variables: { count: [...count], output: [...output] }
            });
        }

        // Build output array
        for (let i = arr.length - 1; i >= 0; i--) {
            const val = arr[i];
            const indexInOutput = count[val] - 1;

            steps.push({
                type: 'highlight',
                indices: [i],
                description: `Placing ${val} at index ${indexInOutput} in Output Array`,
                lineNumber: 17,
                variables: { count: [...count], output: [...output] }
            });

            output[indexInOutput] = val;
            count[val]--;

            steps.push({
                type: 'overwrite',
                indices: [i], // Highlight source in original array
                description: `Placed ${val} and decremented count`,
                lineNumber: 18,
                variables: { count: [...count], output: [...output] }
            });
        }

        // Copy back to original array (optional for visualization, but good for completeness)
        for (let i = 0; i < arr.length; i++) {
            arr[i] = output[i];
            steps.push({
                type: 'overwrite',
                indices: [i],
                arrayState: [...arr],
                description: `Copying sorted value ${output[i]} back to original array`,
                lineNumber: 22,
                variables: { count: [...count], output: [...output] }
            });
        }

        return { steps, sortedArray: arr };
    }
};
