import React, { Component, PropTypes } from 'react';
import InputGroup from 'react-bootstrap/lib/InputGroup';
import { FormControl as BootstrapFormControl } from 'react-bootstrap';

class FormControl extends Component {
    static propTypes = {
        error: PropTypes.string,
        touched: PropTypes.bool,
        displayName: PropTypes.string,
        name: PropTypes.string,
        help: PropTypes.string
    };
    
    handleChange = (event) => {
        let { onChange } = this.props;
        
        onChange(event.target.value);
    };
    
    handleBlur = (event) => {
        let { onBlur } = this.props;
        
        onBlur();
    };
    
    getInput = () => {
        let { value, name, placeholder, displayName, help, componentClass, children, rows } = this.props;
        let label = displayName || name;
        
        let formControlProps = { label, value, placeholder, help, componentClass, rows };
        
        return (
            <BootstrapFormControl type="text" ref="input" onChange={this.handleChange} onBlur={this.handleBlur} {...formControlProps} hasFeedback>
                { children }
            </BootstrapFormControl>
        )
    }; 
    
    getAddonBefore = () => {
        let { addonBefore } = this.props;
        
        if (addonBefore) {
            return (
                <InputGroup.Addon>
                    {addonBefore}
                </InputGroup.Addon>
            );
        } else {
            return null;
        }
    };
    
    getAddonAfter = () => {
        let { addonAfter } = this.props;
        
        if (addonAfter) {
            return (
                <InputGroup.Addon>
                    {addonAfter}
                </InputGroup.Addon>
            );
        } else {
            return null;
        }
    };

    render() {
        let { addonBefore, addonAfter } = this.props;

        if (addonBefore || addonAfter) {
            return (
                <InputGroup>
                    { this.getAddonBefore() }
                    { this.getInput() }
                    { this.getAddonAfter() }
                </InputGroup>
            );
            
        } else {
            return this.getInput();
        }
    }
}

export default FormControl;