"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/Button";
import { Check } from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import { saveUserProfile } from "@/lib/db";

export function OnboardingModal() {
    const { user, profile, loading, refreshProfile } = useAuth();
    const [isOpen, setIsOpen] = useState(false);
    const [step, setStep] = useState(1);
    const [isSaving, setIsSaving] = useState(false);
    const [data, setData] = useState({
        name: "",
        department: "",
        year: "",
    });

    useEffect(() => {
        // Only show onboarding if auth/profile loading is finished
        // AND user is logged in but hasn't completed onboarding
        if (loading) return;

        if (user && !profile?.onboardingComplete) {
            setIsOpen(true);
        } else {
            setIsOpen(false);
        }
    }, [user, profile, loading]);

    const handleComplete = async () => {
        if (!user) return;

        console.log("🚀 Completing onboarding...");
        setIsSaving(true);

        // Extended timeout for slow networks
        const timeoutPromise = new Promise((_, reject) =>
            setTimeout(() => reject(new Error("Network timeout: causing save delay.")), 30000)
        );

        try {
            await Promise.race([
                saveUserProfile(user.uid, {
                    name: data.name,
                    department: data.department,
                    year: data.year
                }),
                timeoutPromise
            ]);

            console.log("✅ Profile saved, refreshing...");
            await refreshProfile();
            setIsOpen(false);
            console.log("✨ Onboarding complete and profile refreshed");
        } catch (error: any) {
            console.error("❌ Failed to save profile:", error);
            // Don't close immediately on error, let user retry
            alert(`We couldn't save your details: ${error.message || "Unknown error"}. Please check your connection and try again.`);
        } finally {
            setIsSaving(false);
        }
    };

    const handleSkip = () => {
        setIsOpen(false);
        // We might want to set a local storage flag or similar if they skip
        // but for now just closing it is good.
    };

    const departments = ["CSE", "CSE-AI", "ECE", "ME", "CHE", "MSME"];
    const years = ["1st Year", "2nd Year", "3rd Year", "4th Year"];

    return (
        <AnimatePresence>
            {isOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.95 }}
                        className="w-full max-w-md overflow-hidden rounded-2xl bg-card border border-white/10 shadow-xl relative"
                    >
                        {/* Close button */}
                        <button
                            onClick={handleSkip}
                            className="absolute top-4 right-4 text-muted-foreground hover:text-white transition-colors p-2 z-10"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 6 6 18" /><path d="m6 6 12 12" /></svg>
                        </button>

                        <div className="p-8">
                            {step === 1 && (
                                <div className="space-y-6">
                                    <div className="text-center">
                                        <h2 className="text-2xl font-bold">Welcome to Aerophysics! 🚀</h2>
                                        <p className="text-muted-foreground mt-2">Let's get to know you better to personalize your experience.</p>
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-sm font-medium">What's your name?</label>
                                        <input
                                            type="text"
                                            className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-ring"
                                            placeholder="Enter your name"
                                            value={data.name}
                                            onChange={(e) => setData({ ...data, name: e.target.value })}
                                        />
                                    </div>
                                    <Button
                                        className="w-full h-12 bg-primary hover:bg-primary/90 text-white font-bold"
                                        disabled={!data.name}
                                        onClick={() => setStep(2)}
                                    >
                                        Next
                                    </Button>
                                </div>
                            )}

                            {step === 2 && (
                                <div className="space-y-6">
                                    <div className="text-center">
                                        <h2 className="text-2xl font-bold">Select Your Department</h2>
                                        <p className="text-muted-foreground mt-2">We'll show you relevant resources.</p>
                                    </div>
                                    <div className="grid grid-cols-2 gap-3">
                                        {departments.map((dept) => (
                                            <button
                                                key={dept}
                                                onClick={() => setData({ ...data, department: dept })}
                                                className={`p-3 rounded-lg border text-sm font-medium transition-all ${data.department === dept
                                                    ? "border-secondary bg-secondary/10 text-secondary"
                                                    : "border-input hover:border-white/20 hover:bg-accent/5"
                                                    }`}
                                            >
                                                <div className="flex justify-between items-center w-full">
                                                    {dept}
                                                    {data.department === dept && <Check size={14} />}
                                                </div>
                                            </button>
                                        ))}
                                    </div>
                                    <div className="flex gap-3">
                                        <Button variant="outline" className="w-1/3" onClick={() => setStep(1)}>Back</Button>
                                        <Button
                                            className="w-2/3 h-12 bg-primary hover:bg-primary/90 text-white font-bold"
                                            disabled={!data.department}
                                            onClick={() => setStep(3)}
                                        >
                                            Next
                                        </Button>
                                    </div>
                                </div>
                            )}

                            {step === 3 && (
                                <div className="space-y-6">
                                    <div className="text-center">
                                        <h2 className="text-2xl font-bold">Which Year are you in?</h2>
                                        <p className="text-muted-foreground mt-2">To recommend the right study materials.</p>
                                    </div>
                                    <div className="space-y-2">
                                        {years.map((year) => (
                                            <button
                                                key={year}
                                                onClick={() => setData({ ...data, year: year })}
                                                className={`w-full p-3 rounded-lg border text-left text-sm font-medium transition-all flex justify-between items-center ${data.year === year
                                                    ? "border-secondary bg-secondary/10 text-secondary"
                                                    : "border-input hover:border-white/20 hover:bg-accent/5"
                                                    }`}
                                            >
                                                {year}
                                                {data.year === year && <Check size={16} />}
                                            </button>
                                        ))}
                                    </div>
                                    <div className="flex gap-3">
                                        <Button
                                            variant="outline"
                                            className="w-1/3 h-12 border-white/20 hover:bg-white/5"
                                            onClick={() => setStep(2)}
                                        >
                                            Back
                                        </Button>
                                        <Button
                                            className="w-2/3 h-12 bg-secondary hover:bg-secondary/90 text-white font-bold shadow-lg shadow-secondary/20"
                                            disabled={!data.year || isSaving}
                                            onClick={handleComplete}
                                        >
                                            {isSaving ? (
                                                <div className="flex items-center gap-2">
                                                    <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                                                    Saving...
                                                </div>
                                            ) : (
                                                "Get Started 🚀"
                                            )}
                                        </Button>
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* Progress Bar */}
                        <div className="h-1 w-full bg-secondary/10">
                            <motion.div
                                className="h-full bg-gradient-to-r from-secondary to-accent"
                                animate={{ width: `${(step / 3) * 100}%` }}
                            />
                        </div>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
}
