import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useVisualization } from '../../context/VisualizationContext';

export const GreedyVisualizer: React.FC = () => {
    const { steps, currentStep, algorithm } = useVisualization();

    // Default state if no steps yet
    const currentVariables = currentStep >= 0 && steps[currentStep] ? steps[currentStep].variables : {};

    if (algorithm?.name === 'Counting Money') {
        const remaining = currentVariables?.remaining;
        const currentCoin = currentVariables?.currentCoin;
        const selectedCoins = currentVariables?.selectedCoins || {};

        // Extract target from initial step or context if possible, but here we can infer or just show remaining
        // Actually, let's look at step 0 for target if needed, or just rely on 'remaining' updates.

        return (
            <div className="greedy-visualizer" style={{
                padding: '2rem',
                width: '100%',
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                color: 'var(--text-primary)',
                gap: '2rem'
            }}>
                <h3 style={{ fontSize: '1.5rem', marginBottom: '1rem' }}>Counting Money (Greedy)</h3>

                <div className="money-stats" style={{ display: 'flex', gap: '3rem', fontSize: '1.2rem' }}>
                    <div className="stat-box">
                        <span style={{ color: 'var(--text-secondary)' }}>Remaining: </span>
                        <span style={{ fontWeight: 'bold', fontSize: '2rem', color: 'var(--accent-primary)' }}>
                            {remaining !== undefined ? remaining : '-'}¢
                        </span>
                    </div>
                </div>

                <div className="coins-container" style={{
                    display: 'flex',
                    gap: '2rem',
                    flexWrap: 'wrap',
                    justifyContent: 'center',
                    maxWidth: '800px'
                }}>
                    {[25, 10, 5, 1].map(coinVal => {
                        const count = selectedCoins[coinVal] || 0;
                        const isCurrent = currentCoin === coinVal;

                        return (
                            <motion.div
                                key={coinVal}
                                className="coin-column"
                                animate={{ scale: isCurrent ? 1.1 : 1 }}
                                style={{
                                    display: 'flex',
                                    flexDirection: 'column',
                                    alignItems: 'center',
                                    gap: '1rem',
                                    padding: '1rem',
                                    background: isCurrent ? 'rgba(255, 255, 255, 0.05)' : 'transparent',
                                    borderRadius: '12px',
                                    border: isCurrent ? '1px solid var(--accent-primary)' : '1px solid transparent'
                                }}
                            >
                                <div className="coin-visual" style={{
                                    width: '80px',
                                    height: '80px',
                                    borderRadius: '50%',
                                    background: 'linear-gradient(135deg, #fbbf24, #d97706)',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    fontSize: '1.5rem',
                                    fontWeight: 'bold',
                                    color: '#fff',
                                    boxShadow: '0 4px 10px rgba(0,0,0,0.3)',
                                    border: '4px solid #f59e0b'
                                }}>
                                    {coinVal}¢
                                </div>

                                <div className="coin-count" style={{ fontSize: '1.2rem' }}>
                                    x {count}
                                </div>

                                {/* Stack visualization */}
                                <div className="coin-stack" style={{
                                    height: '150px',
                                    display: 'flex',
                                    flexDirection: 'column-reverse',
                                    gap: '2px',
                                    width: '80px',
                                    alignItems: 'center'
                                }}>
                                    <AnimatePresence>
                                        {Array.from({ length: count }).map((_, i) => (
                                            <motion.div
                                                key={i}
                                                initial={{ opacity: 0, y: -50, rotate: Math.random() * 360 }}
                                                animate={{ opacity: 1, y: 0, rotate: 0 }}
                                                transition={{ type: 'spring', stiffness: 200, damping: 15 }}
                                                style={{
                                                    width: '60px',
                                                    height: '10px',
                                                    background: '#fbbf24',
                                                    borderRadius: '2px',
                                                    border: '1px solid #d97706'
                                                }}
                                            />
                                        ))}
                                    </AnimatePresence>
                                </div>
                            </motion.div>
                        );
                    })}
                </div>
            </div>
        );
    }

    // Default to Activity Selection
    const activities = currentVariables?.activities || [];
    const selectedIds = currentVariables?.selectedIds || [];
    const currentId = currentVariables?.currentId;
    const conflict = currentVariables?.conflict;

    // Find max time to scale the timeline
    const maxTime = activities.reduce((max: number, act: any) => Math.max(max, act.end), 0) || 15;

    return (
        <div className="greedy-visualizer" style={{
            padding: '2rem',
            width: '100%',
            height: '100%',
            display: 'flex',
            flexDirection: 'column',
            color: 'var(--text-primary)'
        }}>
            <h3 style={{ marginBottom: '1rem', textAlign: 'center' }}>Activity Selection Timeline</h3>

            <div className="timeline-container" style={{
                flex: 1,
                position: 'relative',
                borderLeft: '2px solid var(--border-color)',
                borderBottom: '2px solid var(--border-color)',
                margin: '20px',
                background: 'rgba(0,0,0,0.1)',
                borderRadius: '4px'
            }}>
                {/* Time Markers */}
                {Array.from({ length: maxTime + 1 }).map((_, i) => (
                    <div key={i} style={{
                        position: 'absolute',
                        left: `${(i / maxTime) * 100}%`,
                        bottom: '-25px',
                        transform: 'translateX(-50%)',
                        fontSize: '0.8rem',
                        color: 'var(--text-secondary)'
                    }}>
                        {i}
                    </div>
                ))}

                {/* Activities */}
                <AnimatePresence>
                    {activities.map((activity: any, index: number) => {
                        const isSelected = selectedIds.includes(activity.id);
                        const isCurrent = currentId === activity.id;
                        const isConflict = isCurrent && conflict;

                        let backgroundColor = 'var(--primary-color)'; // Default
                        if (isSelected) backgroundColor = '#10B981'; // Green
                        if (isCurrent) backgroundColor = '#F59E0B'; // Yellow/Orange
                        if (isConflict) backgroundColor = '#EF4444'; // Red

                        return (
                            <motion.div
                                key={activity.id}
                                layout
                                initial={{ opacity: 0, y: 20 }}
                                animate={{
                                    opacity: isConflict ? 0.5 : 1,
                                    y: index * 50 + 20, // Stack vertically based on sorted order (or initial order)
                                    backgroundColor
                                }}
                                transition={{ duration: 0.3 }}
                                style={{
                                    position: 'absolute',
                                    left: `${(activity.start / maxTime) * 100}%`,
                                    width: `${((activity.end - activity.start) / maxTime) * 100}%`,
                                    height: '30px',
                                    borderRadius: '4px',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    color: '#fff',
                                    fontWeight: 'bold',
                                    fontSize: '0.9rem',
                                    boxShadow: '0 2px 4px rgba(0,0,0,0.2)'
                                }}
                            >
                                {activity.id} ({activity.start}-{activity.end})
                            </motion.div>
                        );
                    })}
                </AnimatePresence>
            </div>

            <div className="legend" style={{ display: 'flex', gap: '1rem', justifyContent: 'center', marginTop: '1rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <div style={{ width: 16, height: 16, background: 'var(--primary-color)', borderRadius: 4 }}></div>
                    <span>Pending</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <div style={{ width: 16, height: 16, background: '#F59E0B', borderRadius: 4 }}></div>
                    <span>Considering</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <div style={{ width: 16, height: 16, background: '#10B981', borderRadius: 4 }}></div>
                    <span>Selected</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <div style={{ width: 16, height: 16, background: '#EF4444', borderRadius: 4 }}></div>
                    <span>Conflict</span>
                </div>
            </div>
        </div>
    );
};
