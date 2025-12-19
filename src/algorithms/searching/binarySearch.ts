import type { Algorithm, Step } from '../../core/types';

export const binarySearch: Algorithm = {
    name: 'Binary Search',
    category: 'Searching',
    description: 'Search a sorted array by repeatedly dividing the search interval in half.',
    complexity: {
        time: 'O(log n)',
        space: 'O(1)'
    },
    code: `function binarySearch(arr, target) {
  let left = 0;
  let right = arr.length - 1;

  while (left <= right) {
    const mid = Math.floor((left + right) / 2);
    if (arr[mid] === target) return mid;
    if (arr[mid] < target) left = mid + 1;
    else right = mid - 1;
  }
  return -1;
}`,
    run: (input: any) => {
        const array = input as number[];
        const steps: Step[] = [];
        // Binary Search requires sorted array
        const arr = [...array].sort((a, b) => a - b);
        const target = arr[Math.floor(arr.length / 2)]; // Pick a target that exists for demo

        steps.push({
            type: 'variable',
            indices: [],
            description: `Sorted array for Binary Search. Target: ${target}`,
            lineNumber: 1,
            arrayState: [...arr] // Show sorted state
        });

        let left = 0;
        let right = arr.length - 1;

        while (left <= right) {
            const mid = Math.floor((left + right) / 2);

            steps.push({
                type: 'highlight',
                indices: [left, right, mid], // Highlight range and mid
                description: `Checking range [${left}, ${right}]. Mid: ${mid} (${arr[mid]})`,
                lineNumber: 6,
                arrayState: [...arr]
            });

            if (arr[mid] === target) {
                steps.push({
                    type: 'highlight',
                    indices: [mid],
                    description: `Found target ${target} at index ${mid}!`,
                    lineNumber: 7,
                    arrayState: [...arr]
                });
                return { steps, sortedArray: arr };
            }

            if (arr[mid] < target) {
                steps.push({
                    type: 'comparison',
                    indices: [mid],
                    description: `${arr[mid]} < ${target}, searching right half`,
                    lineNumber: 8,
                    arrayState: [...arr]
                });
                left = mid + 1;
            } else {
                steps.push({
                    type: 'comparison',
                    indices: [mid],
                    description: `${arr[mid]} > ${target}, searching left half`,
                    lineNumber: 9,
                    arrayState: [...arr]
                });
                right = mid - 1;
            }
        }

        return { steps, sortedArray: arr };
    }
};
