import express from 'express';
import migrationController from '../controllers/migration.controller.js';

const router = express.Router();

// POST /api/migrate - Migrate code
router.post('/', (req, res) => migrationController.migrateCode(req, res));

// GET /api/migrate/history - Get migration history
router.get('/history', (req, res) => migrationController.getMigrationHistory(req, res));

export default router;
