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

            if (value == null || value == undefined || value == '') return undefined; // localizers should return undefined for empty inputs and null for invalid inputs

            // numbro's unformat is very permissive, so we need to check for a valid number
            if(/^[+-]?[0-9,\.]+$/.test(value)) { // ToDo: improve this regular expression
                let result = numbro().unformat(value);
                return isNaN(result) ? null : result; // numbro returns NaN sometimes. We need to make sure that the localizers always return null for invalid inputs
            }
            return null; // localizers should return null for invalid inputs
        },

        format(value, format, culture) {
            if(culture) throw Error('numbro localizer\'s format method does not support passing the culture');
            return numbro(value).format(format);
        }
    };

    setNumberLocalizer(localizer);

    return localizer;
}
