import React, { createContext, useContext, useState, useEffect, useCallback, useRef } from 'react';
import type { Algorithm, Step } from '../core/types';

interface VisualizationContextType {
    isPlaying: boolean;
    speed: number;
    currentStep: number;
    steps: Step[];
    array: number[]; // Current visual state of the array
    initialArray: number[]; // To reset
    dpData: any;
    algorithm: Algorithm | null;

    // Actions
    play: () => void;
    pause: () => void;
    togglePlay: () => void;
    nextStep: () => void;
    prevStep: () => void;
    reset: () => void;
    setSpeed: (speed: number) => void;
    setAlgorithm: (algo: Algorithm) => void;
    setArray: (arr: number[]) => void;
    randomizeArray: (size?: number) => void;
    theme: 'dark' | 'light';
    toggleTheme: () => void;
}

const VisualizationContext = createContext<VisualizationContextType | undefined>(undefined);

export const VisualizationProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [theme, setTheme] = useState<'dark' | 'light'>('dark');
    const [isPlaying, setIsPlaying] = useState(false);
    const [speed, setSpeed] = useState(500); // ms delay
    const [currentStep, setCurrentStep] = useState(-1); // -1 means start state
    const [steps, setSteps] = useState<Step[]>([]);
    const [array, setArray] = useState<number[]>([]);
    const [initialArray, setInitialArray] = useState<number[]>([]);
    const [dpData, setDpData] = useState<any>(null);
    const [algorithm, setAlgorithm] = useState<Algorithm | null>(null);

    const timerRef = useRef<number | null>(null);

    // Initialize random array or DP data
    const randomizeArray = useCallback((size = 20, algoOverride?: Algorithm | null) => {
        const algo = algoOverride !== undefined ? algoOverride : algorithm;

        if (algo?.category === 'DP') {
            if (algo.name === 'Longest Common Subsequence') {
                const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
                const str1 = Array.from({ length: 8 }, () => chars[Math.floor(Math.random() * chars.length)]).join('');
                const str2 = Array.from({ length: 8 }, () => chars[Math.floor(Math.random() * chars.length)]).join('');
                setDpData({ str1, str2 });
                setInitialArray([]); // Not used for LCS
                setArray([]);
            } else if (algo.name === '0/1 Knapsack') {
                const items = Array.from({ length: 5 }, (_, i) => ({
                    id: i + 1,
                    weight: Math.floor(Math.random() * 8) + 1,
                    value: Math.floor(Math.random() * 20) + 5
                }));
                const capacity = Math.floor(Math.random() * 10) + 10;
                setDpData({ items, capacity });
                setInitialArray([]);
                setArray([]);
            }
        } else if (algo?.category === 'Greedy') {
            if (algo.name === 'Activity Selection') {
                const intervals = Array.from({ length: 8 }, (_, i) => {
                    const start = Math.floor(Math.random() * 15);
                    const duration = Math.floor(Math.random() * 5) + 1;
                    return { id: i + 1, start, end: start + duration };
                });
                setDpData({ intervals }); // Reusing dpData for generic algo data
                setInitialArray([]);
                setArray([]);
            } else if (algo.name === 'Counting Money') {
                const target = Math.floor(Math.random() * 99) + 1; // 1 to 99 cents
                const coins = [1, 5, 10, 25];
                setDpData({ target, coins });
                setInitialArray([]);
                setArray([]);
            }
        } else {
            const newArray = Array.from({ length: size }, () => Math.floor(Math.random() * 100) + 5);
            setInitialArray([...newArray]);
            setArray([...newArray]);
            setDpData(null);
        }
        setSteps([]);
        setCurrentStep(-1);
        setIsPlaying(false);
    }, [algorithm]);

    const handleSetAlgorithm = (algo: Algorithm) => {
        setAlgorithm(algo);
        randomizeArray(20, algo);
    };

    // Run algorithm when algo or inputs change
    useEffect(() => {
        if (algorithm) {
            if ((algorithm.category === 'DP' || algorithm.category === 'Greedy') && dpData) {
                const result = algorithm.run(dpData);
                setSteps(result.steps);
                setCurrentStep(-1);
                setIsPlaying(false);
            } else if (algorithm.category !== 'DP' && algorithm.category !== 'Greedy' && initialArray.length > 0) {
                const result = algorithm.run([...initialArray]);
                setSteps(result.steps);
                setCurrentStep(-1);
                setArray([...initialArray]);
                setIsPlaying(false);
            }
        }
    }, [algorithm, initialArray, dpData]);

    // Playback logic
    useEffect(() => {
        if (isPlaying) {
            timerRef.current = window.setInterval(() => {
                setCurrentStep((prev) => {
                    if (prev < steps.length - 1) {
                        return prev + 1;
                    } else {
                        setIsPlaying(false);
                        return prev;
                    }
                });
            }, speed);
        } else {
            if (timerRef.current) {
                clearInterval(timerRef.current);
                timerRef.current = null;
            }
        }

        return () => {
            if (timerRef.current) clearInterval(timerRef.current);
        };
    }, [isPlaying, speed, steps.length]);

    // Apply steps to array to visualize "current state"
    // Note: This is a simplified approach. For complex algos, we might need to re-compute state from step 0 or keep a history.
    // For sorting, we can just replay swaps/overwrites up to currentStep.
    // A better approach for performance: Maintain current state and apply forward/backward diffs.
    // But for simplicity in this MVP, let's re-compute state from initialArray for the current step to ensure correctness when scrubbing.
    // Optimization: Memoize or only apply delta if moving +1 step.

    // Actually, re-computing from scratch every render is expensive for large N. 
    // Let's try to just apply the current step if we are playing forward.
    // But for scrubbing (prevStep), we need to revert.
    // Simplest robust way: Compute state at currentStep.

    const getArrayAtStep = useCallback((stepIndex: number): number[] => {
        const arr = [...initialArray];
        for (let i = 0; i <= stepIndex; i++) {
            const step = steps[i];
            if (!step) continue;

            if (step.type === 'swap') {
                const [i1, i2] = step.indices;
                [arr[i1], arr[i2]] = [arr[i2], arr[i1]];
            } else if (step.type === 'overwrite') {
                const [idx] = step.indices;
                if (step.values && step.values.length > 0) {
                    arr[idx] = step.values[0];
                }
            }
        }
        return arr;
    }, [initialArray, steps]);

    // Update visible array when step changes
    useEffect(() => {
        if (currentStep >= -1 && steps.length > 0) {
            setArray(getArrayAtStep(currentStep));
        } else if (currentStep === -1) {
            setArray([...initialArray]);
        }
    }, [currentStep, getArrayAtStep, initialArray, steps.length]);


    const play = () => setIsPlaying(true);
    const pause = () => setIsPlaying(false);
    const togglePlay = () => setIsPlaying(p => !p);

    const nextStep = () => {
        if (currentStep < steps.length - 1) {
            setCurrentStep(c => c + 1);
        } else {
            setIsPlaying(false);
        }
    };

    const prevStep = () => {
        if (currentStep > -1) {
            setCurrentStep(c => c - 1);
        }
    };

    const reset = () => {
        setIsPlaying(false);
        setCurrentStep(-1);
        setArray([...initialArray]);
    };

    const toggleTheme = () => {
        setTheme(prev => prev === 'dark' ? 'light' : 'dark');
    };

    useEffect(() => {
        document.documentElement.setAttribute('data-theme', theme);
    }, [theme]);

    return (
        <VisualizationContext.Provider value={{
            isPlaying,
            speed,
            currentStep,
            steps,
            array,
            initialArray,
            dpData,
            algorithm,
            play,
            pause,
            togglePlay,
            nextStep,
            prevStep,
            reset,
            setSpeed,
            setAlgorithm: handleSetAlgorithm,
            setArray: setInitialArray, // We set initial array, and it triggers effect
            randomizeArray,
            theme,
            toggleTheme
        }}>
            {children}
        </VisualizationContext.Provider>
    );
};

export const useVisualization = () => {
    const context = useContext(VisualizationContext);
    if (context === undefined) {
        throw new Error('useVisualization must be used within a VisualizationProvider');
    }
    return context;
};
