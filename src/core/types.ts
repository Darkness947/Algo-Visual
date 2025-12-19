export type StepType =
    | 'comparison'
    | 'swap'
    | 'overwrite'
    | 'highlight'
    | 'auxiliary' // For auxiliary arrays like in Merge Sort
    | 'variable'; // For updating local variables

export interface Step {
    type: StepType;
    indices: number[]; // Indices of array elements involved
    values?: any[];    // Values involved (optional)
    lineNumber?: number; // Line number in the code to highlight
    variables?: Record<string, any>; // State of local variables to display
    description: string; // Text description of what's happening
    auxIndices?: number[]; // Indices in auxiliary array
    arrayState?: number[]; // Optional state for complex sorts like Heap Sort
}

export interface AlgorithmResult {
    steps: Step[];
    sortedArray?: any[]; // Final state (for verification)
}

export interface Algorithm {
    name: string;
    category: string;
    description: string;
    complexity: {
        time: string;
        space: string;
    };
    run: (input: any) => AlgorithmResult;
    code: string; // The source code to display
}

export type AlgorithmCategory = 'Sorting' | 'Searching' | 'Graph' | 'DP' | 'Greedy';
