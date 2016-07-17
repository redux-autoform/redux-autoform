import React, { Component, PropTypes } from 'react';
import FormGroupInline from './FormGroupInline';
import FormGroupStacked from './FormGroupStacked';

class FormGroup extends Component {
    static propTypes = {
        error: PropTypes.string,
        touched: PropTypes.bool,
        displayName: PropTypes.string,
        name: PropTypes.string,
        help: PropTypes.string
    };

    render() {
        let { fieldLayout } = this.props;
        let InnerFormGroup = fieldLayout == 'inline' ? FormGroupInline : FormGroupStacked;
        
        return <InnerFormGroup {...this.props}/>;
    }
}

export default FormGroup;