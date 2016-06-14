import React from 'react';
import FormGroupInline from './FormGroupInline';
import FormGroupStacked from './FormGroupStacked';

const FormGroup = React.createClass({

    propTypes: {
        error: React.PropTypes.string,
        touched: React.PropTypes.bool,
        displayName: React.PropTypes.string,
        name: React.PropTypes.string,
        help: React.PropTypes.string
    },

    render: function () {
        let { fieldLayout } = this.props;
        let InnerFormGroup = fieldLayout == 'stacked' ? FormGroupStacked : FormGroupInline;
        return <InnerFormGroup {...this.props} />;
    }
});

export default FormGroup;