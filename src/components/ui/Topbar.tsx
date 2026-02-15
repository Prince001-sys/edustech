"use client";

import { Bell, Sun, UserCircle } from "lucide-react";

export const Topbar = () => {
  return (
    <div className="h-16 bg-white border-b border-gray-200 flex items-center justify-between px-8">
      <div>
        {/* Search bar or page title */}
      </div>
      <div className="flex items-center gap-4">
        <Sun className="text-gray-500 cursor-pointer" />
        <Bell className="text-gray-500 cursor-pointer" />
        <UserCircle className="text-gray-500 cursor-pointer" />
      </div>
    </div>
  );
};
