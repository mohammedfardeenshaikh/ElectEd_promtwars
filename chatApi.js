"use strict";

/**
 * Sends the user message to the secure backend proxy.
 * @param {string} prompt - The sanitized user message
 * @param {Array} history - The conversation history
 * @returns {Promise<string>} The AI's response text
 */
export async function askGemini(prompt, history) {
  try {
    const response = await fetch('/api/chat', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        message: prompt,
        history: history
      })
    });

    if (!response.ok) {
      throw new Error(`Backend API error: ${response.status}`);
    }

    const data = await response.json();
    return data.reply;
  } catch (error) {
    console.error('Error fetching from backend:', error);
    throw error;
  }
}
