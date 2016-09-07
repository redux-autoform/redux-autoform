import React, { Component, PropTypes } from 'react';

class ButtonToolbar extends Component {
	static propTypes = {
		pristine: PropTypes.bool.isRequired,
		submitting: PropTypes.bool.isRequired,
		errors: PropTypes.array.isRequired
	};

    render() {
	    let { pristine, submitting, errors } = this.props;
	    let disabled = !!(pristine || errors.length > 0 || submitting);

	    return (
            <div>
                <button type="submit" disabled={disabled}>Submit</button>
            </div>
        );
    }
}

export default ButtonToolbar;