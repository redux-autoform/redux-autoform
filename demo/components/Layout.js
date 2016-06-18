import React from 'react';
import DevTools from './DevTools';

var Layout = React.createClass({

    render: function () {
        return (
            <div>
                <div className="container-fluid">
                    {this.props.children}
                </div>
                <DevTools />;
            </div>
        );
    }
});

export default Layout;