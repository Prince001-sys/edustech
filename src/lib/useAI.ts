
import { useState } from 'react';

interface Message {
    role: 'user' | 'assistant';
    content: string;
}

// Full Brain AI Hook (connected to FastAPI)
export function useAI() {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const BACKEND_URL = import.meta.env.VITE_BACKEND_URL || "http://localhost:5000"; // Express Server

    const sendMessage = async (
        message: string,
        history: Message[] = [],
        onChunk: (chunk: string) => void,
        onComplete: () => void,
        userId?: string
    ) => {
        setIsLoading(true);
        setError(null);

        try {
            const queryParams = new URLSearchParams({
                query: message,
                history: JSON.stringify(history),
                userId: userId || ''
            });

            const eventSource = new EventSource(`${BACKEND_URL}/api/chat/stream?${queryParams.toString()}`);
            
            let fullText = "";

            eventSource.onmessage = (event) => {
                if (event.data === '[DONE]') {
                    eventSource.close();
                    onComplete();
                    setIsLoading(false);
                    return;
                }

                try {
                    const data = JSON.parse(event.data);
                    if (data.chunk) {
                        fullText += data.chunk;
                        onChunk(fullText);
                    }
                    if (data.error) {
                        throw new Error(data.error);
                    }
                } catch (e) {
                    console.error("Parse Error:", e);
                }
            };

            eventSource.onerror = (err) => {
                console.error("SSE Error:", err);
                setError("Failed to stream from AI Brain.");
                eventSource.close();
                setIsLoading(false);
                onComplete();
            };

        } catch (err) {
            console.error("AI Connection Error:", err);
            setError("Failed to connect to Brain.");
            setIsLoading(false);
            onComplete();
        }
    };

    const checkHealth = async () => {
        try {
            const res = await fetch(`${BACKEND_URL}/health`);
            return await res.json();
        } catch (e) {
            return { status: 'offline', message: 'Brain disconnected' };
        }
    };

    // Kept for backward compatibility
    const sendSmartMessage = sendMessage;

    return {
        sendMessage,
        sendSmartMessage,
        checkHealth,
        isLoading,
        error,
    };
}
