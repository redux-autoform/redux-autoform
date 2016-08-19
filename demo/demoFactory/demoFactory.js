import ComponentFactory from 'redux-autoform-utils/lib/factory/ComponentFactory';
import Group from './components/groupComponents/Group';
import TextBox from './components/fieldComponents/TextBox';

import React from 'react';

class DemoFactory extends ComponentFactory {
    constructor(config) {
        super();
        this.setBaseComponents();
        this.setDefaultConfiguration(config);
    }

    setBaseComponents = () => {
        this.registerFieldComponent('TextBox', ['string', 'int', 'float', 'datetime', 'date', 'time'], TextBox);
        this.registerGroupComponent('Group', Group);
    };

    setDefaultConfiguration = (config) => {
        this.setDefaultFieldComponents(config);
        this.setDefaultGroupComponent('Group');
    };

    getRoot = () => {
        return ({fieldLayout, children, handleSubmit, buttonBar, submitting}) => (
            <div className="meta-form">
                <form onSubmit={handleSubmit}>
                    { children }
                    { React.createElement(buttonBar, { submitting: submitting }) }
                </form>
            </div>
        );


    }
}

export default DemoFactory;