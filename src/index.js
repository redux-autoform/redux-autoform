// main component
export AutoForm from './AutoForm.js';


//TODO JS: add redux-autoform-utils import
// component factories
export ComponentFactory from 'redux-autoform-utils/lib/factory/ComponentFactory';
export DefaultEditComponentFactory from './factory/bootstrap/BootstrapEditComponentFactory';
export DefaultDetailsComponentFactory from './factory/bootstrap/BootstrapDetailsComponentFactory';

//localizers
export momentLocalizer from 'redux-autoform-utils/lib/localization/momentLocalizer';
export numbroLocalizer from 'redux-autoform-utils/lib/localization/numbroLocalizer';