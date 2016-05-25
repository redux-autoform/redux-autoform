import { getLocalizer } from '../localization/dateLocalizer';
var localizer = getLocalizer();

export default function parse(metadata, value) {
    if(typeof value == 'string') {
        let format = metadata.format || localizer.formats.default;
        return localizer.parse(value, format);
    }
    return value;
}