import { getFormat } from '../../../helpers/dateTimeHelpers';
import { getDateLocalizer } from '../../../localization/dateLocalizer';

var localizer;

export default function parse(metadata, value) {
    if(typeof value == 'string') {
        if(!localizer) localizer = getDateLocalizer();
        let format = getFormat(metadata, localizer);
        return localizer.parse(value, format);
    }
    return value;
}