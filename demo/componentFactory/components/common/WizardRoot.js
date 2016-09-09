import React, { Component, PropTypes } from 'react';



const Root = ({fieldLayout, children, handleSubmit, buttonBar, submitting}) => {

    // Setting the form class name to "form-horizontal" only affects Bootstrap.
    // ToDo: Make the UI to provide the form class name or the entire Form component
    let formClassName = (fieldLayout == 'inline') ? "form-horizontal" : "";

    return (
        <div className="meta-form">
            <p>WIZARD!</p>
            <form onSubmit={handleSubmit} className={formClassName}>
                { children }
            </form>
        </div>
    );
};

export default Root;