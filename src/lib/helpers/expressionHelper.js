import { getLocalizer } from '../localization/dateLocalizer';


/**
 * Utility class for expressions
 */
export default function() {
    return {
        dateLocalizer: getLocalizer()
    }
}