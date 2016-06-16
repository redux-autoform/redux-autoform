import ComponentFactory from './ComponentFactory';
import { registerBaseComponents } from './defaultComponentFactoryHelper';

var componentFactory = new ComponentFactory();

registerBaseComponents(componentFactory);

// set defaults
componentFactory.setDefaultFieldComponents({
    'string': 'TextBox',
    'array': 'ArrayContainer',
    'datetime': 'DateTimePicker',
    'time': 'DateTimePicker',
    'date': 'DateTimePicker',
    'int' : 'TextBox',
    'float': 'TextBox',
    'bool': 'Checkbox',
    'group': 'FieldGroup'
});
componentFactory.setDefaultGroupComponent('Group');

export default componentFactory;