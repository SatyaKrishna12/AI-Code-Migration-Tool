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
    
    const apiKey = process.env.GOOGLE_API_KEY || process.env.GEMINI_API_KEY;
    
    if (!apiKey || apiKey === 'your_gemini_api_key_here') {
      console.warn('⚠️  GOOGLE_API_KEY or GEMINI_API_KEY not configured. Please add your API key to environment variables');
      this.configured = false;
    } else {
      this.genAI = new GoogleGenerativeAI(apiKey);
      this.configured = true;
      console.log('✅ Gemini API configured successfully');
    }
  }


  async generateCode(prompt) {
    this.initialize();
    
    if (!this.configured) {
      throw new Error('Gemini API is not configured. Please add GOOGLE_API_KEY or GEMINI_API_KEY to your environment variables');
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
