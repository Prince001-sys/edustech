"use client";

import { useLocation } from "react-router-dom";
import { Navbar } from "@/components/ui/Navbar";
import { Footer } from "@/components/ui/Footer";
import { MobileBottomNav } from "@/components/ui/MobileBottomNav";
import { OnboardingModal } from "@/components/OnboardingModal";

export function ConditionalWrapper({ children }: { children: React.ReactNode }) {
    const location = useLocation();
    const pathname = location.pathname;
    const isAiTutor = pathname?.startsWith("/ai-tutor");

    if (isAiTutor) {
        return (
            <>
                <main className="flex-1 relative z-0">
                    {children}
                </main>
            </>
        );
    }

    return (
        <>
            <Navbar />
            <OnboardingModal />
            <main className="flex-1 pb-24 md:pb-0 relative z-0">
                {children}
            </main>
            <MobileBottomNav />
            <Footer />
        </>
    );
}
