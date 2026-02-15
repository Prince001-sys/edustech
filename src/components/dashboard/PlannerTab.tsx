"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useAuth } from "@/context/AuthContext";
import { addTask, getUserTasks, updateTaskStatus, Task } from "@/lib/db";
import {
    Calendar as CalendarIcon,
    Plus,
    Target,
    Clock,
    TrendingUp,
    CheckCircle2,
    AlertCircle,
    ChevronLeft,
    ChevronRight,
    Zap
} from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";

export function PlannerTab() {
    const { user } = useAuth();
    const [selectedDate, setSelectedDate] = useState(new Date());
    const [showAddTask, setShowAddTask] = useState(false);
    const [tasks, setTasks] = useState<Task[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [newTask, setNewTask] = useState({
        title: "",
        subject: "General",
        date: new Date().toISOString().split('T')[0],
        time: "10:00",
        priority: "medium" as const
    });

    // Fetch tasks on load
    useEffect(() => {
        async function fetchTasks() {
            if (user) {
                try {
                    const fetchedTasks = await getUserTasks(user.uid);
                    setTasks(fetchedTasks);
                } catch (e) {
                    console.error(e);
                } finally {
                    setIsLoading(false);
                }
            } else {
                setTasks([]);
                setIsLoading(false);
            }
        }
        fetchTasks();
    }, [user]);

    const handleAddTask = async () => {
        if (!user) return alert("Please login first!");
        try {
            const taskData = {
                userId: user.uid,
                title: newTask.title,
                subject: newTask.subject,
                date: newTask.date,
                time: newTask.time,
                status: 'pending' as const,
                priority: newTask.priority
            };
            const createdTask = await addTask(taskData);
            setTasks([...tasks, createdTask]);
            setShowAddTask(false);
            setNewTask({ ...newTask, title: "" }); // Reset title
        } catch (e) {
            alert("Failed to add task");
        }
    };

    const handleToggleStatus = async (taskId: string, currentStatus: string) => {
        const newStatus = currentStatus === 'completed' ? 'pending' : 'completed';
        try {
            // Optimistic update
            setTasks(tasks.map(t => t.id === taskId ? { ...t, status: newStatus } : t));
            await updateTaskStatus(taskId, newStatus);
        } catch (e) {
            console.error(e);
            // Revert on error
            setTasks(tasks);
        }
    };

    const todaysTasks = tasks.filter(task => task.date === selectedDate.toISOString().split('T')[0]);
    const completedToday = todaysTasks.filter(t => t.status === "completed").length;
    const totalToday = todaysTasks.length;


    const [showRoadmapModal, setShowRoadmapModal] = useState(false);
    const [roadmapParams, setRoadmapParams] = useState({
        subject: "",
        duration: "4 weeks",
        level: "Intermediate",
        hoursPerWeek: 10
    });
    const [roadmap, setRoadmap] = useState<any>(null);
    const [generating, setGenerating] = useState(false);

    const handleGenerateRoadmap = async () => {
        setGenerating(true);
        try {
            const res = await fetch("http://localhost:8000/api/generate/roadmap", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(roadmapParams)
            });
            const data = await res.json();
            if (data.error) throw new Error(data.error);
            setRoadmap(data);
            setShowRoadmapModal(false);
        } catch (e) {
            console.error("Roadmap generation failed", e);
            alert("Failed to generate roadmap. Ensure backend is running or try again later.");
        } finally {
            setGenerating(false);
        }
    };

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex items-start justify-between mb-8">
                <div>
                    <div className="flex items-center gap-3 mb-2">
                        <CalendarIcon className="text-blue-500" size={32} />
                        <h2 className="text-3xl font-bold">Smart Study Planner</h2>
                    </div>
                </div>
                <div className="flex gap-3">
                    <Button 
                        variant="outline" 
                        className="gap-2 border-purple-500/50 text-purple-400 hover:bg-purple-500/10"
                        onClick={() => setShowRoadmapModal(true)}
                    >
                        <Zap size={18} />
                        AI Roadmap
                    </Button>
                    <Button className="bg-blue-600 hover:bg-blue-700 gap-2" onClick={() => setShowAddTask(true)}>
                        <Plus size={18} />
                        Add Task
                    </Button>
                </div>
            </div>

            {/* AI Roadmap Display */}
            {roadmap && (
                <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mb-8"
                >
                    <Card className="bg-gradient-to-br from-purple-900/20 to-blue-900/20 border-purple-500/30">
                        <CardHeader>
                            <CardTitle className="flex justify-between">
                                <span>🚀 {roadmap.title}</span>
                                <Button variant="ghost" size="sm" onClick={() => setRoadmap(null)}>Close</Button>
                            </CardTitle>
                            <p className="text-muted-foreground">{roadmap.description}</p>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-6">
                                {roadmap.weeks?.map((week: any, idx: number) => (
                                    <div key={idx} className="bg-black/20 p-4 rounded-xl border border-white/5">
                                        <h3 className="font-bold text-lg mb-2 text-purple-300">Week {week.week}: {week.title}</h3>
                                        <div className="grid md:grid-cols-2 gap-4">
                                            <div>
                                                <h4 className="text-xs font-bold uppercase text-muted-foreground mb-2">Topics</h4>
                                                <ul className="list-disc list-inside text-sm space-y-1 text-gray-300">
                                                    {week.topics?.map((t: string, i: number) => <li key={i}>{t}</li>)}
                                                </ul>
                                            </div>
                                            <div>
                                                <h4 className="text-xs font-bold uppercase text-muted-foreground mb-2">Activities</h4>
                                                <ul className="list-check list-inside text-sm space-y-1 text-gray-300">
                                                    {week.activities?.map((a: string, i: number) => <li key={i}>✅ {a}</li>)}
                                                </ul>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </CardContent>
                    </Card>
                </motion.div>
            )}

            {/* Stats Overview */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                {[
                    { label: "Tasks Today", value: `${completedToday}/${totalToday}`, icon: Target, color: "blue" },
                   // { label: "Study Streak", value: "0 days", icon: TrendingUp, color: "green" }, // Hidden until implemented
                   // { label: "Hours This Week", value: "0h", icon: Clock, color: "purple" }, // Hidden until implemented
                   // { label: "Next Exam", value: "-", icon: AlertCircle, color: "red" } // Hidden until implemented
                ].map((stat, idx) => (
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

            <div className="grid lg:grid-cols-3 gap-8">

                {/* Main Content */}
                <div className="lg:col-span-2 space-y-6">

                    {/* Today's Tasks */}
                    <Card className="bg-white/5 border-white/5">
                        <CardHeader>
                            <CardTitle className="flex items-center justify-between">
                                <span className="flex items-center gap-2">
                                    <CheckCircle2 className="text-green-400" size={20} />
                                    Today's Tasks
                                </span>
                                <span className="text-sm text-muted-foreground">
                                    {completedToday} of {totalToday} completed
                                </span>
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-3">
                            {isLoading ? (
                                <div className="text-center py-4 text-muted-foreground">Loading tasks...</div>
                            ) : todaysTasks.map((task, idx) => (
                                <motion.div
                                    key={task.id}
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: idx * 0.1 }}
                                    className={`p-4 rounded-lg border transition-all ${task.status === "completed"
                                        ? "bg-green-500/10 border-green-500/20"
                                        : "bg-white/5 border-white/5 hover:bg-white/10"
                                        }`}
                                >
                                    <div className="flex items-start gap-3">
                                        <button
                                            onClick={() => handleToggleStatus(task.id!, task.status)}
                                            className={`mt-1 h-5 w-5 rounded border-2 flex items-center justify-center transition-colors ${task.status === "completed"
                                                ? "bg-green-500 border-green-500"
                                                : "border-white/20 hover:border-secondary"
                                                }`}>
                                            {task.status === "completed" && (
                                                <CheckCircle2 size={12} className="text-white" />
                                            )}
                                        </button>
                                        <div className="flex-1">
                                            <div className="flex items-start justify-between mb-2">
                                                <h4 className={`font-bold ${task.status === "completed" ? "line-through text-muted-foreground" : ""}`}>
                                                    {task.title}
                                                </h4>
                                                <span className={`px-2 py-1 text-xs rounded-full ${task.priority === "high"
                                                    ? "bg-red-500/10 text-red-400 border border-red-500/20"
                                                    : task.priority === "medium"
                                                        ? "bg-yellow-500/10 text-yellow-400 border border-yellow-500/20"
                                                        : "bg-blue-500/10 text-blue-400 border border-blue-500/20"
                                                    }`}>
                                                    {task.priority}
                                                </span>
                                            </div>
                                            <div className="flex items-center gap-4 text-xs text-muted-foreground">
                                                <span>📚 {task.subject}</span>
                                                <span>⏰ {task.time}</span>
                                            </div>
                                        </div>
                                    </div>
                                </motion.div>
                            ))}

                            {!isLoading && todaysTasks.length === 0 && (
                                <div className="text-center py-8 text-muted-foreground">
                                    <Target size={32} className="mx-auto mb-2 opacity-40" />
                                    <p>No tasks scheduled for today!</p>
                                </div>
                            )}
                        </CardContent>
                    </Card>

                    {/* Goals Tracker - REMOVED MOCK DATA */}
                    {/* <Card className="bg-white/5 border-white/5">
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <Target className="text-purple-400" size={20} />
                                Active Goals
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="text-center py-8 text-muted-foreground">
                            <p>No active goals. Add some soon!</p>
                        </CardContent>
                    </Card> */}

                </div>

                {/* Sidebar */}
                <div className="space-y-6">

                    {/* Mini Calendar */}
                    <Card className="bg-white/5 border-white/5">
                        <CardContent className="p-6">
                            <div className="flex items-center justify-between mb-4">
                                <h3 className="font-bold">{selectedDate.toLocaleString('default', { month: 'long', year: 'numeric' })}</h3>
                                <div className="flex gap-2">
                                    <button className="p-1 hover:bg-white/10 rounded" onClick={() => {
                                        const d = new Date(selectedDate);
                                        d.setMonth(d.getMonth() - 1);
                                        setSelectedDate(d);
                                    }}>
                                        <ChevronLeft size={16} />
                                    </button>
                                    <button className="p-1 hover:bg-white/10 rounded" onClick={() => {
                                        const d = new Date(selectedDate);
                                        d.setMonth(d.getMonth() + 1);
                                        setSelectedDate(d);
                                    }}>
                                        <ChevronRight size={16} />
                                    </button>
                                </div>
                            </div>

                            {/* Calendar Grid */}
                            <div className="grid grid-cols-7 gap-1 text-center">
                                {["S", "M", "T", "W", "T", "F", "S"].map((day, idx) => (
                                    <div key={idx} className="text-xs text-muted-foreground font-bold p-2">
                                        {day}
                                    </div>
                                ))}
                                {Array.from({ length: 30 }, (_, i) => i + 1).map((day) => (
                                    <button
                                        key={day}
                                        onClick={() => {
                                            const d = new Date(selectedDate);
                                            d.setDate(day);
                                            setSelectedDate(d);
                                        }}
                                        className={`p-2 text-xs rounded-lg transition-colors ${day === selectedDate.getDate()
                                            ? "bg-secondary text-white font-bold"
                                            : "hover:bg-white/5"
                                            }`}
                                    >
                                        {day}
                                    </button>
                                ))}
                            </div>
                        </CardContent>
                    </Card>

                    {/* Exam Countdown - REMOVED MOCK DATA */}
                    {/* <Card className="bg-red-500/10 border-red-500/20">
                        <CardContent className="p-6">
                            <h3 className="font-bold mb-4 flex items-center gap-2 text-red-400">
                                <AlertCircle size={18} />
                                Upcoming Exams
                            </h3>
                            <p className="text-xs text-muted-foreground">No upcoming exams.</p>
                        </CardContent>
                    </Card> */}

                </div>
            </div>

            {/* Add Task Modal */}
            {showAddTask && (
                <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4">
                    <Card className="bg-[#0f111a] border-white/10 max-w-md w-full">
                        <CardContent className="p-6">
                            <h3 className="text-xl font-bold mb-4">Add New Task</h3>

                            <div className="space-y-4 mb-6">
                                <div>
                                    <label className="text-sm text-muted-foreground mb-2 block">Task Title</label>
                                    <input
                                        type="text"
                                        value={newTask.title}
                                        onChange={(e) => setNewTask({ ...newTask, title: e.target.value })}
                                        placeholder="e.g., Complete Assignment 3"
                                        className="w-full bg-white/5 border border-white/10 px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-secondary/50 text-sm"
                                    />
                                </div>

                                <div>
                                    <label className="text-sm text-muted-foreground mb-2 block">Subject</label>
                                    <input
                                        type="text"
                                        value={newTask.subject}
                                        onChange={(e) => setNewTask({ ...newTask, subject: e.target.value })}
                                        placeholder="e.g., Data Structures"
                                        className="w-full bg-white/5 border border-white/10 px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-secondary/50 text-sm"
                                    />
                                </div>

                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <label className="text-sm text-muted-foreground mb-2 block">Date</label>
                                        <input
                                            type="date"
                                            value={newTask.date}
                                            onChange={(e) => setNewTask({ ...newTask, date: e.target.value })}
                                            className="w-full bg-white/5 border border-white/10 px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-secondary/50 text-sm"
                                        />
                                    </div>
                                    <div>
                                        <label className="text-sm text-muted-foreground mb-2 block">Time</label>
                                        <input
                                            type="time"
                                            value={newTask.time}
                                            onChange={(e) => setNewTask({ ...newTask, time: e.target.value })}
                                            className="w-full bg-white/5 border border-white/10 px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-secondary/50 text-sm"
                                        />
                                    </div>
                                </div>

                                <div>
                                    <label className="text-sm text-muted-foreground mb-2 block">Priority</label>
                                    <select
                                        value={newTask.priority}
                                        onChange={(e) => setNewTask({ ...newTask, priority: e.target.value as any })}
                                        className="w-full bg-white/5 border border-white/10 px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-secondary/50 text-sm">
                                        <option value="high">High</option>
                                        <option value="medium">Medium</option>
                                        <option value="low">Low</option>
                                    </select>
                                </div>
                            </div>

                            <div className="flex gap-3">
                                <Button
                                    variant="outline"
                                    className="flex-1 border-white/10"
                                    onClick={() => setShowAddTask(false)}
                                >
                                    Cancel
                                </Button>
                                <Button className="flex-1 bg-blue-600 hover:bg-blue-700" onClick={handleAddTask}>
                                    Add Task
                                </Button>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            )}

            {/* AI Roadmap Modal */}
            {showRoadmapModal && (
                <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4">
                    <Card className="bg-[#0f111a] border-white/10 max-w-md w-full">
                        <CardContent className="p-6">
                            <div className="flex items-center gap-3 mb-4">
                                <div className="p-2 bg-purple-500/10 rounded-lg">
                                    <Zap className="text-purple-400" size={24} />
                                </div>
                                <h3 className="text-xl font-bold">Generate Study Roadmap</h3>
                            </div>
                            <p className="text-sm text-muted-foreground mb-6">
                                Let AI create a personalized study schedule for you!
                            </p>

                            <div className="space-y-4 mb-6">
                                <div>
                                    <label className="text-sm text-muted-foreground mb-2 block">Subject / Goal</label>
                                    <input
                                        type="text"
                                        placeholder="e.g., Master React.js, Prepare for GATE Exam"
                                        value={roadmapParams.subject}
                                        onChange={(e) => setRoadmapParams({ ...roadmapParams, subject: e.target.value })}
                                        className="w-full bg-white/5 border border-white/10 px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500/50 text-sm"
                                    />
                                </div>

                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <label className="text-sm text-muted-foreground mb-2 block">Duration</label>
                                        <select
                                            value={roadmapParams.duration}
                                            onChange={(e) => setRoadmapParams({ ...roadmapParams, duration: e.target.value })}
                                            className="w-full bg-white/5 border border-white/10 px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500/50 text-sm">
                                            <option value="1 week">1 Week</option>
                                            <option value="2 weeks">2 Weeks</option>
                                            <option value="4 weeks">4 Weeks</option>
                                            <option value="8 weeks">8 Weeks</option>
                                        </select>
                                    </div>
                                    <div>
                                        <label className="text-sm text-muted-foreground mb-2 block">Level</label>
                                        <select
                                            value={roadmapParams.level}
                                            onChange={(e) => setRoadmapParams({ ...roadmapParams, level: e.target.value })}
                                            className="w-full bg-white/5 border border-white/10 px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500/50 text-sm">
                                            <option value="Beginner">Beginner</option>
                                            <option value="Intermediate">Intermediate</option>
                                            <option value="Advanced">Advanced</option>
                                        </select>
                                    </div>
                                </div>
                                <div>
                                    <label className="text-sm text-muted-foreground mb-2 block">Hours per Week</label>
                                    <input
                                        type="number"
                                        min="1"
                                        max="50"
                                        value={roadmapParams.hoursPerWeek}
                                        onChange={(e) => setRoadmapParams({ ...roadmapParams, hoursPerWeek: parseInt(e.target.value) })}
                                        className="w-full bg-white/5 border border-white/10 px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500/50 text-sm"
                                    />
                                </div>
                            </div>

                            <div className="flex gap-3">
                                <Button
                                    variant="outline"
                                    className="flex-1 border-white/10"
                                    onClick={() => setShowRoadmapModal(false)}
                                >
                                    Cancel
                                </Button>
                                <Button 
                                    className="flex-1 bg-purple-600 hover:bg-purple-700" 
                                    onClick={handleGenerateRoadmap} 
                                    disabled={generating || !roadmapParams.subject}
                                >
                                    {generating ? "Generating..." : "Generate Plan"}
                                </Button>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            )}
        </div>
    );
}
