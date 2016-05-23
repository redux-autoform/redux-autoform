import componentFactory from './ComponentFactory.js';

import TextBox from './components/fieldComponents/TextBox';
import Group from './components/groupComponents/Group';
import ArrayContainer from './components/fieldComponents/ArrayContainer';
import DateTimePicker from './components/fieldComponents/DateTimePicker';

componentFactory.registerFieldComponent('TextBox', ['string', 'int', 'float'], TextBox);
componentFactory.registerFieldComponent('ArrayContainer', ['array'], ArrayContainer);
componentFactory.registerFieldComponent('DateTimePicker', ['datetime'], DateTimePicker);

componentFactory.registerGroupComponent('Group', Group);

// set defaults
componentFactory.setDefaultFieldComponents({
    'string': 'TextBox',
    'array': 'ArrayContainer',
    'datetime': 'DateTimePicker'
});
componentFactory.setDefaultGroupComponent('Group');

export default componentFactory;