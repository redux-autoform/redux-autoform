import { setDateLocalizer } from './dateLocalizer'

export default function(moment) {
    if (!moment) throw Error('\'moment\' should be truthy');

    if (typeof moment !== 'function')
        throw new TypeError('You must provide a valid moment object');

    let localField = typeof moment().locale === 'function' ? 'locale' : 'lang';

    if (!moment.localeData)
        throw new TypeError('The Moment localizer depends on the `localeData` api, please provide a moment object v2.2.0 or higher');

    let getMoment = (culture, value, format) => culture ? moment(value, format)[localField](culture) : moment(value, format);

    let endOfDecade = (date) => moment(date).add(10, 'year').add(-1, 'millisecond').toDate();

    let endOfCentury = (date) => moment(date).add(100, 'year').add(-1, 'millisecond').toDate();

    let localizer = {
        formats: {
            date: 'L',
            time: 'LT',
            default: 'lll',
            header: 'MMMM YYYY',
            footer: 'LL',
            weekday: 'dd',
            dayOfMonth: 'DD',
            month: 'MMM',
            year: 'YYYY',

            decade(date, culture, localizer) {
                return localizer.format(date, 'YYYY', culture)
                    + ' - ' + localizer.format(endOfDecade(date), 'YYYY', culture)
            },

            century(date, culture, localizer) {
                return localizer.format(date, 'YYYY', culture)
                    + ' - ' + localizer.format(endOfCentury(date), 'YYYY', culture)
            }
        },

        firstOfWeek(culture) {
            return moment.localeData(culture).firstDayOfWeek()
        },

        parse(value, format, culture) {
            if (!value) return undefined; // localizers should return undefined for empty inputs
            const m = getMoment(culture, value, format);
            if (m.isValid()) return m.toDate();
            return null; // localizers should return nul for invalid inputs
        },

        format(value, format, culture) {
            return getMoment(culture, value).format(format)
        }
    };

    setDateLocalizer(localizer);

    return localizer;
}
