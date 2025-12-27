import { useState, useEffect } from 'react';
import migrationApi from '../../services/migrationApi';
import { formatDate } from '../../utils/fileExport';
import './MigrationHistory.css';

const MigrationHistory = ({ onSelectHistory }) => {
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [isExpanded, setIsExpanded] = useState(false);

  useEffect(() => {
    fetchHistory();
  }, []);

  const fetchHistory = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await migrationApi.getHistory();
      setHistory(response.data || []);
    } catch (err) {
      setError('Failed to load history');
      console.error('History fetch error:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleItemClick = (item) => {
    onSelectHistory({
      originalCode: item.originalCode,
      migratedCode: item.migratedCode,
      target: item.target,
    });
  };

  return (
    <div className="migration-history">
      <div className="history-header" onClick={() => setIsExpanded(!isExpanded)}>
        <h3>Migration History ({history.length})</h3>
        <button className="toggle-btn">{isExpanded ? '▼' : '▶'}</button>
      </div>

      {isExpanded && (
        <div className="history-content">
          {loading && <p className="history-loading">Loading history...</p>}
          
          {error && <p className="history-error">{error}</p>}
          
          {!loading && !error && history.length === 0 && (
            <p className="history-empty">No migration history yet</p>
          )}
          
          {!loading && !error && history.length > 0 && (
            <div className="history-list">
              {history.map((item) => (
                <div
                  key={item._id}
                  className="history-item"
                  onClick={() => handleItemClick(item)}
                >
                  <div className="history-item-header">
                    <span className="history-target">{item.target}</span>
                    <span className="history-date">{formatDate(item.createdAt)}</span>
                  </div>
                  <div className="history-preview">
                    {item.originalCode.substring(0, 80)}...
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default MigrationHistory;
