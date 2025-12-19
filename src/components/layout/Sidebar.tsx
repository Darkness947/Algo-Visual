import React from 'react';
import { BarChart2, Search, GitGraph } from 'lucide-react';
import { useVisualization } from '../../context/VisualizationContext';
import { bubbleSort } from '../../algorithms/sorting/bubbleSort';
import { selectionSort } from '../../algorithms/sorting/selectionSort';
import { insertionSort } from '../../algorithms/sorting/insertionSort';
import { mergeSort } from '../../algorithms/sorting/mergeSort';
import { quickSort } from '../../algorithms/sorting/quickSort';
import { heapSort } from '../../algorithms/sorting/heapSort';
import { countingSort } from '../../algorithms/sorting/countingSort';
import { radixSort } from '../../algorithms/sorting/radixSort';
import { linearSearch } from '../../algorithms/searching/linearSearch';
import { binarySearch } from '../../algorithms/searching/binarySearch';
import { bfs } from '../../algorithms/graphs/bfs';
import { dfs } from '../../algorithms/graphs/dfs';
import { dijkstra } from '../../algorithms/graphs/dijkstra';
import { lcs } from '../../algorithms/dp/lcs';
import { knapsack } from '../../algorithms/dp/knapsack';
import { activitySelection } from '../../algorithms/greedy/activitySelection';
import { coinChange } from '../../algorithms/greedy/coinChange';
import '../../styles/Sidebar.css';
import logo from '../../assets/logo.png';

interface SidebarProps {
    isOpen?: boolean; // Made optional to fix potential type issues if not passed
}

export const Sidebar: React.FC<SidebarProps> = ({ isOpen = true }) => {
    const { setAlgorithm, algorithm } = useVisualization();

    return (
        <aside className={`sidebar ${isOpen ? 'open' : 'closed'}`}>
            <div className="sidebar-header">
                <div className="logo">
                    <img src={logo} alt="AlgoVisual" className="logo-image" />
                    <span className="logo-text">AlgoVisual</span>
                </div>
            </div>

            <nav className="sidebar-nav">
                <div className="nav-section">
                    <div className="nav-section-title">
                        <span>Sorting</span>
                        <BarChart2 size={16} />
                    </div>
                    <ul className="nav-list">
                        <li
                            className={`nav-item ${algorithm?.name === 'Bubble Sort' ? 'active' : ''}`}
                            onClick={() => setAlgorithm(bubbleSort)}
                        >
                            Bubble Sort
                        </li>
                        <li
                            className={`nav-item ${algorithm?.name === 'Selection Sort' ? 'active' : ''}`}
                            onClick={() => setAlgorithm(selectionSort)}
                        >
                            Selection Sort
                        </li>
                        <li
                            className={`nav-item ${algorithm?.name === 'Insertion Sort' ? 'active' : ''}`}
                            onClick={() => setAlgorithm(insertionSort)}
                        >
                            Insertion Sort
                        </li>
                        <li
                            className={`nav-item ${algorithm?.name === 'Merge Sort' ? 'active' : ''}`}
                            onClick={() => setAlgorithm(mergeSort)}
                        >
                            Merge Sort
                        </li>
                        <li
                            className={`nav-item ${algorithm?.name === 'Quick Sort' ? 'active' : ''}`}
                            onClick={() => setAlgorithm(quickSort)}
                        >
                            Quick Sort
                        </li>
                        <li
                            className={`nav-item ${algorithm?.name === 'Heap Sort' ? 'active' : ''}`}
                            onClick={() => setAlgorithm(heapSort)}
                        >
                            Heap Sort
                        </li>
                        <li
                            className={`nav-item ${algorithm?.name === 'Counting Sort' ? 'active' : ''}`}
                            onClick={() => setAlgorithm(countingSort)}
                        >
                            Counting Sort
                        </li>
                        <li
                            className={`nav-item ${algorithm?.name === 'Radix Sort' ? 'active' : ''}`}
                            onClick={() => setAlgorithm(radixSort)}
                        >
                            Radix Sort
                        </li>
                    </ul>
                </div>

                <div className="nav-section">
                    <div className="nav-section-title">
                        <span>Searching</span>
                        <Search size={16} />
                    </div>
                    <ul className="nav-list">
                        <li
                            className={`nav-item ${algorithm?.name === 'Linear Search' ? 'active' : ''}`}
                            onClick={() => setAlgorithm(linearSearch)}
                        >
                            Linear Search
                        </li>
                        <li
                            className={`nav-item ${algorithm?.name === 'Binary Search' ? 'active' : ''}`}
                            onClick={() => setAlgorithm(binarySearch)}
                        >
                            Binary Search
                        </li>
                    </ul>
                </div>

                <div className="nav-section">
                    <div className="nav-section-title">
                        <span>Graphs</span>
                        <GitGraph size={16} />
                    </div>
                    <ul className="nav-list">
                        <li
                            className={`nav-item ${algorithm?.name === 'BFS' ? 'active' : ''}`}
                            onClick={() => setAlgorithm(bfs)}
                        >
                            Breadth-First Search
                        </li>
                        <li
                            className={`nav-item ${algorithm?.name === 'DFS' ? 'active' : ''}`}
                            onClick={() => setAlgorithm(dfs)}
                        >
                            Depth-First Search
                        </li>
                        <li
                            className={`nav-item ${algorithm?.name === "Dijkstra's Algorithm" ? 'active' : ''}`}
                            onClick={() => setAlgorithm(dijkstra)}
                        >
                            Dijkstra's Algorithm
                        </li>
                    </ul>
                </div>

                <div className="nav-section">
                    <div className="nav-section-title">
                        <span>Dynamic Programming</span>
                        <GitGraph size={16} />
                    </div>
                    <ul className="nav-list">
                        <li
                            className={`nav-item ${algorithm?.name === 'Longest Common Subsequence' ? 'active' : ''}`}
                            onClick={() => setAlgorithm(lcs)}
                        >
                            LCS
                        </li>
                        <li
                            className={`nav-item ${algorithm?.name === '0/1 Knapsack' ? 'active' : ''}`}
                            onClick={() => setAlgorithm(knapsack)}
                        >
                            0/1 Knapsack
                        </li>
                    </ul>
                </div>

                <div className="nav-section">
                    <div className="nav-section-title">
                        <span>Greedy Algorithms</span>
                        <GitGraph size={16} />
                    </div>
                    <ul className="nav-list">
                        <li
                            className={`nav-item ${algorithm?.name === 'Activity Selection' ? 'active' : ''}`}
                            onClick={() => setAlgorithm(activitySelection)}
                        >
                            Activity Selection
                        </li>
                        <li
                            className={`nav-item ${algorithm?.name === 'Counting Money' ? 'active' : ''}`}
                            onClick={() => setAlgorithm(coinChange)}
                        >
                            Counting Money
                        </li>
                    </ul>
                </div>
            </nav>
        </aside>
    );
};
