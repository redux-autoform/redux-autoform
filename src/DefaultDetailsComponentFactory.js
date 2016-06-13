import componentFactory from './DefaultComponentFactoryBase';

// set defaults
componentFactory.setDefaultFieldComponents({
    'string': 'TextBox',
    'array': 'ArrayContainer',
    'datetime': 'DateTimePicker',
    'time': 'DateTimePicker',
    'date': 'DateTimePicker',
    'int' : 'TextBox',
    'float': 'TextBox',
    'bool': 'Toggle'
});
componentFactory.setDefaultGroupComponent('Group');

export default componentFactory;