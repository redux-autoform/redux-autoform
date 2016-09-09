import React, { Component, PropTypes } from 'react';



const Root = ({fieldLayout, children, handleSubmit}) => {

    // Setting the form class name to "form-horizontal" only affects Bootstrap.
    // ToDo: Make the UI to provide the form class name or the entire Form component
    let formClassName = (fieldLayout == 'inline') ? "form-horizontal" : "";

    return (
        <div className="meta-form">
            <form onSubmit={handleSubmit} className={formClassName}>
                <div className="container-fluid">
                    {children}
                </div>
            </form>
        </div>
    );
};

export default Root;