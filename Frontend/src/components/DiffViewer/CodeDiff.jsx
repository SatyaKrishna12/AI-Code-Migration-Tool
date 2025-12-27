import ReactDiffViewer from 'react-diff-viewer';
import './CodeDiff.css';

const CodeDiff = ({ originalCode, migratedCode }) => {
  if (!originalCode || !migratedCode) {
    return (
      <div className="code-diff-empty">
        <p>No changes to display. Migrate your code to see the differences.</p>
      </div>
    );
  }

  return (
    <div className="code-diff-container">
      <div className="diff-header">
        <h3>Code Comparison</h3>
        <div className="diff-labels">
          <span className="label-original">Original Code</span>
          <span className="label-migrated">Migrated Code</span>
        </div>
      </div>
      <ReactDiffViewer
        oldValue={originalCode}
        newValue={migratedCode}
        splitView={true}
        useDarkTheme={false}
        showDiffOnly={false}
        styles={{
          variables: {
            light: {
              diffViewerBackground: '#fff',
              addedBackground: '#e6ffed',
              addedColor: '#24292e',
              removedBackground: '#ffeef0',
              removedColor: '#24292e',
            },
          },
        }}
      />
    </div>
  );
};

export default CodeDiff;
