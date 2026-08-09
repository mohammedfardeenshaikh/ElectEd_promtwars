"use strict";

const express = require('express');
const path = require('path');
const compression = require('compression');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const cors = require('cors');
const { GoogleGenAI } = require('@google/genai');

// Google Cloud Services
const winston = require('winston');
const { LoggingWinston } = require('@google-cloud/logging-winston');
const { ErrorReporting } = require('@google-cloud/error-reporting');

require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 8080;

// Initialize Google Cloud Logging
const loggingWinston = new LoggingWinston();
const logger = winston.createLogger({
  level: 'info',
  transports: [
    new winston.transports.Console(),
    loggingWinston,
  ],
});

// Initialize Google Cloud Error Reporting
const errors = new ErrorReporting();

// Security and efficiency middlewares
app.use(cors()); // Allow cross-origin requests securely
app.use(helmet({
  contentSecurityPolicy: {
    directives: {
      defaultSrc: ["'self'"],
      scriptSrc: ["'self'", "'unsafe-inline'", "https://cdnjs.cloudflare.com", "https://www.googletagmanager.com"], // DOMPurify & Firebase
      styleSrc: ["'self'", "'unsafe-inline'", "https://fonts.googleapis.com"],
      fontSrc: ["'self'", "https://fonts.gstatic.com"],
      imgSrc: ["'self'", "data:", "https://img.shields.io", "https://www.google-analytics.com"],
      connectSrc: ["'self'", "https://generativelanguage.googleapis.com", "https://region1.google-analytics.com"],
    },
  },
}));
app.use(compression());
app.use(express.json());

/**
 * Rate limiting for the API to prevent abuse.
 * Limits each IP to 100 requests per 15 minutes.
 */
const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, 
  max: 100, 
  message: { error: 'Too many requests, please try again later.' },
  standardHeaders: true,
  legacyHeaders: false,
});

// Serve static files with caching
app.use(express.static(path.join(__dirname), {
  maxAge: '1d', // Cache for 1 day
}));

/**
 * Initialize Gemini Client
 */
const geminiApiKey = process.env.GEMINI_API_KEY || "your gemini API key ";
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

/**
 * System Prompt with Grounding Technique.
 * Enforces that the AI must only use trusted information and not hallucinate.
 */
const SYSTEM_PROMPT = `You are ElectEd, a friendly and knowledgeable election education assistant. 
Your role is to help users understand the election process, voter registration, electoral systems, and civic participation.

GROUNDING RULES:
- You must strictly use factual, verifiable information regarding elections.
- Do NOT hallucinate dates, laws, or procedures that do not exist.
- Keep answers concise (2-4 short paragraphs max) and easy to understand.
- Use emojis sparingly for visual appeal (1-3 per response).
- Use **bold** for key terms and numbered lists when explaining steps.
- Be non-partisan and strictly objective.
- If asked something unrelated to elections or civics, politely redirect to election topics.`;

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
    logger.error('Error generating AI response:', error);
    res.status(500).json({ error: 'Failed to generate response' });
  }
});

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

// Apply Google Cloud Error Reporting middleware as the last middleware
app.use(errors.express);

if (require.main === module) {
  app.listen(PORT, () => {
    logger.info(`ElectEd server running on port ${PORT}`);
  });
}

// Export app for testing
module.exports = app;
