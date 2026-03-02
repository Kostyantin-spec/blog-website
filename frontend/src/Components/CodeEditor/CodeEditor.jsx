import React from 'react';
import Editor from 'react-simple-code-editor';

import './CodeEditor.css';

const CodeEditorInput = ({ value, onChange }) => {
  return (
    <div className="code-editor-container">
      <div className="editor-label" style={{ marginBottom: '10px', color: '#888', fontSize: '14px' }}>
        Живий код / HTML-компонент
      </div>
      <div style={{ 
        border: '1px solid #444', 
        borderRadius: '8px', 
        overflow: 'hidden',
        backgroundColor: '#1e1e1e' 
      }}>
        <Editor
          /* Використовуємо пропси, які приходять зверху */
          value={value || ""} 
          onValueChange={code => onChange(code)} 
         highlight={code => code} 
        padding={10}
        style={{
          fontFamily: '"Fira code", "Fira Mono", monospace',
          fontSize: 14,
          backgroundColor: '#2d2d2d',
          color: '#ccc',
          borderRadius: '5px',
          minHeight: '150px'
          }}
        />
      </div>
      <small style={{ color: '#666', marginTop: '5px', display: 'block' }}>
        Вставлений сюди HTML відрендериться в статті як живий елемент.
      </small>
    </div>
  );
};

export default CodeEditorInput;