import Migration from '../models/Migration.model.js';
import aiService from './ai.service.js';
import PromptBuilder from '../utils/promptBuilder.js';
import connectDB from '../config/db.js';

class MigrationService {

  async migrateCode(code, target) {
    try {
      // Build the prompt
      const prompt = PromptBuilder.buildMigrationPrompt(code, target);
      
      // Get migrated code from AI service
      const migratedCode = await aiService.generateCode(prompt);
      
      // Try to save to database
      try {
        await connectDB();
        const migration = new Migration({
          originalCode: code,
          migratedCode,
          target,
        });
        await migration.save();
        
        return {
          originalCode: code,
          migratedCode,
          target,
          createdAt: migration.createdAt,
        };
      } catch (dbError) {
        console.error('Database save error:', dbError);
        // Return result even if DB save fails
        return {
          originalCode: code,
          migratedCode,
          target,
          createdAt: new Date(),
        };
      }
    } catch (error) {
      throw new Error(`Migration failed: ${error.message}`);
    }
  }

  async getMigrationHistory() {
    try {
      await connectDB();
      const migrations = await Migration.find()
        .sort({ createdAt: -1 })
        .select('originalCode migratedCode target createdAt');
      
      return migrations;
    } catch (error) {
      console.error('History retrieval error:', error);
      // Return empty array if DB is not available
      return [];
    }
  }
}

export default new MigrationService();
