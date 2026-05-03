const express = require('express');
const path = require('path');
const compression = require('compression');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const { GoogleGenAI } = require('@google/genai');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 8080;

// Security and efficiency middlewares
app.use(helmet({
  contentSecurityPolicy: {
    directives: {
      defaultSrc: ["'self'"],
      scriptSrc: ["'self'", "'unsafe-inline'"], // Allow inline scripts if any
      styleSrc: ["'self'", "'unsafe-inline'", "https://fonts.googleapis.com"],
      fontSrc: ["'self'", "https://fonts.gstatic.com"],
      imgSrc: ["'self'", "data:", "https://img.shields.io"],
      connectSrc: ["'self'"], // Frontend only connects to our own backend now
    },
  },
}));
app.use(compression());
app.use(express.json());

// Rate limiting for the API
const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // Limit each IP to 100 requests per `window` (here, per 15 minutes)
  message: { error: 'Too many requests, please try again later.' },
  standardHeaders: true,
  legacyHeaders: false,
});

// Serve static files with caching
app.use(express.static(path.join(__dirname), {
  maxAge: '1d', // Cache for 1 day
}));

// Initialize Gemini Client
// We check if the key exists, but we don't crash the server so static files can still be served
const geminiApiKey = process.env.GEMINI_API_KEY || 'AIzaSyCiCRt14LhzW5tMEaPHmGeqfkKyWdStpW8'; // Fallback to old key for testing if not set, but warn
let ai;
if (geminiApiKey) {
  try {
     ai = new GoogleGenAI({ apiKey: geminiApiKey });
  } catch(e) {
     console.error("Failed to initialize GoogleGenAI", e);
  }
} else {
  console.warn('GEMINI_API_KEY environment variable not set. AI Chat will not work.');
}

const SYSTEM_PROMPT = `You are ElectEd, a friendly and knowledgeable election education assistant. Your role is to help users understand the election process, voter registration, electoral systems, and civic participation.

Guidelines:
- Keep answers concise (2-4 short paragraphs max) and easy to understand
- Use emojis sparingly for visual appeal (1-3 per response)
- Use **bold** for key terms
- Use numbered lists or bullet points when explaining steps
- Be non-partisan and factual
- Cover topics like: voter registration, types of elections, how voting works, vote counting, electoral laws, constituencies, political parties, campaigning, and global electoral systems
- If asked something unrelated to elections or civics, politely redirect to election topics
- Be encouraging about civic participation`;

// Chat Endpoint
app.post('/api/chat', apiLimiter, async (req, res) => {
  try {
    const { message, history } = req.body;

    if (!message) {
      return res.status(400).json({ error: 'Message is required' });
    }

    if (!ai) {
      return res.status(503).json({ error: 'AI Service is not configured.' });
    }
    
    // Map history to the format expected by the SDK
    const formattedHistory = history.map(msg => ({
      role: msg.role === 'model' ? 'model' : 'user', // Ensure correct roles
      parts: msg.parts.map(part => ({text: part.text}))
    }));
    
    const response = await ai.models.generateContent({
      model: 'gemini-2.0-flash',
      contents: [
        ...formattedHistory,
        { role: 'user', parts: [{ text: message }] }
      ],
      config: {
        systemInstruction: { parts: [{ text: SYSTEM_PROMPT }] },
        temperature: 0.7,
        topP: 0.9,
        topK: 40,
        maxOutputTokens: 500,
      }
    });

    if (response && response.text) {
       res.json({ answer: response.text });
    } else {
       throw new Error("No text response from Gemini");
    }

  } catch (error) {
    console.error('Error generating AI response:', error.message);
    res.status(500).json({ error: 'Failed to generate response' });
  }
});

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

if (require.main === module) {
  app.listen(PORT, () => {
    console.log(`ElectEd server running on port ${PORT}`);
  });
}

// Export app for testing
module.exports = app;
