import React from 'react';
import { bool, array } from 'prop-types';

export default class ButtonToolbar extends React.Component {
	static propTypes = {
		pristine: bool.isRequired,
		submitting: bool.isRequired,
		errors: array.isRequired
	};

    render() {
	    const { pristine, submitting, errors } = this.props;
	    const disabled = !!(pristine || errors.length > 0 || submitting);

	    return (
            <div>
                <button type="submit" disabled={disabled}>Submit</button>
            </div>
        );
    }
}