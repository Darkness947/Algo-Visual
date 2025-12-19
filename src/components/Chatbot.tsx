import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageCircle, X, Send, Bot } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import '../styles/Chatbot.css';

interface Message {
    id: number;
    text: string;
    sender: 'user' | 'bot';
}

const knowledgeBase = {
    en: {
        greetings: ["hello", "hi", "hey"],
        greetingResponse: "Hello there! Ready to learn some algorithms?",

        responses: [
            {
                keywords: ["bubble"],
                text: "Bubble Sort repeatedly steps through the list, compares adjacent elements and swaps them if they are in the wrong order. It's simple but slow (O(n²))."
            },
            {
                keywords: ["selection"],
                text: "Selection Sort divides the input list into two parts: a sorted sublist of items which is built up from left to right at the front (left) of the list and a sublist of the remaining unsorted items. It has O(n²) time complexity."
            },
            {
                keywords: ["insertion"],
                text: "Insertion Sort builds the final sorted array (or list) one item at a time. It is much less efficient on large lists than more advanced algorithms such as quicksort, heapsort, or merge sort. Time complexity: O(n²)."
            },
            {
                keywords: ["merge"],
                text: "Merge Sort divides the array into halves, sorts them recursively, and then merges them. It's stable and guarantees O(n log n) time."
            },
            {
                keywords: ["quick"],
                text: "Quick Sort is a divide-and-conquer algorithm. It picks a 'pivot' and partitions the array around it. Very fast in practice (O(n log n) average)."
            },
            {
                keywords: ["heap"],
                text: "Heap Sort uses a binary heap data structure. It divides its input into a sorted and an unsorted region, and it iteratively shrinks the unsorted region by extracting the largest element and moving that to the sorted region. Time complexity: O(n log n)."
            },
            {
                keywords: ["counting", "sort"],
                text: "Counting Sort is an integer sorting algorithm. It operates by counting the number of objects that have each distinct key value. It is efficient if the range of input data is not significantly greater than the number of objects to be sorted. Time complexity: O(n+k)."
            },
            {
                keywords: ["radix"],
                text: "Radix Sort is a non-comparative sorting algorithm. It avoids comparison by creating and distributing elements into buckets according to their radix. For elements with more than one significant digit, this bucketing process is repeated for each digit. Time complexity: O(nk)."
            },
            {
                keywords: ["linear", "search"],
                text: "Linear Search checks every element in the list sequentially until the desired element is found or the list ends. Time complexity: O(n)."
            },
            {
                keywords: ["binary", "search"],
                text: "Binary Search finds the position of a target value within a sorted array. It compares the target value to the middle element of the array. Time complexity: O(log n)."
            },
            {
                keywords: ["bfs", "breadth"],
                text: "BFS (Breadth-First Search) explores a graph layer by layer. It uses a Queue data structure. Great for finding the shortest path in unweighted graphs!"
            },
            {
                keywords: ["dfs", "depth"],
                text: "DFS (Depth-First Search) explores as far as possible along each branch before backtracking. It uses a Stack (or recursion). Useful for topological sorting and maze solving."
            },
            {
                keywords: ["dijkstra"],
                text: "Dijkstra's Algorithm finds the shortest path in a weighted graph. It uses a Priority Queue to always explore the closest node next."
            },
            {
                keywords: ["lcs", "longest", "common"],
                text: "Longest Common Subsequence (LCS) finds the longest subsequence present in all given sequences. It is a classic computer science problem, the basis of file comparison programs like diff, and has applications in bioinformatics."
            },
            {
                keywords: ["knapsack"],
                text: "The 0/1 Knapsack problem determines the number of each item to include in a collection so that the total weight is less than or equal to a given limit and the total value is as large as possible."
            },
            {
                keywords: ["dp", "dynamic"],
                text: "Dynamic Programming solves complex problems by breaking them down into simpler subproblems and storing their solutions (memoization). Examples: Fibonacci, LCS, Knapsack."
            },
            {
                keywords: ["activity", "selection"],
                text: "The Activity Selection problem is a combinatorial optimization problem concerning the selection of non-conflicting activities to perform within a given time frame, given a set of activities each marked by a start time and finish time."
            },
            {
                keywords: ["counting", "money", "coin"],
                text: "Counting Money (Coin Change) is a greedy algorithm that finds the minimum number of coins needed to make a target amount. It works by always picking the largest denomination coin that is less than or equal to the remaining amount."
            },
            {
                keywords: ["greedy"],
                text: "Greedy algorithms make the locally optimal choice at each step with the hope of finding a global optimum. Example: Activity Selection, Huffman Coding."
            },
            {
                keywords: ["complexity", "big o"],
                text: "Time complexity (Big O) describes how an algorithm's runtime grows with input size. O(1) is constant, O(n) is linear, O(n²) is quadratic."
            }
        ]
    },
    ar: {
        greetings: ["مرحبا", "هلا", "اهلين", "السلام", "تحية"],
        greetingResponse: "أهلاً بك! هل أنت مستعد لتعلم بعض الخوارزميات؟",

        responses: [
            {
                keywords: ["فقاعة", "bubble"],
                text: "ترتيب الفقاعة يمر عبر القائمة بشكل متكرر، ويقارن العناصر المتجاورة ويبادلها إذا كانت بالترتيب الخاطئ. إنه بسيط ولكنه بطيء (O(n²))."
            },
            {
                keywords: ["اختيار", "selection"],
                text: "ترتيب الاختيار يقسم القائمة إلى جزأين: جزء مرتب يتم بناؤه من اليسار إلى اليمين وجزء غير مرتب. تعقيده الزمني هو O(n²)."
            },
            {
                keywords: ["إدراج", "insertion"],
                text: "ترتيب الإدراج يبني المصفوفة المرتبة النهائية عنصرًا واحدًا في كل مرة. إنه أقل كفاءة في القوائم الكبيرة مقارنة بالخوارزميات المتقدمة. التعقيد الزمني: O(n²)."
            },
            {
                keywords: ["دمج", "merge"],
                text: "ترتيب الدمج يقسم المصفوفة إلى نصفين، ويرتبها بشكل متكرر، ثم يدمجها. إنه مستقر ويضمن وقت O(n log n)."
            },
            {
                keywords: ["سريع", "quick"],
                text: "الترتيب السريع هو خوارزمية فرق تسد. يختار 'محورًا' ويقسم المصفوفة حوله. سريع جدًا في الممارسة العملية (متوسط O(n log n))."
            },
            {
                keywords: ["كومة", "heap"],
                text: "ترتيب الكومة يستخدم هيكل بيانات الكومة الثنائية. يقسم مدخلاته إلى منطقة مرتبة ومنطقة غير مرتبة، ويقلص المنطقة غير المرتبة بشكل متكرر عن طريق استخراج أكبر عنصر. التعقيد الزمني: O(n log n)."
            },
            {
                keywords: ["عد", "counting"],
                text: "ترتيب العد هو خوارزمية لترتيب الأعداد الصحيحة. يعمل عن طريق عد عدد الكائنات التي لها كل قيمة مفتاح مميزة. فعال إذا كان نطاق البيانات ليس كبيرًا جدًا. التعقيد الزمني: O(n+k)."
            },
            {
                keywords: ["أساس", "radix"],
                text: "ترتيب الأساس هو خوارزمية ترتيب غير مقارنة. يتجنب المقارنة عن طريق إنشاء وتوزيع العناصر في دلاء وفقًا لأساسها. التعقيد الزمني: O(nk)."
            },
            {
                keywords: ["خطي", "linear"],
                text: "البحث الخطي يتحقق من كل عنصر في القائمة بالتسلسل حتى يتم العثور على العنصر المطلوب أو تنتهي القائمة. التعقيد الزمني: O(n)."
            },
            {
                keywords: ["ثنائي", "binary"],
                text: "البحث الثنائي يجد موقع قيمة مستهدفة داخل مصفوفة مرتبة. يقارن القيمة المستهدفة بالعنصر الأوسط في المصفوفة. التعقيد الزمني: O(log n)."
            },
            {
                keywords: ["bfs", "عرض"],
                text: "BFS (بحث العرض أولاً) يستكشف الرسم البياني طبقة تلو الأخرى. يستخدم هيكل بيانات الطابور. رائع لإيجاد أقصر مسار في الرسوم البيانية غير الموزونة!"
            },
            {
                keywords: ["dfs", "عمق"],
                text: "DFS (بحث العمق أولاً) يستكشف إلى أقصى حد ممكن على طول كل فرع قبل التراجع. يستخدم المكدس (أو العودية). مفيد للترتيب الطوبولوجي وحل المتاهات."
            },
            {
                keywords: ["ديكسترا", "dijkstra"],
                text: "خوارزمية ديكسترا تجد أقصر مسار في رسم بياني موزون. تستخدم طابور الأولوية لاستكشاف أقرب عقدة دائمًا."
            },
            {
                keywords: ["lcs", "مشترك", "أطول"],
                text: "أطول تسلسل مشترك (LCS) يجد أطول تسلسل موجود في جميع المتتاليات المعطاة. إنها مشكلة كلاسيكية في علوم الكمبيوتر ولها تطبيقات في المعلوماتية الحيوية."
            },
            {
                keywords: ["حقيبة", "knapsack"],
                text: "مشكلة حقيبة الظهر 0/1 تحدد عدد كل عنصر لتضمينه في مجموعة بحيث يكون الوزن الإجمالي أقل من أو يساوي حدًا معينًا والقيمة الإجمالية أكبر ما يمكن."
            },
            {
                keywords: ["dp", "ديناميكية"],
                text: "البرمجة الديناميكية تحل المشاكل المعقدة عن طريق تقسيمها إلى مشاكل فرعية أبسط وتخزين حلولها. أمثلة: فيبوناتشي، LCS، حقيبة الظهر."
            },
            {
                keywords: ["نشاط", "activity"],
                text: "مشكلة اختيار النشاط هي مشكلة تحسين تتعلق باختيار الأنشطة غير المتضاربة لأدائها خلال إطار زمن معين."
            },
            {
                keywords: ["نقود", "عملة", "money"],
                text: "عد النقود (تغيير العملة) هي خوارزمية جشعة تجد الحد الأدنى من العملات اللازمة لتكوين مبلغ مستهدف. تعمل عن طريق اختيار أكبر عملة ممكنة دائمًا."
            },
            {
                keywords: ["جشعة", "greedy"],
                text: "الخوارزميات الجشعة تتخذ الخيار الأمثل محليًا في كل خطوة على أمل العثور على الحل الأمثل عالميًا. مثال: اختيار النشاط، ترميز هوفمان."
            },
            {
                keywords: ["تعقيد", "big o"],
                text: "التعقيد الزمني (Big O) يصف كيفية نمو وقت تشغيل الخوارزمية مع حجم الإدخال. O(1) ثابت، O(n) خطي، O(n²) تربيعي."
            }
        ]
    }
};

