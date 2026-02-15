import { useState, useRef, useCallback } from 'react';

interface UseVoiceAIProps {
    ontranscription: (text: string) => void;
}

export function useVoiceAI({ ontranscription }: UseVoiceAIProps) {
    const [isRecording, setIsRecording] = useState(false);
    const [isProcessing, setIsProcessing] = useState(false);
    const [isPlaying, setIsPlaying] = useState(false);
    const recognitionRef = useRef<any>(null);
    const audioPlayerRef = useRef<HTMLAudioElement | null>(null);

    // init audio player
    if (typeof window !== 'undefined' && !audioPlayerRef.current) {
        audioPlayerRef.current = new Audio();
        audioPlayerRef.current.onended = () => setIsPlaying(false);
    }

    const startRecording = useCallback(() => {
        if (typeof window === 'undefined') return;

        const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
        if (!SpeechRecognition) {
            // SpeechRecognition not available: fallback to a simple hint/alert
            alert('Speech recognition not supported in this browser. Please use Chrome or Edge, or type instead.');
            return;
        }

        try {
            const recognition = new SpeechRecognition();
            recognition.lang = 'en-US';
            recognition.interimResults = false;
            recognition.maxAlternatives = 1;

            recognition.onstart = () => {
                setIsRecording(true);
            };

            recognition.onresult = (event: any) => {
                const transcript = event.results[0]?.[0]?.transcript || '';
                ontranscription(transcript);
            };

            recognition.onerror = (e: any) => {
                console.error('Speech recognition error', e);
            };

            recognition.onend = () => {
                setIsRecording(false);
                recognitionRef.current = null;
            };

            recognitionRef.current = recognition;
            recognition.start();
        } catch (err) {
            console.error('startRecording failed', err);
            alert('Could not start speech recognition.');
        }
    }, [ontranscription]);

    const stopRecording = useCallback(() => {
        const recognition = recognitionRef.current;
        if (recognition) {
            try {
                recognition.stop();
            } catch (err) {
                console.warn('Error stopping recognition', err);
            }
        }
        setIsRecording(false);
    }, []);

    const speak = useCallback((text: string) => {
        if (typeof window === 'undefined') return;
        try {
            setIsPlaying(true);
            const synth = window.speechSynthesis;
            if (!synth) throw new Error('SpeechSynthesis not supported');

            const utter = new SpeechSynthesisUtterance(text);
            utter.onend = () => setIsPlaying(false);
            utter.onerror = (e) => {
                console.error('TTS error', e);
                setIsPlaying(false);
            };
            synth.cancel();
            synth.speak(utter);
        } catch (err) {
            console.error('speak failed', err);
            setIsPlaying(false);
        }
    }, []);

    return {
        isRecording,
        isProcessing,
        isPlaying,
        startRecording,
        stopRecording,
        speak
    };
}
