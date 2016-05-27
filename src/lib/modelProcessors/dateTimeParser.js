import { getLocalizer } from '../localization/dateLocalizer';
var localizer;

export default function parse(metadata, value) {
    if(typeof value == 'string') {
        if(!localizer) localizer = getLocalizer();
        let format = metadata.format || localizer.formats.default;
        let result = localizer.parse(value, format);
        return result;
    }
    return value;
}