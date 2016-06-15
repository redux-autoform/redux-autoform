import TextBox from './components/fieldComponents/TextBox';
import Select from './components/fieldComponents/Select';
import TextArea from './components/fieldComponents/TextArea';
import Group from './components/groupComponents/Group';
import ArrayContainer from './components/fieldComponents/ArrayContainer';
import DateTimePicker from './components/fieldComponents/DateTimePicker';
import Lookup from './components/fieldComponents/Lookup';
import Toggle from './components/fieldComponents/Toggle';
import Static from './components/fieldComponents/Static';
import FieldGroup from './components/fieldComponents/FieldGroup';

export function registerBaseComponents(componentFactory) {
    if (!componentFactory) throw Error('\'componentFactory\' should be truthy');

    componentFactory.registerFieldComponent('TextBox', ['string', 'int', 'float', 'datetime', 'date', 'time'], TextBox);
    componentFactory.registerFieldComponent('Select', ['string'], Select);
    componentFactory.registerFieldComponent('Lookup', ['string'], Lookup);
    componentFactory.registerFieldComponent('TextArea', ['string'], TextArea);
    componentFactory.registerFieldComponent('ArrayContainer', ['array'], ArrayContainer);
    componentFactory.registerFieldComponent('DateTimePicker', ['datetime', 'date', 'time'], DateTimePicker);
    componentFactory.registerFieldComponent('Toggle', ['bool'], Toggle);
    componentFactory.registerFieldComponent('Static', ['string', 'int', 'float', 'datetime', 'date', 'time', 'bool'], Static);
    componentFactory.registerFieldComponent('FieldGroup', ['group'], FieldGroup);

    componentFactory.registerGroupComponent('Group', Group);
}