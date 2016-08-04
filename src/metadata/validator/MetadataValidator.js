import Validators from './Validators'

class MetadataValidator {
    static validators = [];

    /**
     *
     * @param validator
     */
    static addValidator(validator) {
        this.validators.push(validator);
    }

    /**
     * Evaluates the given metadata against the model
     * @param propertyMetadata - Can be either an object or an array of objects
     * @param model
     * @returns {{}}
     */
    static validate(propertyMetadata, model) {
        if (!propertyMetadata) throw Error('Argument \'propertyMetadata\' should be truthy');
        if (!model) throw Error('\'model\' should be truthy');
        if (propertyMetadata.constructor !== Array) throw Error('ApropertyMetadata should be an array');

        let { validators } = this;
        let validationResult = {};

        propertyMetadata.forEach(m => {
            let propertyValidation;

            for(let i = 0; i < validators.length; i++) {
                let validate = validators[i];
                propertyValidation = validate(m, model[m.name], model, this);

                if (propertyValidation !== null && propertyValidation !== undefined) break;
            }

            validationResult[m.name] = propertyValidation;
        });

        return validationResult;
    }
}

//Adding validators..
MetadataValidator.addValidator(Validators.validateRequired);
MetadataValidator.addValidator(Validators.validateArray);
MetadataValidator.addValidator(Validators.validateEntity);
MetadataValidator.addValidator(Validators.validateDefault);
MetadataValidator.addValidator(Validators.validateDateTime);
MetadataValidator.addValidator(Validators.validateInt);
MetadataValidator.addValidator(Validators.validateFloat);

export default MetadataValidator;