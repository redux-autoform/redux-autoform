import React from 'react';
import AceEditor from 'react-ace';

import 'brace/mode/jsx';
import 'brace/theme/github.js';

const CodeEditor = React.createClass({

    render: function() {

        // metadata
        let props = {
            value: this.props.value,
            name: this.props.name,
            ref: 'input',
            readOnly: this.props.readOnly,
            onChange:this.props.onChange,
            mode: this.props.mode || 'jsx',
            width: this.props.width || '100%',
            theme: 'github',
            height: this.props.height,
            fontSize: 14,
            editorProps: {$blockScrolling: true}
        };

        return <AceEditor {...props} className="code-editor" />;
}
});

export default CodeEditor;