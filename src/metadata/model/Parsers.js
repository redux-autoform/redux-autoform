import { getFormat } from 'redux-autoform-utils/lib/helpers/dateTimeHelpers';
import { getDateLocalizer } from 'redux-autoform-utils/lib/localization/dateLocalizer';
import { getNumberLocalizer } from 'redux-autoform-utils/lib/localization/numberLocalizer';

export default class Parsers {

    /**
     *
     * @param metadata
     * @param value
     * @param modelParser
     * @returns {*}
     */
    static parseArray(metadata, value, modelParser) {
        return value.map(item => modelParser.process(item, (metadata.fields)));
    }

    /**
     *
     * @param metadata
     * @param value
     * @returns {*}
     */
    static parseDateTime(metadata, value) {
        var localizer;

        if(typeof value == 'string') {
            if(!localizer) localizer = getDateLocalizer();
            let format = getFormat(metadata, localizer);
            return localizer.parse(value, format);
        }

        return value;
    }

    /**
     *
     * @param metadata
     * @param value
     * @param modelParser
     * @returns {*}
     */
    static parseEntity(metadata, value, modelParser) {
        return modelParser.process(value, metadata.fields, modelParser);
    }

    /**
     *
     * @param metadata
     * @param value
     * @returns {*}
     */
    static parseNumber(metadata, value) {
        var localizer;

        if(typeof value == 'string') {
            if(!localizer) localizer = getNumberLocalizer();
            return localizer.parse(value);
        }
        return value;
    }
}