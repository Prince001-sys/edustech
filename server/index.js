
const express = require('express');
const cors = require('cors');
const axios = require('axios');
const dotenv = require('dotenv');
const { createClient } = require('@supabase/supabase-js');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;
const PYTHON_BACKEND_URL = process.env.PYTHON_BACKEND_URL;

// Update CORS for production
app.use(cors({
    origin: '*', // For production, we can start with * or set specifically to Vercel URL
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization']
}));

app.use(express.json());

// Supabase Client (Will use placeholders if envs are missing)
const supabaseUrl = process.env.SUPABASE_URL || 'https://your-project.supabase.co';
const supabaseKey = process.env.SUPABASE_ANON_KEY || 'your-anon-key';
const supabase = createClient(supabaseUrl, supabaseKey);

app.get('/health', (req, res) => {
    res.json({ status: 'Express server is healthy', timestamp: new Date() });
});

// SSE Endpoint for Streaming AI Chat
app.get('/api/chat/stream', async (req, res) => {
    const { query, history, userId } = req.query;

    if (!query) {
        return res.status(400).json({ error: 'Query is required' });
    }

    // Set headers for SSE
    res.setHeader('Content-Type', 'text/event-stream');
    res.setHeader('Cache-Control', 'no-cache');
    res.setHeader('Connection', 'keep-alive');
    res.flushHeaders();

    try {
        // Step 1: Verification/Logging with Supabase (Optional)
        // const { data, error } = await supabase.from('logs').insert([{ user_id: userId, query: query }]);

        // Step 2: Forward to Python Backend
        // Note: For real streaming from Python, we would use a streaming response from FastAPI.
        // For now, we'll fetch the full response and stream it word-by-word to demonstrate SSE.
        const response = await axios.post(`${PYTHON_BACKEND_URL}/chat`, {
            query: query,
            context: JSON.parse(history || '[]'),
            userId: userId
        });

        const fullText = response.data || response.data.text || "No response from brain.";
        
        // Simulate streaming from Python (Real streaming would pipe the stream)
        const words = fullText.split(' ');
        for (let i = 0; i < words.length; i++) {
            res.write(`data: ${JSON.stringify({ chunk: words[i] + ' ' })}\n\n`);
            // Small delay to simulate real-time feel
            await new Promise(resolve => setTimeout(resolve, 30));
        }

        res.write('data: [DONE]\n\n');
        res.end();

    } catch (error) {
        console.error('Error in AI Stream:', error);
        res.write(`data: ${JSON.stringify({ error: 'Failed to connect to AI Brain' })}\n\n`);
        res.end();
    }
});

// Standard API Endpoint (Non-streaming)
app.post('/api/chat', async (req, res) => {
    const { query, history, userId } = req.body;

    try {
        const response = await axios.post(`${PYTHON_BACKEND_URL}/chat`, {
            query,
            context: history,
            userId
        });
        res.json(response.data);
    } catch (error) {
        res.status(500).json({ error: 'Failed to connect to Python backend' });
    }
});

app.listen(PORT, () => {
    console.log(`🚀 Express server running on http://localhost:${PORT}`);
    console.log(`🔗 Python Backend targeted at ${PYTHON_BACKEND_URL}`);
});
