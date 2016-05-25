import { getLocalizer } from '../localization/dateLocalizer';
import formato from 'formato';

/**
 * Utility class for expressions
 */
export default function() {
    return {
        dateLocalizer: getLocalizer(),

        format: function() {
            return formato.format(...arguments);
        },

        unformat: function() {
            return formato.unformat(...arguments);
        }
    }
}