import { Link, useLocation } from "react-router-dom";
import {
  LayoutGrid,
  FileText,
  ClipboardList,
  Zap,
  Target,
  BarChart,
  Briefcase,
  Settings,
  Rocket,
  BrainCircuit,
  HelpCircle,
} from "lucide-react";
import { cn } from "@/lib/utils";

const sidebarItems = [
  { name: "Aero Hub", href: "/ai-tutor", icon: LayoutGrid },
  { name: "AI Notes", href: "/ai-tutor/notes", icon: FileText },
  { name: "Mock Tests", href: "/ai-tutor/tests", icon: ClipboardList },
  { name: "Performance", href: "/ai-tutor/analytics", icon: BarChart },
  { name: "Career Path", href: "/ai-tutor/career", icon: Briefcase },
  { name: "Settings", href: "/ai-tutor/settings", icon: Settings },
];

const SidebarItem = ({ item }: { item: typeof sidebarItems[0] }) => {
  const location = useLocation();
  const pathname = location.pathname;
  const isActive = pathname === item.href;

  return (
    <Link
      to={item.href}
      className={cn(
        "flex items-center px-4 py-3 text-sm font-black rounded-2xl transition-all duration-300 gap-3 group",
        isActive
          ? "bg-blue-600 text-white shadow-lg shadow-blue-500/20"
          : "text-slate-500 hover:bg-slate-50 hover:text-slate-900"
      )}
    >
      <item.icon className={cn(
        "w-5 h-5 transition-transform duration-300 group-hover:scale-110",
        isActive ? "text-white" : "text-slate-400 group-hover:text-blue-500"
      )} />
      {item.name}
    </Link>
  );
};

export const Sidebar = () => {
  return (
    <div className="w-72 bg-white border-r border-slate-100 p-6 flex flex-col h-full shadow-[4px_0_24px_rgba(0,0,0,0.02)]">
      <div className="mb-10 px-4">
        <Link to="/" className="flex items-center gap-3">
          <div className="h-10 w-10 rounded-xl bg-blue-600 flex items-center justify-center text-white shadow-lg shadow-blue-500/30">
            <Rocket size={24} />
          </div>
          <span className="text-xl font-black text-slate-800 tracking-tight">Aero AI</span>
        </Link>
      </div>

      <nav className="flex-1 space-y-2">
        <div className="px-4 mb-4">
          <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Platform</p>
        </div>
        {sidebarItems.map((item) => (
          <SidebarItem key={item.name} item={item} />
        ))}
      </nav>

      <div className="mt-auto px-4 pt-6 border-t border-slate-50">
        <div className="bg-slate-900 rounded-3xl p-5 text-white relative overflow-hidden group transition-all hover:scale-[1.02]">
            <p className="text-[10px] font-black text-blue-400 uppercase mb-1">Status</p>
            <p className="text-xs font-bold relative z-10 italic">"Vertex-1 Powered"</p>
            <BrainCircuit size={48} className="absolute -right-4 -bottom-4 text-white/5 group-hover:rotate-12 transition-transform" />
        </div>
      </div>
    </div>
  );
};
