import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Sidebar } from './components/layout/Sidebar';
import { Navbar } from './components/layout/Navbar';
import { ControlPanel } from './components/ControlPanel';
import { VisualizationProvider, useVisualization } from './context/VisualizationContext';
import { ArrayVisualizer } from './components/visualizers/ArrayVisualizer';
import { GraphVisualizer } from './components/visualizers/GraphVisualizer';
import { DPVisualizer } from './components/visualizers/DPVisualizer';
import { GreedyVisualizer } from './components/visualizers/GreedyVisualizer';
import { CodeTracer } from './components/CodeTracer';
import { HomePage } from './pages/HomePage';
import { Chatbot } from './components/Chatbot'; // Added import for Chatbot
import './styles/global.css';

const VisualizerPage = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const { algorithm } = useVisualization();

  return (
    <div className="layout-container">
      <Sidebar isOpen={isSidebarOpen} />

      <main className="main-content">
        <Navbar toggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)} />

        <div className="content-wrapper" style={{ display: 'flex', flex: 1, overflow: 'hidden' }}>
          <div className="canvas-area" style={{ flex: 1, position: 'relative', overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
            {algorithm ? (
              algorithm.category === 'Graph' ? (
                <GraphVisualizer />
              ) : algorithm.category === 'DP' ? (
                <DPVisualizer />
              ) : algorithm.category === 'Greedy' ? (
                <GreedyVisualizer />
              ) : (
                <ArrayVisualizer />
              )
            ) : (
              <div style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                height: '100%',
                color: 'var(--text-muted)'
              }}>
                Select an algorithm to start
              </div>
            )}
          </div>

          {algorithm && <CodeTracer />}
        </div>

        <ControlPanel />
      </main>
    </div>
  );
};

function App() {
  return (
    <Router>
      <VisualizationProvider>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/visualizer" element={<VisualizerPage />} />
        </Routes>
        <Chatbot />
      </VisualizationProvider>
    </Router>
  );
}

export default App;
