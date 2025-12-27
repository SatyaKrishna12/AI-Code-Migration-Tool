import { useState, useRef, useEffect } from 'react';
import CodeEditor from '../components/Editor/CodeEditor';
import EditorToolbar from '../components/Editor/EditorToolbar';
import CodeDiff from '../components/DiffViewer/CodeDiff';
import MigrationHistory from '../components/History/MigrationHistory';
import Loader from '../components/Common/Loader';
import migrationApi from '../services/migrationApi';
import { exportCodeToFile } from '../utils/fileExport';
import './Home.css';

const Home = () => {
  const [originalCode, setOriginalCode] = useState('');
  const [migratedCode, setMigratedCode] = useState('');
  const [target, setTarget] = useState('ES6');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [showDiff, setShowDiff] = useState(false);
  const migratedCodeRef = useRef(null);

  const handleMigrate = async () => {
    if (!originalCode.trim()) {
      setError('Please enter some code to migrate');
      return;
    }

    setIsLoading(true);
    setError(null);
    setShowDiff(false);

    try {
      const response = await migrationApi.migrateCode(originalCode, target);
      setMigratedCode(response.data.migratedCode);
      setShowDiff(true);
    } catch (err) {
      setError(err.response?.data?.message || 'Migration failed. Please try again.');
      console.error('Migration error:', err);
    } finally {
      setIsLoading(false);
    }
  };

  // Auto-scroll to migrated code when it's ready
  useEffect(() => {
    if (migratedCode && migratedCodeRef.current) {
      migratedCodeRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }, [migratedCode]);

  const handleClear = () => {
    setOriginalCode('');
    setMigratedCode('');
    setError(null);
    setShowDiff(false);
  };

  const handleExport = () => {
    if (migratedCode) {
      exportCodeToFile(migratedCode, target);
    }
  };

  const handleSelectHistory = (historyItem) => {
    setOriginalCode(historyItem.originalCode);
    setMigratedCode(historyItem.migratedCode);
    setTarget(historyItem.target);
    setShowDiff(true);
    setError(null);
  };

  const getEditorLanguage = () => {
    return target === 'TypeScript' ? 'typescript' : 'javascript';
  };

  return (
    <div className="home-container">
      <header className="app-header">
        <h1>AI-Assisted Code Migration Tool</h1>
        <p>Transform your legacy JavaScript to modern ES6 or TypeScript</p>
      </header>

      <div className="main-content">
        <EditorToolbar
          target={target}
          onTargetChange={setTarget}
          onMigrate={handleMigrate}
          onClear={handleClear}
          onExport={handleExport}
          isLoading={isLoading}
          hasMigratedCode={!!migratedCode}
        />

        {error && (
          <div className="error-message">
            <strong>Error:</strong> {error}
          </div>
        )}

        <div className="editor-section">
          <div className="editor-label">Original Code (JavaScript)</div>
          <CodeEditor
            value={originalCode}
            onChange={setOriginalCode}
            language="javascript"
            height="400px"
          />
        </div>

        {isLoading && <Loader message="Migrating your code..." />}

        {!isLoading && migratedCode && (
          <div className="editor-section migrated-section" ref={migratedCodeRef}>
            <div className="editor-label migrated-label">
              <span> Migrated Code ({target}) - Editable</span>
            </div>
            <CodeEditor
              value={migratedCode}
              onChange={setMigratedCode}
              language={getEditorLanguage()}
              height="400px"
            />
          </div>
        )}

        {!isLoading && showDiff && (
          <CodeDiff originalCode={originalCode} migratedCode={migratedCode} />
        )}

        <MigrationHistory onSelectHistory={handleSelectHistory} />
      </div>
    </div>
  );
};

export default Home;
