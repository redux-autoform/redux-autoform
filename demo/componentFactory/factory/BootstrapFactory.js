import ComponentFactory from './ComponentFactory';
import TextBox from '../components/field/TextBox';
import Password from '../components/field/Password';
import Email from '../components/field/Email';
import Select from '../components/field/Select';
import TextArea from '../components/field/TextArea';
import ArrayContainer from '../components/field/ArrayContainer';
import Static from '../components/field/Static';
import FieldGroup from '../components/field/FieldGroup';
import Checkbox from '../components/field/CheckBox';
import Radio from '../components/field/Radio';

import Group from '../components/group/Group';
import TabGroup from '../components/group/TabGroup';
import WizardGroup from '../components/group/WizardGroup';
import WizardTabGroup from '../components/group/WizardTabGroup';

import Root from '../components/common/Root';

class BootstrapFactory extends ComponentFactory {
    constructor(config) {
        super();

        this.setBaseComponents();
        this.setDefaultConfiguration(config);
    }

    
    setBaseComponents = () => {
        this.registerFieldComponent('TextBox', ['string', 'int', 'float', 'datetime', 'date', 'time'], TextBox);
        this.registerFieldComponent('Password', ['string'], Password);
        this.registerFieldComponent('Email', ['string'], Email);
        this.registerFieldComponent('Select', ['string'], Select);
        this.registerFieldComponent('Radio', ['string'], Radio);
        this.registerFieldComponent('TextArea', ['string'], TextArea);
        this.registerFieldComponent('ArrayContainer', ['array'], ArrayContainer);
        this.registerFieldComponent('Checkbox', ['bool'], Checkbox);
        this.registerFieldComponent('Static', ['string', 'int', 'float', 'datetime', 'date', 'time', 'bool'], Static);
        this.registerFieldComponent('FieldGroup', ['group'], FieldGroup);

        this.registerGroupComponent('Group', Group);
        this.registerGroupComponent('TabGroup', TabGroup);
        this.registerGroupComponent('WizardGroup', WizardGroup);
        this.registerGroupComponent('WizardTabGroup', WizardTabGroup);

        this.registerRootComponent("default", Root);
    };
    
    setDefaultConfiguration = (config) => {
        this.setDefaultFieldComponents(config);
        this.setDefaultGroupComponent('Group');
        this.setCurrentRoot("default");
    };


}

export default BootstrapFactory;