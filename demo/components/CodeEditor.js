import React, { Component } from 'react';
import AceEditor from 'react-ace';

import 'brace/mode/jsx';
import 'brace/theme/github.js';

class CodeEditor extends Component {
    render() {
        let { value, name, readOnly, onChange, mode, width, height } = this.props;
        mode = mode || 'jsx';
        width =  width || '100%';
        
        // metadata
        let props = { value, name, ref: 'input', readOnly, onChange, mode, width, theme: 'github', height, fontSize: 14,  editorProps: {$blockScrolling: true} };

        return <AceEditor className="code-editor" {...props}/>;
    }
}

export default CodeEditor;