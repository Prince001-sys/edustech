
import React, { createContext, useContext, useEffect, useState } from "react";
import { useAuth } from "./AuthContext";
// Removed Firebase imports
import { 
    UserNote, TestResult, Flashcard, Task,
    getUserNotes, getUserTestResults, getUserFlashcards, getUserTasks
} from "@/lib/db";

interface AeroContextType {
    notes: UserNote[];
    testResults: TestResult[];
    flashcards: Flashcard[];
    tasks: Task[];
    roadmaps: any[];
    loading: {
        notes: boolean;
        tests: boolean;
        cards: boolean;
        tasks: boolean;
        roadmaps: boolean;
    };
}

const AeroContext = createContext<AeroContextType>({} as AeroContextType);

export function AeroProvider({ children }: { children: React.ReactNode }) {
    const { user } = useAuth();
    const [notes, setNotes] = useState<UserNote[]>([]);
    const [testResults, setTestResults] = useState<TestResult[]>([]);
    const [flashcards, setFlashcards] = useState<Flashcard[]>([]);
    const [tasks, setTasks] = useState<Task[]>([]);
    const [roadmaps, setRoadmaps] = useState<any[]>([]);
    
    const [loading, setLoading] = useState({
        notes: true,
        tests: true,
        cards: true,
        tasks: true,
        roadmaps: true
    });

    useEffect(() => {
        if (!user) {
            setNotes([]);
            setTestResults([]);
            setFlashcards([]);
            setTasks([]);
            setLoading({
                notes: false,
                tests: false,
                cards: false,
                tasks: false,
                roadmaps: false
            });
            return;
        }

        // Simulating Realtime Updates with polling (or just one-time fetch for now)
        const fetchData = async () => {
            try {
                const [n, t, f, k] = await Promise.all([
                    getUserNotes(user.uid),
                    getUserTestResults(user.uid),
                    getUserFlashcards(user.uid),
                    getUserTasks(user.uid)
                ]);

                setNotes(n);
                setTestResults(t);
                setFlashcards(f);
                setTasks(k);
                
                // Mock roadmaps
                setRoadmaps([]);
            } catch (e) {
                console.error("Error fetching aero mock data", e);
            } finally {
                setLoading({
                    notes: false,
                    tests: false,
                    cards: false,
                    tasks: false,
                    roadmaps: false
                });
            }
        };

        fetchData();
        
        // Polling every 5 seconds to simulate updates
        const interval = setInterval(fetchData, 5000);
        return () => clearInterval(interval);

    }, [user]);

    const value = {
        notes,
        testResults,
        flashcards,
        tasks,
        roadmaps,
        loading
    };

    return (
        <AeroContext.Provider value={value}>
            {children}
        </AeroContext.Provider>
    );
}

export const useAero = () => useContext(AeroContext);
