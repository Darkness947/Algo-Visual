import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageCircle, X, Send, Bot } from 'lucide-react';
import '../styles/Chatbot.css';

interface Message {
    id: number;
    text: string;
    sender: 'user' | 'bot';
}

export const Chatbot: React.FC = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState<Message[]>([
        { id: 1, text: "Hi! I'm AlgoBot. Ask me about any algorithm!", sender: 'bot' }
    ]);
    const [inputValue, setInputValue] = useState('');
    const messagesEndRef = useRef<HTMLDivElement>(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    const generateResponse = (input: string): string => {
        const lowerInput = input.toLowerCase();

        // Greetings
        if (lowerInput.includes('hello') || lowerInput.includes('hi')) {
            return "Hello there! Ready to learn some algorithms?";
        }

        // Sorting Algorithms
        if (lowerInput.includes('bubble')) {
            return "Bubble Sort repeatedly steps through the list, compares adjacent elements and swaps them if they are in the wrong order. It's simple but slow (O(n²)).";
        }
        if (lowerInput.includes('selection')) {
            return "Selection Sort divides the input list into two parts: a sorted sublist of items which is built up from left to right at the front (left) of the list and a sublist of the remaining unsorted items. It has O(n²) time complexity.";
        }
        if (lowerInput.includes('insertion')) {
            return "Insertion Sort builds the final sorted array (or list) one item at a time. It is much less efficient on large lists than more advanced algorithms such as quicksort, heapsort, or merge sort. Time complexity: O(n²).";
        }
        if (lowerInput.includes('merge')) {
            return "Merge Sort divides the array into halves, sorts them recursively, and then merges them. It's stable and guarantees O(n log n) time.";
        }
        if (lowerInput.includes('quick')) {
            return "Quick Sort is a divide-and-conquer algorithm. It picks a 'pivot' and partitions the array around it. Very fast in practice (O(n log n) average).";
        }
        if (lowerInput.includes('heap')) {
            return "Heap Sort uses a binary heap data structure. It divides its input into a sorted and an unsorted region, and it iteratively shrinks the unsorted region by extracting the largest element and moving that to the sorted region. Time complexity: O(n log n).";
        }
        if (lowerInput.includes('counting')) {
            return "Counting Sort is an integer sorting algorithm. It operates by counting the number of objects that have each distinct key value. It is efficient if the range of input data is not significantly greater than the number of objects to be sorted. Time complexity: O(n+k).";
        }
        if (lowerInput.includes('radix')) {
            return "Radix Sort is a non-comparative sorting algorithm. It avoids comparison by creating and distributing elements into buckets according to their radix. For elements with more than one significant digit, this bucketing process is repeated for each digit. Time complexity: O(nk).";
        }

        // Searching Algorithms
        if (lowerInput.includes('linear') && lowerInput.includes('search')) {
            return "Linear Search checks every element in the list sequentially until the desired element is found or the list ends. Time complexity: O(n).";
        }
        if (lowerInput.includes('binary') && lowerInput.includes('search')) {
            return "Binary Search finds the position of a target value within a sorted array. It compares the target value to the middle element of the array. Time complexity: O(log n).";
        }

        // Graph Algorithms
        if (lowerInput.includes('bfs') || lowerInput.includes('breadth')) {
            return "BFS (Breadth-First Search) explores a graph layer by layer. It uses a Queue data structure. Great for finding the shortest path in unweighted graphs!";
        }
        if (lowerInput.includes('dfs') || lowerInput.includes('depth')) {
            return "DFS (Depth-First Search) explores as far as possible along each branch before backtracking. It uses a Stack (or recursion). Useful for topological sorting and maze solving.";
        }
        if (lowerInput.includes('dijkstra')) {
            return "Dijkstra's Algorithm finds the shortest path in a weighted graph. It uses a Priority Queue to always explore the closest node next.";
        }

        // Dynamic Programming
        if (lowerInput.includes('lcs') || (lowerInput.includes('longest') && lowerInput.includes('common'))) {
            return "Longest Common Subsequence (LCS) finds the longest subsequence present in all given sequences. It is a classic computer science problem, the basis of file comparison programs like diff, and has applications in bioinformatics.";
        }
        if (lowerInput.includes('knapsack')) {
            return "The 0/1 Knapsack problem determines the number of each item to include in a collection so that the total weight is less than or equal to a given limit and the total value is as large as possible.";
        }
        if (lowerInput.includes('dp') || lowerInput.includes('dynamic')) {
            return "Dynamic Programming solves complex problems by breaking them down into simpler subproblems and storing their solutions (memoization). Examples: Fibonacci, LCS, Knapsack.";
        }

        // Greedy Algorithms
        if (lowerInput.includes('activity') || lowerInput.includes('selection')) {
            return "The Activity Selection problem is a combinatorial optimization problem concerning the selection of non-conflicting activities to perform within a given time frame, given a set of activities each marked by a start time and finish time.";
        }
        if (lowerInput.includes('counting') && (lowerInput.includes('money') || lowerInput.includes('coin'))) {
            return "Counting Money (Coin Change) is a greedy algorithm that finds the minimum number of coins needed to make a target amount. It works by always picking the largest denomination coin that is less than or equal to the remaining amount.";
        }
        if (lowerInput.includes('coin') && lowerInput.includes('change')) {
            return "The Coin Change problem can be solved greedily for standard coin systems (like US coins). It repeatedly selects the largest coin value possible. For arbitrary coin systems, Dynamic Programming is required.";
        }
        if (lowerInput.includes('greedy')) {
            return "Greedy algorithms make the locally optimal choice at each step with the hope of finding a global optimum. Example: Activity Selection, Huffman Coding.";
        }

        // General Concepts
        if (lowerInput.includes('complexity') || lowerInput.includes('big o')) {
            return "Time complexity (Big O) describes how an algorithm's runtime grows with input size. O(1) is constant, O(n) is linear, O(n²) is quadratic.";
        }

        return "I'm not sure about that one yet! Try asking about specific algorithms like BFS, Quick Sort, or DP.";
    };

    const handleSend = (e?: React.FormEvent) => {
        e?.preventDefault();
        if (!inputValue.trim()) return;

        const userMsg: Message = { id: Date.now(), text: inputValue, sender: 'user' };
        setMessages(prev => [...prev, userMsg]);
        setInputValue('');

        setTimeout(() => {
            const botResponse = generateResponse(userMsg.text);
            setMessages(prev => [...prev, { id: Date.now() + 1, text: botResponse, sender: 'bot' }]);
        }, 500);
    };

    return (
        <div className="chatbot-container">
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        className="chatbot-window"
                        initial={{ opacity: 0, y: 20, scale: 0.9 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 20, scale: 0.9 }}
                        transition={{ duration: 0.2 }}
                    >
                        <div className="chatbot-header">
                            <div className="chatbot-title">
                                <Bot size={20} />
                                <span>AlgoBot</span>
                            </div>
                            <button className="close-button" onClick={() => setIsOpen(false)}>
                                <X size={18} />
                            </button>
                        </div>

                        <div className="chatbot-messages">
                            {messages.map(msg => (
                                <div key={msg.id} className={`message ${msg.sender}`}>
                                    {msg.sender === 'bot' && <div className="bot-avatar"><Bot size={14} /></div>}
                                    <div className="message-bubble">{msg.text}</div>
                                </div>
                            ))}
                            <div ref={messagesEndRef} />
                        </div>

                        <form className="chatbot-input-area" onSubmit={handleSend}>
                            <input
                                type="text"
                                value={inputValue}
                                onChange={(e) => setInputValue(e.target.value)}
                                placeholder="Ask about algorithms..."
                                className="chatbot-input"
                            />
                            <button type="submit" className="send-button">
                                <Send size={16} />
                            </button>
                        </form>
                    </motion.div>
                )}
            </AnimatePresence>

            <motion.button
                className="chatbot-toggle"
                onClick={() => setIsOpen(!isOpen)}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
            >
                {isOpen ? <X size={24} /> : <MessageCircle size={24} />}
            </motion.button>
        </div>
    );
};
