import Migration from '../models/Migration.model.js';
import aiService from './ai.service.js';
import PromptBuilder from '../utils/promptBuilder.js';

class MigrationService {

  async migrateCode(code, target) {
    try {
      // Build the prompt
      const prompt = PromptBuilder.buildMigrationPrompt(code, target);
      
      // Get migrated code from AI service
      const migratedCode = await aiService.generateCode(prompt);
      
      // Save to database
      const migration = new Migration({
        originalCode: code,
        migratedCode,
        target,
      });
      
      await migration.save();
      
      return {
        originalCode: migration.originalCode,
        migratedCode: migration.migratedCode,
        target: migration.target,
        createdAt: migration.createdAt,
      };
    } catch (error) {
      throw new Error(`Migration failed: ${error.message}`);
    }
  }

  async getMigrationHistory() {
    try {
      const migrations = await Migration.find()
        .sort({ createdAt: -1 })
        .select('originalCode migratedCode target createdAt');
      
      return migrations;
    } catch (error) {
      throw new Error(`Failed to retrieve history: ${error.message}`);
    }
  }
}

export default new MigrationService();
