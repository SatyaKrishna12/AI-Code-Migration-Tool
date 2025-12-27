import mongoose from 'mongoose';

const migrationSchema = new mongoose.Schema({
  originalCode: {
    type: String,
    required: true,
  },
  migratedCode: {
    type: String,
    required: true,
  },
  target: {
    type: String,
    required: true,
    enum: ['ES6', 'TypeScript'],
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Migration = mongoose.model('Migration', migrationSchema);

export default Migration;
