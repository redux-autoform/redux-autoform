import PropertyFilters from './filter/PropertyFilters';
import Filters from './filter/Filters';

class MetadataEvaluator {

    // this array contains objects like: { property: 'invalid', filter: filter }
    // fieldFilters that don't have a property associated will act on all properties
    // in the order they were registered
    static fieldFilters = [];

    // this array contains metadata filters
    static propertyFilters = [];

    /**
     * Adds the given filter
     */
    static addPropertyFilter(filter) {
        if (!filter) throw Error('\'filter\' should be truthy');

        this.propertyFilters.push(filter);
    }

    /**
     * Adds the given filter for the given metadata property name
     * @param metadataProperty
     * @param filter
     */
    static addPropertyFieldFilter(filter, metadataProperty) {
        if (!filter) throw Error('\'filter\' should be truthy');

        this.fieldFilters.push({property: metadataProperty, filter: filter});
    }

    /**
     * Evaluates the given metadata against the model
     * @param propertyMetadata - Can be either an object or an array of objects
     * @param model
     * @param keyPrefix
     * @param reduxFieldProps
     * @param onChange
     * @returns {{}}
     */
    static evaluate(propertyMetadata, model, keyPrefix, reduxFieldProps, onChange) {
        if (!propertyMetadata) throw Error('Argument \'propertyMetadata\' should be truthy');
        if (!model) throw Error('\'model\' should be truthy');

        if (propertyMetadata.constructor === Array) {
            return propertyMetadata.map(i => this.evaluate(i, model, keyPrefix, reduxFieldProps, onChange));
        }

        let result = {};

        Object.keys(propertyMetadata).forEach((fieldName) => {
            result[fieldName] = this.filterPropertyField(fieldName, propertyMetadata[fieldName], model);
        });

        let newPrefix = keyPrefix ? `${keyPrefix}.${propertyMetadata.name}` : propertyMetadata.name;

        return this.filterProperty(result, model, newPrefix, reduxFieldProps, onChange);
    }

    /**
     * Filters the given property against the model
     * @param fieldName
     * @param fieldValue
     * @param model
     */
    static filterPropertyField(fieldName, fieldValue, model) {
        let { fieldFilters } = this;
        let processedFieldValue = fieldValue;

        for (let i = 0; i < fieldFilters.length; i++) {

            if (!fieldFilters[i].property || fieldFilters[i].property === fieldName) {
                let filter = fieldFilters[i].filter;

                processedFieldValue = filter(fieldName, processedFieldValue, model);
            }
        }

        return processedFieldValue;
    }

    /**
     * Filters the given metadata against the model
     * @param metadata
     * @param model
     * @param keyPrefix
     * @param metadataIndex
     * @param reduxProps
     * @returns {*}
     */
    static filterProperty(metadata, model, keyPrefix, metadataIndex, reduxProps) {
        let { propertyFilters } = this;
        let processedMetadata = metadata;

        for (let i = 0; i < propertyFilters.length; i++) {
            let filter = propertyFilters[i];

            processedMetadata = filter(processedMetadata, model, keyPrefix, this, metadataIndex, reduxProps);
        }

        return processedMetadata;
    }
}

// register metadata filters
MetadataEvaluator.addPropertyFilter(Filters.defaultFilter); // sets redux props, key and id
MetadataEvaluator.addPropertyFilter(Filters.entityFilter); // processes entities
MetadataEvaluator.addPropertyFilter(Filters.arrayFilter); // processes arrays

// register property field filters
// evaluates functions to literals
MetadataEvaluator.addPropertyFieldFilter(PropertyFilters.propertyFilter);

export default MetadataEvaluator;