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
        let { value, placeholder, componentClass, children, rows, inputType } = this.props;
        let formControlProps = { value, placeholder, componentClass, rows };
        
        return (
            <BootstrapFormControl type={inputType} ref="input" onChange={this.handleChange} onBlur={this.handleBlur} {...formControlProps}>
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
        let before = this.getAddonBefore();
        let input = this.getInput();
        let after = this.getAddonAfter();

        if (addonBefore || addonAfter) {
            return (
                <InputGroup>
                    { before }
                    { input }
                    { after }
                </InputGroup>
            );
            
        } else {
            return input;
        }
    }
}

export default FormControl;