import { GoogleGenerativeAI } from '@google/generative-ai';

class AIService {
  constructor() {
    this.genAI = null;
    this.configured = false;
    this.initialized = false;
  }

  // Lazy initialization to ensure dotenv is loaded first
  initialize() {
    if (this.initialized) return;
    
    this.initialized = true;
    
    if (!process.env.GEMINI_API_KEY || process.env.GEMINI_API_KEY === 'your_gemini_api_key_here') {
      console.warn('⚠️  GEMINI_API_KEY not configured. Please add your API key to .env file');
      this.configured = false;
    } else {
      this.genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
      this.configured = true;
      console.log('✅ Gemini API configured successfully');
    }
  }

  /**
   * Generates migrated code using Gemini API
   * @param {string} prompt - The prompt to send to Gemini
   * @returns {Promise<string>} - The AI-generated code
   */
  async generateCode(prompt) {
    this.initialize();
    
    if (!this.configured) {
      throw new Error('Gemini API is not configured. Please add GEMINI_API_KEY to your .env file');
    }

    if (!prompt || typeof prompt !== 'string' || prompt.trim() === '') {
      throw new Error('Invalid input: A non-empty string is required.');
    }
    
    try {
      const model = this.genAI.getGenerativeModel({
        model: 'gemini-2.5-flash',
      });
      
      const generationConfig = {
        maxOutputTokens: 8192,
        temperature: 0.7,
      };

      const result = await model.generateContent({
        contents: [{ 
          role: "user", 
          parts: [{ 
            text: `You are an expert code migration tool. Convert the provided code exactly as requested. Return ONLY the migrated code without any explanations, markdown formatting, or comments about the migration.\n\n${prompt}` 
          }] 
        }],
        generationConfig,
      });

      const text = result.response.text().trim();
      
      // Clean up the response - remove markdown code blocks if present
      let cleanedCode = text;
      cleanedCode = cleanedCode.replace(/^```[\w]*\n/gm, '');
      cleanedCode = cleanedCode.replace(/\n```$/gm, '');
      cleanedCode = cleanedCode.trim();
      
      return cleanedCode;
    } catch (error) {
      console.error('Gemini API Error:', error?.message || error);
      throw new Error(`AI service failed: ${error?.message || 'Unknown error'}`);
    }
  }
}

export default new AIService();
