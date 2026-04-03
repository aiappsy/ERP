const { GoogleGenAI } = require('@google/genai');

// Initialize the SDk
// Fallback if not configured yet
const ai = new GoogleGenAI({ apiKey: process.env.OPENAI_API_KEY || '' }); 

exports.handleAgentChat = async (req, res) => {
    try {
        const { message, context } = req.body;
        
        if (!message) {
            return res.status(400).json({ success: false, message: 'Message is required' });
        }

        // Generate response using gemini-2.5-flash
        const response = await ai.models.generateContent({
            model: 'gemini-2.5-flash',
            contents: [
                { role: 'user', parts: [{ text: `You are an intelligent ERP Agent for Aiappsy-ERP. Be helpful and proactive. User says: ${message}` }] }
            ],
            config: {
                systemInstruction: "You are an AI ERP Assistant executing proactive tasks, notifying the user, and providing professional insights.",
            }
        });

        // Parse Response
        const agentResponseText = response?.text || "I was unable to generate a response at this time.";

        return res.status(200).json({
            success: true,
            data: agentResponseText,
        });

    } catch (error) {
        console.error("Agent Error:", error);
        return res.status(500).json({ success: false, message: error.message });
    }
};
