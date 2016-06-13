import componentFactory from './DefaultComponentFactoryBase';

// set defaults
componentFactory.setDefaultFieldComponents({
    'string': 'Static',
    'array': 'ArrayContainer',
    'datetime': 'Static',
    'time': 'Static',
    'date': 'Static',
    'int' : 'Static',
    'float': 'Static',
    'bool': 'Static'
});
componentFactory.setDefaultGroupComponent('Group');

export default componentFactory;