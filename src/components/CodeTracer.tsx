import React, { useEffect, useRef } from 'react';
import { useVisualization } from '../context/VisualizationContext';
import '../styles/CodeTracer.css';

export const CodeTracer: React.FC = () => {
    const { algorithm, steps, currentStep } = useVisualization();
    const codeRef = useRef<HTMLPreElement>(null);

    // Get active line number from current step
    const activeLine = currentStep >= 0 && steps[currentStep]
        ? steps[currentStep].lineNumber
        : -1;

    useEffect(() => {
        // Auto-scroll to active line
        if (activeLine && activeLine > 0 && codeRef.current) {
            const lineElement = codeRef.current.querySelector(`[data-line="${activeLine}"]`);
            if (lineElement) {
                lineElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
            }
        }
    }, [activeLine]);

    if (!algorithm) return null;

    const codeLines = algorithm.code.split('\n');

    return (
        <div className="code-tracer">
            <div className="code-header">
                <h3>{algorithm.name}</h3>
                <div className="complexity-badges">
                    <span className="badge time">Time: {algorithm.complexity.time}</span>
                    <span className="badge space">Space: {algorithm.complexity.space}</span>
                </div>
            </div>
            <div className="code-content">
                <pre ref={codeRef}>
                    <code>
                        {codeLines.map((line: string, idx: number) => {
                            const lineNumber = idx + 1;
                            const isActive = lineNumber === activeLine;

                            // Simple syntax highlighting
                            const highlightSyntax = (text: string) => {
                                // This is a very basic regex-based highlighter
                                const parts = text.split(/(\/\/.*|\b(?:function|const|let|var|if|else|for|while|return|break|continue)\b|\b\d+\b|[(){}[\]])/g);
                                return parts.map((part, i) => {
                                    if (part.match(/^\/\/.*$/)) return <span key={i} className="comment">{part}</span>;
                                    if (part.match(/^(function|const|let|var|if|else|for|while|return|break|continue)$/)) return <span key={i} className="keyword">{part}</span>;
                                    if (part.match(/^\d+$/)) return <span key={i} className="number">{part}</span>;
                                    return part;
                                });
                            };

                            return (
                                <div
                                    key={idx}
                                    className={`code-line ${isActive ? 'active' : ''}`}
                                    data-line={lineNumber}
                                >
                                    <span className="line-number">{lineNumber}</span>
                                    <span className="line-text">{highlightSyntax(line)}</span>
                                </div>
                            );
                        })}
                    </code>
                </pre>
            </div>
            <div className="step-description">
                {currentStep >= 0 && steps[currentStep] ? (
                    <p>{steps[currentStep].description}</p>
                ) : (
                    <p className="placeholder">Click Play to start visualization</p>
                )}
            </div>
        </div>
    );
};