export const Chatbot: React.FC = () => {
    const [isOpen, setIsOpen] = useState(false);
    const { t, language } = useLanguage();

    // Reset messages when language changes
    const [messages, setMessages] = useState<Message[]>([
        { id: 1, text: t('chatbotGreeting'), sender: 'bot' }
    ]);

    // Update initial message when language changes
    useEffect(() => {
        setMessages([{ id: Date.now(), text: t('chatbotGreeting'), sender: 'bot' }]);
    }, [language, t]);

    const [inputValue, setInputValue] = useState('');
    const messagesEndRef = useRef<HTMLDivElement>(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages, isOpen]);

    const generateResponse = (input: string): string => {
        const lowerInput = input.toLowerCase();
        const kb = knowledgeBase[language];

        // Check greetings
        if (kb.greetings.some(g => lowerInput.includes(g))) {
            return kb.greetingResponse;
        }

        // Check responses
        for (const item of kb.responses) {
            // If all keywords match (simple AND logic) or some match?
            // Let's do: if ANY keyword matches, return text. 
            // Better: if it matches specific combinations.
            // For simplicity: check if input includes any of the keywords.
            // But "sort" is too generic. "bubble" is specific.
            // Let's iterate and check if input contains the primary keyword.

            // Refined logic: check if input contains ANY of the keywords for this entry
            if (item.keywords.some(k => lowerInput.includes(k))) {
                return item.text;
            }
        }

        return t('chatbotUnknown');
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
        <div className={`chatbot-container ${language === 'ar' ? 'rtl' : ''}`}>
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        className="chatbot-window"
                        initial={{ opacity: 0, y: 20, scale: 0.9 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 20, scale: 0.9 }}
                        transition={{ duration: 0.2 }}
                        style={{ right: language === 'ar' ? 'auto' : '2rem', left: language === 'ar' ? '2rem' : 'auto' }}
                    >
                        <div className="chatbot-header">
                            <div className="chatbot-title">
                                <Bot size={20} />
                                <span>{t('chatbotTitle')}</span>
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
                                placeholder={t('chatbotPlaceholder')}
                                className="chatbot-input"
                                dir={language === 'ar' ? 'rtl' : 'ltr'}
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
                style={{ right: language === 'ar' ? 'auto' : '2rem', left: language === 'ar' ? '2rem' : 'auto' }}
            >
                {isOpen ? <X size={24} /> : <MessageCircle size={24} />}
            </motion.button>
        </div>
    );
};
