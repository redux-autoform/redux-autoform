import React, { Component, PropTypes } from 'react';

const VerticalComponent = ({children, size}) => (
	<div className="container-fluid">
		<div className="row">
			<div className={`col-md-${size}`}>
				{children}
			</div>
		</div>
	</div>
);

VerticalComponent.propTypes = {
	children: PropTypes.object,
	size: PropTypes.number
};

export default VerticalComponent;