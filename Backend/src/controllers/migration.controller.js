import migrationService from '../services/migration.service.js';

class MigrationController {
  async migrateCode(req, res) {
    try {
      const { code, target } = req.body;

      // Validation
      if (!code || typeof code !== 'string') {
        return res.status(400).json({
          success: false,
          message: 'Code is required and must be a string',
        });
      }

      if (!target || !['ES6', 'TypeScript'].includes(target)) {
        return res.status(400).json({
          success: false,
          message: 'Target must be either "ES6" or "TypeScript"',
        });
      }

      if (code.trim().length === 0) {
        return res.status(400).json({
          success: false,
          message: 'Code cannot be empty',
        });
      }

      const result = await migrationService.migrateCode(code, target);

      return res.status(200).json({
        success: true,
        data: result,
      });
    } catch (error) {
      console.error('Migration error:', error);
      return res.status(500).json({
        success: false,
        message: error.message || 'Internal server error',
      });
    }
  }


  async getMigrationHistory(req, res) {
    try {
      const history = await migrationService.getMigrationHistory();

      return res.status(200).json({
        success: true,
        count: history.length,
        data: history,
      });
    } catch (error) {
      console.error('History retrieval error:', error);
      return res.status(500).json({
        success: false,
        message: error.message || 'Internal server error',
      });
    }
  }
}

export default new MigrationController();
