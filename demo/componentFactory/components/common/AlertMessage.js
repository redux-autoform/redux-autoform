import React, { Component, PropTypes } from 'react';
import { Alert } from 'react-bootstrap';

const AlertMessage = ({ error }) => (
	<Alert bsStyle='danger'>
		<h4>
			Could not render the MetaFormGroup component. The schema is not valid.
		</h4>
		<p>Detailed information:
			<b>{ error.message }</b>
		</p>
	</Alert>
);

export default AlertMessage;