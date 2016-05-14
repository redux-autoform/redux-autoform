import React from 'react';
import LiveSchemaEditorContainer from '../containers/LiveSchemaEditorContainer';

const LiveSchemaEditorPage = React.createClass({

    render: function () {
        return <div>
            <LiveSchemaEditorContainer preset={this.props.location.query.preset} />
        </div>;
    }
});

export default LiveSchemaEditorPage;
