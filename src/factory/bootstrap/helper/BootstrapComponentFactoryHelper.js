import TextBox from './../../../components/bootstrap/fieldComponents/TextBox';
import Select from './../../../components/bootstrap/fieldComponents/Select';
import TextArea from './../../../components/bootstrap/fieldComponents/TextArea';
import Group from './../../../components/bootstrap/groupComponents/Group';
import ArrayContainer from './../../../components/bootstrap/fieldComponents/ArrayContainer';
import DateTimePicker from './../../../components/bootstrap/fieldComponents/DateTimePicker';
import Lookup from './../../../components/bootstrap/fieldComponents/Lookup';
import Static from './../../../components/bootstrap/fieldComponents/Static';
import FieldGroup from './../../../components/bootstrap/fieldComponents/FieldGroup';
import Checkbox from './../../../components/bootstrap/fieldComponents/CheckBox';
import Radio from './../../../components/bootstrap/fieldComponents/Radio';

export function registerBaseComponents(componentFactory) {
    if (!componentFactory) throw Error('\'componentFactory\' should be truthy');

    componentFactory.registerFieldComponent('TextBox', ['string', 'int', 'float', 'datetime', 'date', 'time'], TextBox);
    componentFactory.registerFieldComponent('Select', ['string'], Select);
    componentFactory.registerFieldComponent('Radio', ['string'], Radio);
    componentFactory.registerFieldComponent('Lookup', ['string'], Lookup);
    componentFactory.registerFieldComponent('TextArea', ['string'], TextArea);
    componentFactory.registerFieldComponent('ArrayContainer', ['array'], ArrayContainer);
    componentFactory.registerFieldComponent('DateTimePicker', ['datetime', 'date', 'time'], DateTimePicker);
    componentFactory.registerFieldComponent('Checkbox', ['bool'], Checkbox);
    componentFactory.registerFieldComponent('Static', ['string', 'int', 'float', 'datetime', 'date', 'time', 'bool'], Static);
    componentFactory.registerFieldComponent('FieldGroup', ['group'], FieldGroup);

    componentFactory.registerGroupComponent('Group', Group);
}