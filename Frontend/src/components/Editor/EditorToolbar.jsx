import Button from '../Common/Button';
import { FaPlay, FaTrash, FaDownload, FaCode } from 'react-icons/fa';
import './EditorToolbar.css';

const EditorToolbar = ({
  target,
  onTargetChange,
  onMigrate,
  onClear,
  onExport,
  isLoading,
  hasMigratedCode,
}) => {
  return (
    <div className="editor-toolbar">
      <div className="toolbar-left">
        <FaCode className="target-icon" />
        <label className="target-label">Target Language:</label>
        <select
          className="target-select"
          value={target}
          onChange={(e) => onTargetChange(e.target.value)}
          disabled={isLoading}
        >
          <option value="ES6">ES6</option>
          <option value="TypeScript">TypeScript</option>
        </select>
      </div>
      
      <div className="toolbar-right">
        <Button onClick={onClear} variant="secondary" disabled={isLoading}>
          <FaTrash /> Clear
        </Button>
        <Button onClick={onMigrate} variant="primary" disabled={isLoading}>
          <FaPlay /> {isLoading ? 'Migrating...' : 'Migrate Code'}
        </Button>
        {hasMigratedCode && (
          <Button onClick={onExport} variant="success" disabled={isLoading}>
            <FaDownload /> Export Code
          </Button>
        )}
      </div>
    </div>
  );
};

export default EditorToolbar;
