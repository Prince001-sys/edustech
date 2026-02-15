import { Link, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import {
  X,
  LayoutGrid,
  HelpCircle,
  FileText,
  ClipboardCheck,
  Zap,
  Calendar,
  BarChart,
  Briefcase,
  Settings,
  Rocket
} from "lucide-react";
import { cn } from "@/lib/utils";

const sidebarNavItems = [
  { href: "/aero", label: "Dashboard", icon: LayoutGrid },
  { href: "/aero/solver", label: "Smart Doubt Solver", icon: HelpCircle },
  { href: "/aero/notes", label: "AI Notes Generator", icon: FileText },
  { href: "/aero/mock-test", label: "Mock Test Generator", icon: ClipboardCheck },
  { href: "/aero/flashcards", label: "Flashcards", icon: Zap },
  { href: "/aero/planner", label: "Study Planner", icon: Calendar },
  { href: "/aero/analytics", label: "Performance Analytics", icon: BarChart },
  { href: "/aero/career", label: "Career & Internship AI", icon: Briefcase },
  { href: "/aero/settings", label: "Settings", icon: Settings },
];

export function AeroSidebar({ sidebarOpen, setSidebarOpen }: { sidebarOpen: boolean; setSidebarOpen: (open: boolean) => void; }) {
  const location = useLocation();
  const pathname = location.pathname;

  return (
    <>
      {/* Mobile Sidebar Overlay */}
      <div
        className={cn(
          "fixed inset-0 bg-black/50 z-50 md:hidden",
          sidebarOpen ? "block" : "hidden"
        )}
        onClick={() => setSidebarOpen(false)}
      />

      <aside
        className={cn(
          "fixed top-0 left-0 h-full w-64 bg-white dark:bg-slate-900 border-r border-slate-200 dark:border-slate-800 z-50 transform transition-transform duration-300 ease-in-out md:relative md:translate-x-0",
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        )}
      >
        <div className="flex items-center justify-between p-4 border-b border-slate-200 dark:border-slate-800">
          <Link to="/aero" className="flex items-center gap-2">
            <Rocket className="w-6 h-6 text-primary" />
            <span className="font-bold text-lg">Aero AI</span>
          </Link>
          <button
            onClick={() => setSidebarOpen(false)}
            className="md:hidden p-1 text-slate-500 hover:text-slate-800"
          >
            <X size={20} />
          </button>
        </div>
        <nav className="p-4">
          <ul>
            {sidebarNavItems.map((item) => (
              <li key={item.href}>
                <Link
                  to={item.href}
                  className={cn(
                    "flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors",
                    pathname === item.href
                      ? "bg-primary/10 text-primary"
                      : "text-slate-600 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-800"
                  )}
                >
                  <item.icon className="w-5 h-5" />
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </aside>
    </>
  );
}
