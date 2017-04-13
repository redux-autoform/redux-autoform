import React from 'react';
import ComponentFactory from 'redux-autoform-utils/lib/factory/ComponentFactory';
import Group from './components/groupComponents/Group';
import TextBox from './components/fieldComponents/TextBox';
import RootComponent from './components/RootComponent';

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
        return RootComponent;
    };

}

export default DemoFactory;