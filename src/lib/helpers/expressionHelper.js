import { getDateLocalizer } from '../localization/dateLocalizer';
import formato from 'formato';

/**
 * Utility class for expressions
 */
export default function() {
    return {
        dateLocalizer: getDateLocalizer(),

        format: function() {
            return formato.format(...arguments);
        },

        unformat: function() {
            return formato.unformat(...arguments);
        }
    }
}