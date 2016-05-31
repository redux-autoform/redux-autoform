import { setNumberLocalizer } from './numberLocalizer'

export default function(numbro) {

    if (!numbro) throw Error('\'numbro\' should be truthy');

    if (typeof numbro !== 'function')
        throw new TypeError('You must provide a valid numbro object');

    let localizer = {

        cultureData: numbro.cultureData(),

        parse(value, format, culture) {
            if(format) throw Error('numbro localizer\'s parse method does not support passing the format');
            if(culture) throw Error('numbro localizer\'s parse method does not support passing the culture');

            if (!value) return null;

            // numbro's unformat is very permissive, so we need to check for a valid number
            if(/^[+-]?[0-9,\.]+$/.test(value)) { // ToDo: improve this regular expression
                return numbro().unformat(value);
            }
            return null;
        },

        format(value, format, culture) {
            if(culture) throw Error('numbro localizer\'s format method does not support passing the culture');
            return numbro(value).format(format);
        }
    };

    setNumberLocalizer(localizer);

    return localizer;
}
