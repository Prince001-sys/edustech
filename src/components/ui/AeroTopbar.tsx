import { Menu, Bell, User } from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import { Button } from "@/components/ui/Button";

export function AeroTopbar({ setSidebarOpen }: { setSidebarOpen: (open: boolean) => void; }) {
  const { user } = useAuth();

  return (
    <header className="sticky top-0 z-40 flex items-center justify-between px-4 sm:px-6 lg:px-8 h-16 bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800">
      <div className="flex items-center gap-4">
        <button
          onClick={() => setSidebarOpen(true)}
          className="md:hidden p-1 text-slate-500 hover:text-slate-800"
        >
          <Menu size={24} />
        </button>
        <h1 className="text-lg font-semibold hidden md:block">Aero AI</h1>
      </div>
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="icon" className="rounded-full">
          <Bell size={20} />
        </Button>
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-full bg-slate-200 dark:bg-slate-700 flex items-center justify-center">
            {user?.photoURL ? (
              <img src={user.photoURL} alt="User" className="rounded-full" />
            ) : (
              <User size={20} className="text-slate-500" />
            )}
          </div>
          <span className="hidden sm:inline text-sm font-medium">
            {user?.displayName || "Guest"}
          </span>
        </div>
      </div>
    </header>
  );
}
