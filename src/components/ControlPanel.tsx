import React from 'react';
import { useVisualization } from '../context/VisualizationContext';
import { useLanguage } from '../context/LanguageContext';
import { Play, Pause, SkipBack, SkipForward, RotateCcw, RefreshCw } from 'lucide-react';
import '../styles/ControlPanel.css';

export const ControlPanel: React.FC = () => {
    const {
        isPlaying,
        togglePlay,
        nextStep,
        prevStep,
        reset,
        randomizeArray,
        speed,
        setSpeed
    } = useVisualization();
    const { t } = useLanguage();

    return (
        <div className="control-panel">
            <div className="control-group">
                <button onClick={() => randomizeArray()} className="btn btn-secondary" title={t('generateNew')}>
                    <RefreshCw size={20} />
                    <span>{t('generateNew')}</span>
                </button>
                <button onClick={reset} className="btn btn-secondary" title={t('reset')}>
                    <RotateCcw size={20} />
                </button>
            </div>

            <div className="control-group playback-controls">
                <button onClick={prevStep} className="btn btn-icon" title="Previous Step">
                    <SkipBack size={24} />
                </button>
                <button onClick={togglePlay} className="btn btn-primary btn-play" title={isPlaying ? t('pause') : t('play')}>
                    {isPlaying ? <Pause size={28} /> : <Play size={28} />}
                </button>
                <button onClick={nextStep} className="btn btn-icon" title="Next Step">
                    <SkipForward size={24} />
                </button>
            </div>

            <div className="control-group speed-control">
                <label htmlFor="speed-slider">{t('speed')}</label>
                <input
                    id="speed-slider"
                    type="range"
                    min="10"
                    max="1000"
                    step="10"
                    value={1010 - speed} // Invert so right is faster
                    onChange={(e) => setSpeed(1010 - parseInt(e.target.value))}
                />
            </div>
        </div>
    );
};
