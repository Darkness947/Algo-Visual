import React from 'react';
import { motion } from 'framer-motion';
import { useVisualization } from '../../context/VisualizationContext';

export const DPVisualizer: React.FC = () => {
    const { steps, currentStep, algorithm } = useVisualization();

    if (currentStep === -1 || !steps[currentStep]) {
        return <div style={{ padding: '2rem', textAlign: 'center', color: 'var(--text-muted)' }}>Press Play to start visualization</div>;
    }

    const variables = steps[currentStep].variables;
    if (!variables || !variables.table) return null;

    const table = variables.table as number[][];
    const currentRow = variables.i;
    const currentCol = variables.j; // For LCS
    const currentW = variables.w;   // For Knapsack
    const path = variables.path as [number, number][] | undefined;

    // Headers
    let colHeaders: string[] = [];
    let rowHeaders: string[] = [];

    if (algorithm?.name === 'Longest Common Subsequence') {
        const str1 = variables.str1 as string;
        const str2 = variables.str2 as string;
        colHeaders = ['Ø', ...str2.split('')];
        rowHeaders = ['Ø', ...str1.split('')];
    } else if (algorithm?.name === '0/1 Knapsack') {
        const capacity = variables.capacity as number;
        const items = variables.items as { id: number, weight: number, value: number }[];
        colHeaders = Array.from({ length: capacity + 1 }, (_, i) => i.toString());
        rowHeaders = ['Ø', ...items.map(item => `Item ${item.id} (${item.weight}kg, $${item.value})`)];
    }

    return (
        <div style={{ padding: '1rem', overflow: 'auto', maxHeight: '100%', width: '100%' }}>
            <table style={{ borderCollapse: 'collapse', margin: '0 auto' }}>
                <thead>
                    <tr>
                        <th style={{ padding: '8px' }}></th>
                        {colHeaders.map((header, idx) => (
                            <th key={idx} style={{
                                padding: '8px', border: '1px solid var(--bg-tertiary)',
                                background: 'var(--bg-secondary)', color: 'var(--text-secondary)', minWidth: '40px'
                            }}>
                                {header}
                            </th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {table.map((row, rIdx) => (
                        <tr key={rIdx}>
                            <th style={{
                                padding: '8px', border: '1px solid var(--bg-tertiary)',
                                background: 'var(--bg-secondary)', color: 'var(--text-secondary)', textAlign: 'right'
                            }}>
                                {rowHeaders[rIdx]}
                            </th>
                            {row.map((cell, cIdx) => {
                                const isCurrent = (rIdx === currentRow && cIdx === currentCol) || (rIdx === currentRow && cIdx === currentW);
                                const isPath = path?.some(([r, c]) => r === rIdx && c === cIdx);

                                let bg = 'transparent';
                                if (isCurrent) bg = 'var(--accent-primary)';
                                else if (isPath) bg = 'var(--accent-success)';
                                else if (cell !== 0) bg = 'rgba(59, 130, 246, 0.1)';

                                return (
                                    <motion.td
                                        key={cIdx}
                                        initial={false}
                                        animate={{ backgroundColor: bg }}
                                        style={{
                                            border: '1px solid var(--bg-tertiary)',
                                            padding: '8px',
                                            textAlign: 'center',
                                            minWidth: '40px',
                                            color: isCurrent || isPath ? '#fff' : 'var(--text-primary)',
                                            fontWeight: isCurrent || isPath ? 'bold' : 'normal'
                                        }}
                                    >
                                        {cell}
                                    </motion.td>
                                );
                            })}
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};
