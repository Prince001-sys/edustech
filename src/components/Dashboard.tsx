import { Link } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import {
    BookOpen,
    BrainCircuit,
    Code,
    Rocket,
    PlayCircle,
    MessageSquare,
    Trophy,
    Target,
    Clock,
    Zap,
    ArrowRight
} from "lucide-react";
import { motion } from "framer-motion";

export function Dashboard() {
    const { user, profile } = useAuth();

    // Quick access hubs
    const hubs = [
        {
            title: "Resource Library",
            icon: <BookOpen className="text-blue-400" />,
            desc: "Access syllabus, notes, and PYQs.",
            href: "/resources",
            color: "bg-blue-500/10 border-blue-500/20"
        },
        {
            title: "AI Tutor",
            icon: <BrainCircuit className="text-purple-400" />,
            desc: "Get instant answers with Gemini 1.5.",
            href: "/ai-tutor",
            color: "bg-purple-500/10 border-purple-500/20"
        },
        {
            title: "Coding Lab",
            icon: <Code className="text-green-400" />,
            desc: "Practice DSA and build projects.",
            href: "/coding",
            color: "bg-green-500/10 border-green-500/20"
        },
        {
            title: "Internship Hub",
            icon: <Rocket className="text-orange-400" />,
            desc: "Find career opportunities.",
            href: "/internships",
            color: "bg-orange-500/10 border-orange-500/20"
        },
        {
            title: "Community",
            icon: <MessageSquare className="text-pink-400" />,
            desc: "Discuss topics and join groups.",
            href: "/community",
            color: "bg-pink-500/10 border-pink-500/20"
        },
        {
            title: "Video Vault",
            icon: <PlayCircle className="text-red-400" />,
            desc: "Watch curated educational playlists.",
            href: "/videos",
            color: "bg-red-500/10 border-red-500/20"
        }
    ];

    // Stats (Mocked for now, can be connected to fetching logic later)
    const stats = [
        { label: "Study Streak", value: "3 Days", icon: <Zap size={14} className="text-yellow-400" /> },
        { label: "Tasks Done", value: "12", icon: <Target size={14} className="text-green-400" /> },
        { label: "Hours Learned", value: "8.5", icon: <Clock size={14} className="text-blue-400" /> },
    ];

    return (
        <div className="min-h-screen pt-24 pb-12 px-4 container mx-auto">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="mb-10"
            >
                <h1 className="text-3xl md:text-5xl font-black tracking-tighter mb-2">
                    Welcome back, <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">{profile?.name?.split(' ')[0] || user?.displayName?.split(' ')[0] || "Scholar"}</span>! 👋
                </h1>
                <p className="text-white/50 font-medium">
                    {profile?.department ? `${profile.department} • ${profile.year}` : "Let's start learning."}
                </p>
            </motion.div>

            {/* Stats Row */}
            <div className="grid grid-cols-3 gap-3 md:gap-6 mb-10">
                {stats.map((stat, i) => (
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: i * 0.1 }}
                        key={i}
                        className="p-4 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm"
                    >
                        <div className="flex items-center gap-2 mb-1 text-white/40 text-xs font-bold uppercase tracking-wider">
                            {stat.icon} {stat.label}
                        </div>
                        <div className="text-2xl md:text-3xl font-black">{stat.value}</div>
                    </motion.div>
                ))}
            </div>

            <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
                <Trophy size={20} className="text-yellow-400" /> Your Learning Hubs
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
                {hubs.map((hub, i) => (
                    <Link key={i} to={hub.href}>
                        <motion.div
                            whileHover={{ y: -5, scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            className={`p-6 rounded-3xl border h-full transition-all hover:bg-white/5 ${hub.color} bg-opacity-5 relative group overflow-hidden`}
                        >
                            <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />

                            <div className="relative z-10 flex flex-col h-full justify-between">
                                <div>
                                    <div className="h-10 w-10 rounded-xl bg-black/20 flex items-center justify-center mb-4">
                                        {hub.icon}
                                    </div>
                                    <h3 className="text-lg font-bold mb-2">{hub.title}</h3>
                                    <p className="text-sm text-white/50 leading-relaxed mb-4">{hub.desc}</p>
                                </div>

                                <div className="flex items-center text-xs font-black uppercase tracking-widest opacity-60 group-hover:opacity-100 transition-opacity">
                                    Open <ArrowRight size={12} className="ml-1" />
                                </div>
                            </div>
                        </motion.div>
                    </Link>
                ))}
            </div>
        </div>
    );
}
