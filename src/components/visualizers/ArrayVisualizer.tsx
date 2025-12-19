import React from 'react';
import { motion } from 'framer-motion';
import { useVisualization } from '../../context/VisualizationContext';
import { BinaryTreeVisualizer } from './BinaryTreeVisualizer';
import '../../styles/ArrayVisualizer.css';

export const ArrayVisualizer: React.FC = () => {
    const { array, steps, currentStep, algorithm } = useVisualization();

    // Determine the state of each bar based on the current step
    const getBarColor = (index: number) => {
        if (currentStep === -1) return 'var(--color-default)';

        const step = steps[currentStep];
        if (!step) return 'var(--color-default)';

        if (step.indices.includes(index)) {
            if (step.type === 'comparison') return 'var(--color-compare)';
            if (step.type === 'swap') return 'var(--color-swap)';
            if (step.type === 'overwrite') return 'var(--color-swap)';
            if (step.type === 'highlight') return 'var(--color-highlight)';
        }

        // Check if sorted (optional logic, can be added to step metadata)
        // For now, simple state mapping
        return 'var(--color-default)';
    };

    const maxValue = Math.max(...array, 100);

    return (
        <div style={{ display: 'flex', flexDirection: 'column', height: '100%', width: '100%' }}>
            <div className="array-container" style={{ flex: 1 }}>
                {array.map((value, idx) => (
                    <motion.div
                        key={idx}
                        layout
                        className="array-bar"
                        initial={{ height: 0 }}
                        animate={{
                            height: `${(value / maxValue) * 100}%`,
                            backgroundColor: getBarColor(idx)
                        }}
                        transition={{ type: 'spring', stiffness: 300, damping: 25 }}
                    >
                        <span className="bar-value">{value}</span>
                    </motion.div>
                ))}
            </div>

            {algorithm?.name === 'Heap Sort' && (
                <div style={{ borderTop: '1px solid var(--bg-tertiary)', padding: '1rem' }}>
                    <BinaryTreeVisualizer />
                </div>
            )}

            {algorithm?.name === 'Counting Sort' && (
                <div style={{ borderTop: '1px solid var(--bg-tertiary)', padding: '1rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                    {/* Count Array */}
                    <div>
                        <h4 style={{ color: 'var(--text-secondary)', marginBottom: '0.5rem' }}>Count Array (C)</h4>
                        <div style={{ display: 'flex', gap: '4px' }}>
                            {steps[currentStep]?.variables?.count?.map((val: number, idx: number) => (
                                <div key={`count-${idx}`} style={{
                                    display: 'flex', flexDirection: 'column', alignItems: 'center',
                                    minWidth: '30px', padding: '4px', background: 'var(--bg-secondary)', borderRadius: '4px'
                                }}>
                                    <span style={{ fontSize: '12px', fontWeight: 'bold', color: 'var(--accent-primary)' }}>{val}</span>
                                    <span style={{ fontSize: '10px', color: 'var(--text-muted)' }}>{idx}</span>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Output Array */}
                    <div>
                        <h4 style={{ color: 'var(--text-secondary)', marginBottom: '0.5rem' }}>Output Array (B)</h4>
                        <div style={{ display: 'flex', gap: '4px' }}>
                            {steps[currentStep]?.variables?.output?.map((val: number, idx: number) => (
                                <div key={`out-${idx}`} style={{
                                    display: 'flex', flexDirection: 'column', alignItems: 'center',
                                    minWidth: '30px', padding: '4px', background: 'var(--bg-secondary)', borderRadius: '4px',
                                    border: val !== 0 ? '1px solid var(--accent-success)' : 'none'
                                }}>
                                    <span style={{ fontSize: '12px', fontWeight: 'bold' }}>{val}</span>
                                    <span style={{ fontSize: '10px', color: 'var(--text-muted)' }}>{idx}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            )}

            {algorithm?.name === 'Radix Sort' && (
                <div style={{ borderTop: '1px solid var(--bg-tertiary)', padding: '1rem' }}>
                    <div style={{ marginBottom: '1rem', color: 'var(--text-secondary)' }}>
                        Sorting by digit place: <span style={{ color: 'var(--accent-primary)', fontWeight: 'bold' }}>{steps[currentStep]?.variables?.currentDigit}</span>
                    </div>
                    <div style={{ display: 'flex', gap: '1rem', overflowX: 'auto', paddingBottom: '1rem' }}>
                        {steps[currentStep]?.variables?.buckets?.map((bucket: number[], idx: number) => (
                            <div key={`bucket-${idx}`} style={{
                                display: 'flex', flexDirection: 'column', alignItems: 'center',
                                minWidth: '60px', background: 'var(--bg-secondary)', borderRadius: '8px',
                                border: '1px solid var(--bg-tertiary)', overflow: 'hidden'
                            }}>
                                <div style={{
                                    width: '100%', padding: '0.5rem', background: 'var(--bg-tertiary)',
                                    textAlign: 'center', fontWeight: 'bold', color: 'var(--text-muted)'
                                }}>
                                    {idx}
                                </div>
                                <div style={{ padding: '0.5rem', display: 'flex', flexDirection: 'column', gap: '4px', width: '100%', minHeight: '100px' }}>
                                    {bucket.map((val, valIdx) => (
                                        <motion.div
                                            key={`${idx}-${valIdx}-${val}`}
                                            initial={{ opacity: 0, y: -10 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            style={{
                                                padding: '4px', background: 'var(--bg-primary)', borderRadius: '4px',
                                                textAlign: 'center', fontSize: '12px', border: '1px solid var(--accent-primary)'
                                            }}
                                        >
                                            {val}
                                        </motion.div>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
};
