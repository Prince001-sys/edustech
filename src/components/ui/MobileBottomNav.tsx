import { Link, useLocation } from "react-router-dom";
import {
    LayoutDashboard,
    BookOpen,
    BrainCircuit,
    MessageSquare,
    Trophy,
    Rocket
} from "lucide-react";
import { motion } from "framer-motion";

export function MobileBottomNav() {
    const location = useLocation();
    const pathname = location.pathname;

    const navItems = [
        {
            icon: <Rocket size={20} />,
            label: "Aero",
            href: "/aero",
            isActive: (path: string) => path.startsWith("/aero")
        },
        {
            icon: <LayoutDashboard size={20} />,
            label: "Home",
            href: "/",
            isActive: (path: string) => path === "/"
        },
        {
            icon: <BookOpen size={20} />,
            label: "Res",
            href: "/resources",
            isActive: (path: string) => path.startsWith("/resources")
        },
        {
            icon: <BrainCircuit size={20} />,
            label: "AI",
            href: "/ai-tutor",
            isActive: (path: string) => path.startsWith("/ai-tutor")
        },
        {
            icon: <Trophy size={20} />,
            label: "Stats",
            href: "/dashboard",
            isActive: (path: string) => path.startsWith("/dashboard")
        }
    ];

    return (
        <div className="md:hidden fixed bottom-6 left-1/2 -translate-x-1/2 z-50 w-[92%] max-w-[400px]">
            <div className="bg-white/80 backdrop-blur-xl border border-white/20 rounded-[2rem] p-2 flex justify-between items-center shadow-neu-dark/10 ring-1 ring-white/20">
                {navItems.map((nav, i) => {
                    const active = nav.isActive(pathname);
                    return (
                        <Link
                            key={i}
                            to={nav.href}
                            className={`relative flex flex-col items-center justify-center gap-1 w-full py-3 rounded-2xl transition-all duration-300 ${active ? "text-primary" : "text-slate-400 hover:text-slate-600"
                                }`}
                        >
                            {/* Active Indicator Background */}
                            {active && (
                                <motion.span 
                                    layoutId="bottomNav"
                                    className="absolute inset-0 bg-primary/10 rounded-2xl -z-10" 
                                />
                            )}

                            <div className={`transition-transform duration-300 ${active ? "scale-110 -translate-y-0.5" : ""}`}>
                                {nav.icon}
                            </div>

                            <span className={`text-[10px] font-black uppercase tracking-tight transition-all duration-300 ${active ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2 hidden"}`}>
                                {nav.label}
                            </span>
                        </Link>
                    );
                })}
            </div>
        </div>
    );
}
