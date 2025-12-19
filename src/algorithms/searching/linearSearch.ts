import type { Algorithm, Step } from '../../core/types';

export const linearSearch: Algorithm = {
    name: 'Linear Search',
    category: 'Searching',
    description: 'Sequentially checks each element of the list until a match is found or the whole list has been searched.',
    complexity: {
        time: 'O(n)',
        space: 'O(1)'
    },
    code: `function linearSearch(arr, target) {
  for (let i = 0; i < arr.length; i++) {
    if (arr[i] === target) {
      return i;
    }
  }
  return -1;
}`,
    run: (input: any) => {
        const array = input as number[];
        const steps: Step[] = [];
        const arr = [...array];
        const target = 42; // Fixed target for now, or pick random

        steps.push({
            type: 'variable',
            indices: [],
            description: `Searching for target: ${target}`,
            lineNumber: 1
        });

        for (let i = 0; i < arr.length; i++) {
            steps.push({
                type: 'comparison',
                indices: [i],
                description: `Checking index ${i}: Is ${arr[i]} === ${target}?`,
                lineNumber: 3
            });

            if (arr[i] === target) {
                steps.push({
                    type: 'highlight',
                    indices: [i],
                    description: `Found target ${target} at index ${i}!`,
                    lineNumber: 4
                });
                return { steps, sortedArray: arr };
            }
        }

        steps.push({
            type: 'highlight',
            indices: [],
            description: `Target ${target} not found in array.`,
            lineNumber: 7
        });

        return { steps, sortedArray: arr };
    }
};
