import React from 'react';
import { motion } from 'framer-motion';
import { useVisualization } from '../../context/VisualizationContext';

export const BinaryTreeVisualizer: React.FC = () => {
    const { array, steps, currentStep } = useVisualization();

    // Get current array state
    const currentArray = currentStep >= 0 && steps[currentStep]
        ? steps[currentStep].arrayState || array
        : array;

    // Get active indices
    const step = currentStep >= 0 ? steps[currentStep] : null;
    const activeIndices = step ? step.indices : [];
    const type = step ? step.type : '';

    // Calculate node positions
    // Simple layout: Levels based on index
    // Level 0: 0
    // Level 1: 1, 2
    // Level 2: 3, 4, 5, 6
    const getPosition = (index: number) => {
        const level = Math.floor(Math.log2(index + 1));
        const levelStartIndex = Math.pow(2, level) - 1;
        const positionInLevel = index - levelStartIndex;
        const nodesInLevel = Math.pow(2, level);

        // Canvas width 800
        const width = 800;
        const y = level * 60 + 40;
        const x = (width / (nodesInLevel + 1)) * (positionInLevel + 1);

        return { x, y };
    };

    return (
        <div className="tree-container" style={{ width: '100%', height: '300px', overflow: 'hidden', display: 'flex', justifyContent: 'center' }}>
            <svg width="800" height="300" viewBox="0 0 800 300">
                {/* Edges */}
                {currentArray.map((_, index) => {
                    if (index === 0) return null;
                    const parentIndex = Math.floor((index - 1) / 2);
                    const { x: x1, y: y1 } = getPosition(parentIndex);
                    const { x: x2, y: y2 } = getPosition(index);

                    return (
                        <line
                            key={`edge-${index}`}
                            x1={x1} y1={y1}
                            x2={x2} y2={y2}
                            stroke="var(--bg-tertiary)"
                            strokeWidth="2"
                        />
                    );
                })}

                {/* Nodes */}
                {currentArray.map((value, index) => {
                    const { x, y } = getPosition(index);
                    let fill = 'var(--bg-secondary)';
                    let stroke = 'var(--text-muted)';

                    if (activeIndices.includes(index)) {
                        if (type === 'comparison') {
                            fill = 'var(--accent-warning)';
                            stroke = 'var(--accent-warning)';
                        } else if (type === 'swap' || type === 'overwrite') {
                            fill = 'var(--accent-primary)';
                            stroke = 'var(--accent-primary)';
                        } else if (type === 'highlight') {
                            fill = 'var(--accent-success)';
                            stroke = 'var(--accent-success)';
                        }
                    }

                    return (
                        <g key={`node-${index}`}>
                            <motion.circle
                                cx={x} cy={y}
                                r="18"
                                fill={fill}
                                stroke={stroke}
                                strokeWidth="2"
                                animate={{ fill, stroke }}
                                transition={{ duration: 0.2 }}
                            />
                            <text
                                x={x} y={y}
                                dy=".3em"
                                textAnchor="middle"
                                fill="var(--text-primary)"
                                fontSize="12"
                                fontWeight="bold"
                            >
                                {value}
                            </text>
                        </g>
                    );
                })}
            </svg>
        </div>
    );
};
