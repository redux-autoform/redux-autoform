import ComponentFactory from './ComponentFactory';
import { registerBaseComponents } from './defaultComponentFactoryHelper';

var componentFactory = new ComponentFactory();

registerBaseComponents(componentFactory);

// set defaults
componentFactory.setDefaultFieldComponents({
    'string': 'Static',
    'array': 'ArrayContainer',
    'datetime': 'Static',
    'time': 'Static',
    'date': 'Static',
    'int' : 'Static',
    'float': 'Static',
    'bool': 'Static',
    'group': 'FieldGroup'
});
componentFactory.setDefaultGroupComponent('Group');

export default componentFactory;