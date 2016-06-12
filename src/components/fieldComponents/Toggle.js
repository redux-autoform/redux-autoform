import React from 'react';
import FormGroup from  '../FormGroup';
import ReactToggle from 'react-toggle'

const Toggle = React.createClass({

    propTypes: {
        value: React.PropTypes.any,
        onChange: React.PropTypes.func.isRequired,
        placeholder: React.PropTypes.string,
        displayName: React.PropTypes.string,
        name: React.PropTypes.string.isRequired,
        error: React.PropTypes.string,
        addonBefore: React.PropTypes.string,
        addonAfter: React.PropTypes.string
    },

    render() {

        let {
            value,
            name,
            displayName,
            help,
            error,
            touched,
            onChange,
            fieldLayout
        } = this.props;


        let formGroupProps = {
            error,
            touched,
            displayName,
            name,
            help,
            fieldLayout
        };

        let toggleProps = {
            defaultChecked: typeof value === 'boolean' ? value : false,
            onChange
        };

        return (
            <FormGroup {...formGroupProps}>
                <div>
                    <ReactToggle {...toggleProps} />
                </div>
            </FormGroup>
        );

    }
});

export default Toggle;