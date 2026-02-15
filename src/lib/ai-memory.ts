import { UserProfile, getUserProfile } from "./db";

export interface AIMemoryContext {
    name: string;
    department: string;
    year: string;
    weakTopics: string[];
    strongTopics: string[];
    recentActivity: string[];
}

/**
 * Fetches user context from Firestore to ground AI responses in personal academic data.
 */
export async function getAIMemoryContext(userId: string): Promise<AIMemoryContext | null> {
    try {
        const profile = await getUserProfile(userId);
        if (!profile) return null;

        // In a real app, we'd fetch these from specific collections
        // For now, we use the profile and some smart defaults/placeholder logic
        return {
            name: profile.name || "Student",
            department: profile.department || "Engineering",
            year: profile.year || "1st Year",
            weakTopics: (profile as any).weak_topics || [],
            strongTopics: (profile as any).strong_topics || [],
            recentActivity: [] // Could fetch from activities collection
        };
    } catch (error) {
        console.error("Error fetching AI Memory context:", error);
        return null;
    }
}

/**
 * Generates a system prompt prefix that guides the AI using the user's context.
 */
export function generatePersonalizedPrompt(context: AIMemoryContext | null): string {
    if (!context) return "";

    const weakTopicsStr = context.weakTopics.length > 0 
        ? `The student is currently struggling with: ${context.weakTopics.join(", ")}.` 
        : "";
    
    const strongTopicsStr = context.strongTopics.length > 0
        ? `They are strong in: ${context.strongTopics.join(", ")}.`
        : "";

    return `
[Aero AI Context]
User: ${context.name} (${context.year} ${context.department} student)
Goal: Success in semester exams and concept mastery.
${weakTopicsStr}
${strongTopicsStr}
Instruction: Tailor your explanations to their academic level. If they ask about a weak topic, provide extra step-by-step detail.
[/Aero AI Context]

`;
}
