import React from 'react';
import { motion } from 'framer-motion';
import { useVisualization } from '../../context/VisualizationContext';
import { NODES, EDGES } from '../../core/graphData';
import '../../styles/GraphVisualizer.css';

export const GraphVisualizer: React.FC = () => {
    const { steps, currentStep, algorithm } = useVisualization();

    // Determine node states
    const getNodeState = (nodeId: number) => {
        if (currentStep === -1) return 'default';

        let state = 'default';
        for (let i = 0; i <= currentStep; i++) {
            const step = steps[i];
            if (step.type === 'highlight' && step.indices.includes(nodeId)) {
                state = 'active';
            } else if (step.type === 'comparison' && step.indices.includes(nodeId)) {
                // checking
            } else if (step.description.includes(`Visited ${nodeId}`) || step.description.includes(`Processed ${nodeId}`)) {
                state = 'visited';
            }
        }

        const current = steps[currentStep];
        if (current) {
            if (current.indices.includes(nodeId)) {
                if (current.type === 'highlight') return 'active';
                if (current.type === 'comparison') return 'checking';
            }
        }

        return state;
    };

    const currentVariables = currentStep >= 0 && steps[currentStep] ? steps[currentStep].variables : null;
    const queue = currentVariables?.queue as number[] | undefined;
    const stack = currentVariables?.stack as number[] | undefined;
    const distances = currentVariables?.distances as Record<number, number> | undefined;

    return (
        <div className="graph-container">
            <svg width="500" height="350" viewBox="0 0 500 350">
                <defs>
                    <marker id="arrowhead" markerWidth="10" markerHeight="7" refX="28" refY="3.5" orient="auto">
                        <polygon points="0 0, 10 3.5, 0 7" fill="var(--text-muted)" />
                    </marker>
                </defs>

                {/* Edges */}
                {EDGES.map((edge, idx) => {
                    const start = NODES.find(n => n.id === edge.source)!;
                    const end = NODES.find(n => n.id === edge.target)!;
                    const midX = (start.x + end.x) / 2;
                    const midY = (start.y + end.y) / 2;

                    const isDijkstra = algorithm?.name === "Dijkstra's Algorithm";

                    return (
                        <g key={idx}>
                            <line
                                x1={start.x}
                                y1={start.y}
                                x2={end.x}
                                y2={end.y}
                                stroke="var(--bg-tertiary)"
                                strokeWidth="2"
                                markerEnd="url(#arrowhead)"
                            />
                            {/* Edge Weight - Only for Dijkstra */}
                            {isDijkstra && (
                                <>
                                    <rect x={midX - 10} y={midY - 10} width="20" height="20" fill="var(--bg-primary)" rx="4" />
                                    <text x={midX} y={midY} dy=".3em" textAnchor="middle" fontSize="12" fill="var(--text-muted)">
                                        {edge.weight}
                                    </text>
                                </>
                            )}
                        </g>
                    );
                })}

                {/* Nodes */}
                {NODES.map((node) => {
                    const state = getNodeState(node.id);
                    let fill = 'var(--bg-secondary)';
                    let stroke = 'var(--text-muted)';

                    if (state === 'active') {
                        fill = 'var(--accent-primary)';
                        stroke = 'var(--accent-primary)';
                    } else if (state === 'visited') {
                        fill = 'var(--accent-success)';
                        stroke = 'var(--accent-success)';
                    } else if (state === 'checking') {
                        fill = 'var(--accent-warning)';
                        stroke = 'var(--accent-warning)';
                    }

                    const dist = distances ? distances[node.id] : null;
                    const distLabel = dist === Infinity ? '∞' : dist;

                    return (
                        <g key={node.id}>
                            <motion.circle
                                cx={node.x}
                                cy={node.y}
                                r="20"
                                fill={fill}
                                stroke={stroke}
                                strokeWidth="2"
                                initial={false}
                                animate={{ fill, stroke }}
                                transition={{ duration: 0.3 }}
                            />
                            <text
                                x={node.x}
                                y={node.y}
                                dy=".3em"
                                textAnchor="middle"
                                fill={state === 'active' ? '#fff' : 'var(--text-primary)'}
                                fontSize="14"
                                fontWeight="bold"
                                style={{ pointerEvents: 'none' }}
                            >
                                {node.label}
                            </text>
                            {/* Distance Label (for Dijkstra) */}
                            {distances && (
                                <text
                                    x={node.x}
                                    y={node.y - 30}
                                    textAnchor="middle"
                                    fill="var(--text-secondary)"
                                    fontSize="12"
                                >
                                    d: {distLabel}
                                </text>
                            )}
                        </g>
                    );
                })}
            </svg>

            {/* Queue/Stack Visualization */}
            {(queue || stack) && (
                <div className="auxiliary-structure">
                    <h3>{queue ? 'Queue' : 'Recursion Stack'}</h3>
                    <div className="structure-container">
                        {(queue || stack)?.map((val, idx) => (
                            <motion.div
                                key={`${idx}-${val}`}
                                initial={{ opacity: 0, scale: 0.8 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.8 }}
                                className="structure-item"
                            >
                                {val}
                            </motion.div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
};
