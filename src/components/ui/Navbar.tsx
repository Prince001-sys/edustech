import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
    Rocket,
    Menu,
    X,
    LayoutDashboard,
    BookOpen,
    BrainCircuit,
    MessageSquare,
    Trophy,
    LogOut,
    ChevronRight
} from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import { Button } from "@/components/ui/Button";

export function Navbar() {
    const [scrolled, setScrolled] = useState(false);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const { user, signInWithGoogle, logout } = useAuth();
    const location = useLocation();
    const pathname = location.pathname;

    useEffect(() => {
        const handleScroll = () => setScrolled(window.scrollY > 10);
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    // Lock body scroll when mobile menu is open
    useEffect(() => {
        if (mobileMenuOpen) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "unset";
        }
        return () => {
            document.body.style.overflow = "unset";
        };
    }, [mobileMenuOpen]);

    const navLinks = [

        { name: 'Home', href: '/' },
        { name: 'Resources', href: '/resources' },
        { name: 'Video', href: '/videos' },
        { name: 'Library', href: '/books' },
        { name: 'AI Tutor', href: '/ai-tutor' },
        { name: 'Connect', href: '/community' },
        { name: 'Projects', href: '/showcase' },
        { name: 'Internship', href: '/internships' },
    ];

    return (
        <>
            <motion.nav 
                initial={{ y: -100 }}
                animate={{ y: 0 }}
                className={`fixed top-0 w-full z-50 transition-all duration-300 ${scrolled ? "bg-white/90 backdrop-blur-md border-b border-slate-200 py-3 shadow-sm" : "py-5 bg-transparent"}`}
            >
                <div className="container mx-auto px-4 flex items-center justify-between">
                    <Link to="/" className="flex items-center gap-2 group flex-shrink-0 z-50 relative">
                        <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center shadow-lg shadow-blue-500/20 group-hover:scale-110 transition-transform">
                            <Rocket className="text-white h-6 w-6" />
                        </div>
                        <span className="text-xl font-black tracking-tighter bg-clip-text text-transparent bg-gradient-to-r from-slate-800 to-slate-600 hidden xl:block">
                            AEROPHYSICS
                        </span>
                        <span className="text-xl font-black tracking-tighter bg-clip-text text-transparent bg-gradient-to-r from-slate-800 to-slate-600 xl:hidden">
                            AP
                        </span>
                    </Link>

                    {/* Desktop Nav */}
                    <div className="hidden xl:flex items-center gap-4">
                        {navLinks.map((item) => (
                            <Link
                                key={item.href}
                                to={item.href}
                                className={`text-[13px] font-bold uppercase tracking-wide transition-all px-3 py-1 rounded-full ${pathname === item.href ? "text-primary bg-primary/10" : "text-slate-500 hover:text-slate-800 hover:bg-slate-100"}`}
                            >
                                {item.name}
                            </Link>
                        ))}

                        {user ? (
                            <div className="flex items-center gap-4 border-l border-slate-200 pl-4">
                                <Link to="/dashboard" className="text-xs text-primary font-bold uppercase tracking-wider hover:text-primary/80 transition-colors">
                                    {user.displayName?.split(' ')[0]}
                                </Link>
                                <Button
                                    variant="ghost"
                                    size="icon"
                                    onClick={() => logout()}
                                    className="text-slate-400 hover:text-red-500 hover:bg-red-50 h-8 w-8 rounded-full"
                                >
                                    <LogOut size={16} />
                                </Button>
                            </div>
                        ) : (
                            <div className="flex flex-col items-center">
                                <Button
                                    size="sm"
                                    onClick={() => signInWithGoogle()}
                                    className="rounded-full bg-primary hover:bg-primary/90 text-white border-0 px-6 font-bold shadow-lg shadow-blue-500/20 h-10 transition-all hover:scale-105"
                                >
                                    Sign In
                                </Button>
                            </div>
                        )}
                    </div>

                    {/* Mobile Menu Toggle */}
                    <button
                        className="xl:hidden p-2 text-slate-700 hover:text-slate-900 z-50 relative bg-white/50 rounded-full backdrop-blur-md border border-slate-200 shadow-sm"
                        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                    >
                        {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
                    </button>
                </div>
            </motion.nav>

            {/* Full Screen Mobile Menu Overlay */}
            <AnimatePresence>
                {mobileMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.2 }}
                        className="fixed inset-0 z-40 bg-[#020617]/95 backdrop-blur-2xl xl:hidden flex flex-col pt-24 px-6 pb-safe"
                    >
                        <motion.div
                            className="flex-1 flex flex-col space-y-2 overflow-y-auto no-scrollbar"
                            initial="closed"
                            animate="open"
                            exit="closed"
                            variants={{
                                open: { transition: { staggerChildren: 0.05, delayChildren: 0.1 } },
                                closed: { transition: { staggerChildren: 0.05, staggerDirection: -1 } }
                            }}
                        >
                            {navLinks.map((link) => {
                                const isActive = pathname === link.href;
                                return (
                                    <motion.div
                                        key={link.href}
                                        variants={{
                                            open: { opacity: 1, x: 0 },
                                            closed: { opacity: 0, x: -20 }
                                        }}
                                    >
                                        <Link
                                            to={link.href}
                                            onClick={() => setMobileMenuOpen(false)}
                                            className={`flex items-center justify-between p-4 rounded-2xl transition-all duration-200 border border-transparent ${isActive
                                                ? "bg-blue-600/20 border-blue-500/30 text-blue-400 shadow-lg shadow-blue-900/20"
                                                : "hover:bg-white/5 hover:border-white/5 text-white/80"
                                                }`}
                                        >
                                            <span className={`font-black tracking-tight text-lg ${isActive ? "text-blue-400" : "text-white"}`}>
                                                {link.name}
                                            </span>
                                            <ChevronRight size={20} className={isActive ? "text-blue-400" : "text-white/20"} />
                                        </Link>
                                    </motion.div>
                                );
                            })}
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.3 }}
                            className="mt-6 border-t border-white/10 pt-6 pb-8"
                        >
                            {!user ? (
                                <Button
                                    className="w-full h-14 rounded-2xl bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-500 hover:to-blue-400 font-bold text-lg shadow-xl shadow-blue-500/20"
                                    onClick={() => {
                                        signInWithGoogle();
                                        setMobileMenuOpen(false);
                                    }}
                                >
                                    Sign In to Aerophysics
                                </Button>
                            ) : (
                                <div className="flex items-center justify-between p-4 bg-white/5 rounded-2xl border border-white/5">
                                    <div className="flex items-center gap-3">
                                        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center text-white font-bold">
                                            {user.displayName?.charAt(0)}
                                        </div>
                                        <div>
                                            <div className="font-bold text-white">{user.displayName}</div>
                                            <div className="text-xs text-white/50">{user.email}</div>
                                        </div>
                                    </div>
                                    <Button
                                        variant="ghost"
                                        size="icon"
                                        onClick={() => logout()}
                                        className="text-red-400 hover:bg-red-500/10 rounded-xl"
                                    >
                                        <LogOut size={20} />
                                    </Button>
                                </div>
                            )}
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
}
