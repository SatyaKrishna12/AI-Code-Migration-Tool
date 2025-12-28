import { DiffEditor } from '@monaco-editor/react';
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
      <DiffEditor
        original={originalCode}
        modified={migratedCode}
        language="javascript"
        height="600px"
        theme="light"
        options={{
          readOnly: true,
          renderSideBySide: true,
          enableSplitViewResizing: true,
          fontSize: 14,
          minimap: { enabled: false },
          scrollBeyondLastLine: false,
          wordWrap: 'on',
          scrollbar: {
            alwaysConsumeMouseWheel: false,
          },
        }}
      />
    </div>
  );
};

export default CodeDiff;
