import React, { Component } from 'react';

class Root extends Component {
    render() {
        let { children } = this.props;
        
        return (
            <div className="container-fluid">
                { children }
            </div>
        )
    }
}


export default Root;
