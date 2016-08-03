export default class Filters {

    /**
     *
     * @param propertyMetadata
     * @param model
     * @param keyPrefix
     * @param metadataEvaluator
     * @param reduxProps
     * @param onChange
     * @returns {*}
     */
    static filterArray(propertyMetadata, model, keyPrefix, metadataEvaluator, reduxProps, onChange) {

        if(!propertyMetadata) throw Error('Argument \'propertyMetadata\' should be truthy');
        if(!model) throw Error('Argument \'model\' should be truthy');

        if (propertyMetadata.type == 'array' && propertyMetadata.arrayType == 'entity') {
            if (!propertyMetadata.fields) {
                throw Error('when metadata is of type \'array\' and arrayType is \'entity\', it must have a fields property');
            }

            if (!model.hasOwnProperty(propertyMetadata.name) || model[propertyMetadata.name] === null || model[propertyMetadata.name] === undefined) {
                // if the property does not exist, create it
                model[propertyMetadata.name] = [];
            } else {
                // if the property exists, it must be an object
                if (!(model[propertyMetadata.name] instanceof Array)) {
                    throw Error('when metadata is of type array, the model value should be an array');
                }
            }

            // returns the reduxProps for a particular array item
            let getReduxPropsForItem = (index) => {
                if(!reduxProps) return undefined;
                if(reduxProps && !reduxProps.hasOwnProperty(propertyMetadata.name)) throw Error('reduxProps is defined but it does not have the required property metadata');
                return reduxProps[propertyMetadata.name][index];
            };

            propertyMetadata.fields = model[propertyMetadata.name].map((item, index) =>  metadataEvaluator.evaluate(propertyMetadata.fields, item, `${keyPrefix}.${index}`, getReduxPropsForItem(index), onChange));
        }
        return propertyMetadata;
    }

    /**
     *
     * @param propertyMetadata
     * @param model
     * @param keyPrefix
     * @param metadataEvaluator
     * @param reduxProps
     * @param onChange
     * @returns {*}
     */
    static filterDefault(propertyMetadata, model, keyPrefix, metadataEvaluator, reduxProps, onChange) {

        if(!propertyMetadata) throw Error('Argument \'propertyMetadata\' should be truthy');
        if(!model) throw Error('Argument \'model\' should be truthy');

        propertyMetadata.key = keyPrefix;

        // set redux properties
        if(reduxProps && reduxProps.hasOwnProperty(propertyMetadata.name)) {
            propertyMetadata.reduxFormProps = reduxProps[propertyMetadata.name];
        }

        return propertyMetadata;
    }

    /**
     *
     * @param propertyMetadata
     * @param model
     * @param keyPrefix
     * @param metadataEvaluator
     * @param reduxProps
     * @param onChange
     * @returns {*}
     */
    static filterEntity(propertyMetadata, model, keyPrefix, metadataEvaluator, reduxProps, onChange) {
        if (!propertyMetadata) throw new Error('metadata is required');
        if (!model) throw new Error('model is required');

        if (propertyMetadata.type == 'entity') {

            if (! propertyMetadata.fields) {
                throw Error('when metadata is of type entity, it must have a fields property');
            }

            if (model && !model.hasOwnProperty(propertyMetadata.name) || model[propertyMetadata.name] === null || model[propertyMetadata.name] === undefined) {
                // if the property does not exist, create it
                model[propertyMetadata.name] = {};
            } else {
                // if the property exists, it must be an object
                if (typeof model[propertyMetadata.name] !== 'object') {
                    throw Error('when metadata is of type entity, the model value should be an object');
                }
            }

            let itemReduxProps = reduxProps ? reduxProps[propertyMetadata.name] : undefined;
            propertyMetadata.fields = metadataEvaluator.evaluate(propertyMetadata.fields, model[propertyMetadata.name], keyPrefix, itemReduxProps, onChange);
        }

        return propertyMetadata;
    }
}