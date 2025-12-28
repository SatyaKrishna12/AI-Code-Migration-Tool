import Editor from '@monaco-editor/react';
import './CodeEditor.css';

const CodeEditor = ({ value, onChange, language = 'javascript', height = '400px', readOnly = false }) => {
  const handleEditorDidMount = (editor) => {
    // Allow scrolling the page when cursor is over editor
    const editorDom = editor.getDomNode();
    if (editorDom) {
      editorDom.style.pointerEvents = 'auto';
    }
  };

  return (
    <div className="code-editor-wrapper">
      <Editor
        height={height}
        language={language}
        value={value}
        onChange={onChange}
        onMount={handleEditorDidMount}
        theme="vs-light"
        options={{
          minimap: { enabled: false },
          fontSize: 14,
          lineNumbers: 'on',
          scrollBeyondLastLine: false,
          automaticLayout: true,
          tabSize: 2,
          readOnly: readOnly,
          scrollbar: {
            alwaysConsumeMouseWheel: false,
          },
          overviewRulerLanes: 0,
        }}
      />
    </div>
  );
};

export default CodeEditor;
