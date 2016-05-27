import { getLocalizer } from '../localization/dateLocalizer';
var localizer;

export default function parse(metadata, value) {
    if(typeof value == 'string') {
        if(!localizer) localizer = getLocalizer();
        let format;
        if(metadata.format)
            format = metadata.format;
        else {
            switch(metadata.type) {
                case 'date':
                    format = localizer.formats.date;
                    break;
                case 'time':
                    format = localizer.formats.time;
                    break;
                case 'datetime':
                    format = localizer.formats.default;
                    break;
                default:
                    throw Error(`Unsupported type: ${metadata.type}`);
            }
        }
        return localizer.parse(value, format);
    }
    return value;
}