import { getNumberLocalizer } from 'redux-autoform-utils/lib/localization/numberLocalizer';
var localizer;

export default function parse(metadata, value) {
    if(typeof value == 'string') {
        if(!localizer) localizer = getNumberLocalizer();
        return localizer.parse(value);
    }
    return value;
}