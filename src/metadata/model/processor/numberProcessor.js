import { getNumberLocalizer } from '../../../localization/numberLocalizer';
var localizer;

export default function parse(metadata, value) {
    if(typeof value == 'string') {
        if(!localizer) localizer = getNumberLocalizer();
        return localizer.parse(value);
    }
    return value;
}