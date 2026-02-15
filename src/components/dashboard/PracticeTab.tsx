
import { useState } from "react";
import { motion } from "framer-motion";
import {
    Target,
    Code2,
    Brain,
    Trophy,
    Clock,
    CheckCircle2,
    XCircle,
    Play,
    BarChart3,
    Zap
} from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";

export function PracticeTab() {
    const [activeMode, setActiveMode] = useState<"mcq" | "coding" | "mock">("mcq");
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
    const [showResult, setShowResult] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [questions, setQuestions] = useState<any[]>([]);
    const [selection, setSelection] = useState({
        subject: "Data Structures",
        topic: "Trees",
        difficulty: "medium"
    });

    const fetchMCQs = async () => {
        setIsLoading(true);
        try {
            const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000'}/api/generate/mcq`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    subject: selection.subject,
                    topic: selection.topic,
                    count: 10,
                    difficulty: selection.difficulty
                })
            });
            const data = await res.json();
            if (Array.isArray(data)) {
                setQuestions(data);
                setCurrentQuestion(0);
                setSelectedAnswer(null);
                setShowResult(false);
            }
        } catch (error) {
            console.error("Failed to fetch MCQs:", error);
        } finally {
            setIsLoading(false);
        }
    };

    const mcqQuestion = questions[currentQuestion] || {
        question: "Select a topic and click 'Generate MCQs' to start!",
        options: ["Option A", "Option B", "Option C", "Option D"],
        correct: -1,
        explanation: "No question loaded yet."
    };

    const stats = [
        { label: "Tests Attempted", value: "12", icon: Target, color: "blue" },
        { label: "Avg Score", value: "78%", icon: Trophy, color: "yellow" },
        { label: "Problems Solved", value: "45", icon: Code2, color: "green" },
        { label: "Study Streak", value: "7 days", icon: Zap, color: "purple" }
    ];

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex justify-between items-start mb-8">
                <div>
                    <div className="flex items-center gap-3 mb-2">
                        <Brain className="text-purple-500" size={32} />
                        <h2 className="text-3xl font-bold">Interactive Practice Zone</h2>
                    </div>
                </div>
            </div>

            {/* Selection Controls */}
            <Card className="mb-8 bg-white/5 border-white/5">
                <CardContent className="p-6">
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-4 items-end">
                        <div>
                            <label className="text-xs text-muted-foreground uppercase mb-2 block font-bold">Subject</label>
                            <input
                                type="text"
                                value={selection.subject}
                                onChange={(e) => setSelection({ ...selection, subject: e.target.value })}
                                className="w-full bg-white/10 border border-white/10 rounded-lg px-4 py-2 text-sm focus:ring-2 focus:ring-purple-500 outline-none"
                            />
                        </div>
                        <div>
                            <label className="text-xs text-muted-foreground uppercase mb-2 block font-bold">Topic</label>
                            <input
                                type="text"
                                value={selection.topic}
                                onChange={(e) => setSelection({ ...selection, topic: e.target.value })}
                                className="w-full bg-white/10 border border-white/10 rounded-lg px-4 py-2 text-sm focus:ring-2 focus:ring-purple-500 outline-none"
                            />
                        </div>
                        <div>
                            <label className="text-xs text-muted-foreground uppercase mb-2 block font-bold">Difficulty</label>
                            <select
                                value={selection.difficulty}
                                onChange={(e) => setSelection({ ...selection, difficulty: e.target.value })}
                                className="w-full bg-white/10 border border-white/10 rounded-lg px-4 py-2 text-sm focus:ring-2 focus:ring-purple-500 outline-none"
                            >
                                <option value="easy">Easy</option>
                                <option value="medium">Medium</option>
                                <option value="hard">Hard</option>
                            </select>
                        </div>
                        <Button
                            onClick={fetchMCQs}
                            disabled={isLoading}
                            className="bg-purple-600 hover:bg-purple-700 h-10 gap-2"
                        >
                            {isLoading ? <Zap className="animate-spin" size={16} /> : <Zap size={16} />}
                            Generate MCQs
                        </Button>
                    </div>
                </CardContent>
            </Card>

            {/* Stats Grid */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8 opacity-60 grayscale hover:grayscale-0 transition-all">
                {stats.map((stat, idx) => (
                    <Card key={idx} className="bg-white/5 border-white/5">
                        <CardContent className="p-4">
                            <div className={`mb-2 p-2 bg-${stat.color}-500/10 rounded-lg w-fit`}>
                                <stat.icon className={`text-${stat.color}-400`} size={20} />
                            </div>
                            <div className="text-2xl font-bold mb-1">{stat.value}</div>
                            <div className="text-xs text-muted-foreground">{stat.label}</div>
                        </CardContent>
                    </Card>
                ))}
            </div>

            {/* Mode Selection */}
            <div className="flex gap-4 mb-8 overflow-x-auto no-scrollbar">
                {[
                    { id: "mcq", label: "MCQ Practice", icon: Target, desc: "Test your knowledge" },
                    { id: "coding", label: "Coding Challenges", icon: Code2, desc: "Solve problems" },
                    { id: "mock", label: "Mock Tests", icon: Trophy, desc: "Full length exams" }
                ].map((mode) => (
                    <button
                        key={mode.id}
                        onClick={() => setActiveMode(mode.id as any)}
                        className={`flex-1 min-w-[200px] p-4 rounded-xl border-2 transition-all ${activeMode === mode.id
                            ? "bg-secondary/10 border-secondary shadow-lg shadow-secondary/20"
                            : "bg-white/5 border-white/5 hover:bg-white/10"
                            }`}
                    >
                        <div className="flex items-center gap-3 mb-2">
                            <mode.icon size={20} className={activeMode === mode.id ? "text-secondary" : "text-muted-foreground"} />
                            <h3 className={`font-bold ${activeMode === mode.id ? "text-secondary" : ""}`}>
                                {mode.label}
                            </h3>
                        </div>
                        <p className="text-xs text-muted-foreground text-left">{mode.desc}</p>
                    </button>
                ))}
            </div>

            {/* Content Area */}
            <div className="grid lg:grid-cols-3 gap-8">

                {/* Main Practice Area */}
                <div className="lg:col-span-2">

                    {activeMode === "mcq" && (
                        <Card className="bg-white/5 border-white/5">
                            <CardHeader>
                                <div className="flex items-center justify-between">
                                    <CardTitle className="flex items-center gap-2">
                                        <Target className="text-blue-400" size={20} />
                                        MCQ Practice
                                    </CardTitle>
                                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                                        <Clock size={16} />
                                        <span>No time limit</span>
                                    </div>
                                </div>
                            </CardHeader>
                            <CardContent className="space-y-6">

                                {/* Question Card */}
                                <div className="p-6 bg-black/20 rounded-xl border border-white/5">
                                    <div className="flex items-start justify-between mb-4">
                                        <span className="px-3 py-1 bg-blue-500/10 text-blue-400 text-xs font-bold rounded-full border border-blue-500/20">
                                            Question {currentQuestion + 1} of 10
                                        </span>
                                        <span className="px-3 py-1 bg-yellow-500/10 text-yellow-400 text-xs font-bold rounded-full border border-yellow-500/20">
                                            Medium
                                        </span>
                                    </div>

                                    <h3 className="text-lg font-medium mb-6 leading-relaxed">
                                        {mcqQuestion.question}
                                    </h3>

                                    {/* Options */}
                                    <div className="space-y-3">
                                        {mcqQuestion.options.map((option: string, idx: number) => (
                                            <button
                                                key={idx}
                                                onClick={() => {
                                                    setSelectedAnswer(idx);
                                                    setShowResult(false);
                                                }}
                                                disabled={showResult}
                                                className={`w-full p-4 text-left rounded-lg border-2 transition-all ${showResult
                                                    ? idx === mcqQuestion.correct
                                                        ? "bg-green-500/10 border-green-500/50 text-green-400"
                                                        : idx === selectedAnswer
                                                            ? "bg-red-500/10 border-red-500/50 text-red-400"
                                                            : "bg-white/5 border-white/5"
                                                    : selectedAnswer === idx
                                                        ? "bg-secondary/10 border-secondary text-secondary"
                                                        : "bg-white/5 border-white/5 hover:bg-white/10 hover:border-white/20"
                                                    }`}
                                            >
                                                <div className="flex items-center gap-3">
                                                    <div className={`h-6 w-6 rounded-full flex items-center justify-center text-xs font-bold ${showResult && idx === mcqQuestion.correct
                                                        ? "bg-green-500 text-white"
                                                        : showResult && idx === selectedAnswer
                                                            ? "bg-red-500 text-white"
                                                            : selectedAnswer === idx
                                                                ? "bg-secondary text-white"
                                                                : "bg-white/10"
                                                        }`}>
                                                        {String.fromCharCode(65 + idx)}
                                                    </div>
                                                    <span className="text-sm">{option}</span>
                                                    {showResult && idx === mcqQuestion.correct && (
                                                        <CheckCircle2 size={18} className="ml-auto text-green-400" />
                                                    )}
                                                    {showResult && idx === selectedAnswer && idx !== mcqQuestion.correct && (
                                                        <XCircle size={18} className="ml-auto text-red-400" />
                                                    )}
                                                </div>
                                            </button>
                                        ))}
                                    </div>

                                    {/* Explanation */}
                                    {showResult && (
                                        <motion.div
                                            initial={{ opacity: 0, height: 0 }}
                                            animate={{ opacity: 1, height: "auto" }}
                                            className="mt-6 p-4 bg-blue-500/10 border border-blue-500/20 rounded-lg"
                                        >
                                            <h4 className="font-bold text-blue-400 mb-2 flex items-center gap-2">
                                                <Brain size={16} /> Explanation
                                            </h4>
                                            <p className="text-sm text-muted-foreground">{mcqQuestion.explanation}</p>
                                        </motion.div>
                                    )}
                                </div>

                                {/* Action Buttons */}
                                <div className="flex gap-3">
                                    {!showResult ? (
                                        <>
                                            <Button
                                                variant="outline"
                                                className="flex-1 border-white/10"
                                                onClick={() => setCurrentQuestion(Math.max(0, currentQuestion - 1))}
                                                disabled={currentQuestion === 0}
                                            >
                                                Previous
                                            </Button>
                                            <Button
                                                className="flex-1 bg-secondary hover:bg-secondary/90"
                                                onClick={() => setShowResult(true)}
                                                disabled={selectedAnswer === null}
                                            >
                                                Submit Answer
                                            </Button>
                                        </>
                                    ) : (
                                        <Button
                                            className="w-full bg-secondary hover:bg-secondary/90"
                                            onClick={() => {
                                                setCurrentQuestion(currentQuestion + 1);
                                                setSelectedAnswer(null);
                                                setShowResult(false);
                                            }}
                                        >
                                            Next Question →
                                        </Button>
                                    )}
                                </div>
                            </CardContent>
                        </Card>
                    )}

                    {activeMode === "coding" && (
                        <Card className="bg-white/5 border-white/5">
                            <CardHeader>
                                <CardTitle className="flex items-center gap-2">
                                    <Code2 className="text-green-400" size={20} />
                                    Coding Challenge
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div className="p-6 bg-black/20 rounded-xl border border-white/5">
                                    <div className="flex items-center gap-2 mb-4">
                                        <span className="px-2 py-1 bg-green-500/10 text-green-400 text-xs font-bold rounded-full">Easy</span>
                                        <span className="text-xs text-muted-foreground">• Array Manipulation</span>
                                    </div>

                                    <h3 className="text-lg font-bold mb-4">Two Sum Problem</h3>
                                    <p className="text-sm text-muted-foreground mb-4">
                                        Given an array of integers and a target sum, return indices of two numbers that add up to the target.
                                    </p>

                                    <div className="bg-black/40 p-4 rounded-lg font-mono text-xs mb-4">
                                        <span className="text-green-400">Input:</span> nums = [2,7,11,15], target = 9<br />
                                        <span className="text-blue-400">Output:</span> [0,1]
                                    </div>

                                    <Button className="w-full bg-green-600 hover:bg-green-700">
                                        <Play size={16} className="mr-2" />
                                        Start Coding
                                    </Button>
                                </div>
                            </CardContent>
                        </Card>
                    )}

                    {activeMode === "mock" && (
                        <Card className="bg-white/5 border-white/5">
                            <CardHeader>
                                <CardTitle className="flex items-center gap-2">
                                    <Trophy className="text-yellow-400" size={20} />
                                    Available Mock Tests
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                {["Data Structures Final", "DBMS Mid-Term", "Operating Systems Practice"].map((test, idx) => (
                                    <div key={idx} className="p-4 bg-white/5 rounded-lg hover:bg-white/10 transition-colors cursor-pointer border border-white/5">
                                        <div className="flex items-center justify-between mb-2">
                                            <h4 className="font-bold">{test}</h4>
                                            <span className="px-2 py-1 bg-purple-500/10 text-purple-400 text-xs rounded-full">50 Qs</span>
                                        </div>
                                        <div className="flex items-center gap-4 text-xs text-muted-foreground mb-3">
                                            <span>⏱ 90 mins</span>
                                            <span>🏆 Max: 100 pts</span>
                                            <span>📅 Valid till Dec 2024</span>
                                        </div>
                                        <Button size="sm" className="w-full bg-secondary hover:bg-secondary/90">
                                            Start Test
                                        </Button>
                                    </div>
                                ))}
                            </CardContent>
                        </Card>
                    )}

                </div>

                {/* Sidebar */}
                <div className="space-y-6">

                    {/* Performance Graph */}
                    <Card className="bg-white/5 border-white/5">
                        <CardHeader>
                            <CardTitle className="text-sm flex items-center gap-2">
                                <BarChart3 size={16} className="text-secondary" />
                                Performance Trends
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-3">
                                {[
                                    { topic: "Data Structures", score: 85 },
                                    { topic: "Algorithms", score: 72 },
                                    { topic: "DBMS", score: 90 },
                                    { topic: "OS", score: 65 }
                                ].map((item, idx) => (
                                    <div key={idx}>
                                        <div className="flex justify-between text-xs mb-1">
                                            <span className="text-muted-foreground">{item.topic}</span>
                                            <span className={`font-bold ${item.score >= 80 ? "text-green-400" : item.score >= 60 ? "text-yellow-400" : "text-red-400"}`}>
                                                {item.score}%
                                            </span>
                                        </div>
                                        <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                                            <div
                                                className={`h-full ${item.score >= 80 ? "bg-green-500" : item.score >= 60 ? "bg-yellow-500" : "bg-red-500"}`}
                                                style={{ width: `${item.score}%` }}
                                            />
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </CardContent>
                    </Card>

                    {/* Recommendations */}
                    <Card className="bg-purple-500/10 border-purple-500/20">
                        <CardContent className="p-4">
                            <div className="flex items-start gap-3">
                                <Brain className="text-purple-400 flex-shrink-0" size={20} />
                                <div>
                                    <h4 className="font-bold text-sm text-purple-400 mb-2">AI Recommendation</h4>
                                    <p className="text-xs text-muted-foreground mb-3">
                                        You're weak in Operating Systems. Practice 5 more problems to improve!
                                    </p>
                                    <Button size="sm" variant="outline" className="w-full text-xs border-purple-500/30 hover:bg-purple-500/10">
                                        View Suggestions
                                    </Button>
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                </div>
            </div>
        </div>
    );
}
