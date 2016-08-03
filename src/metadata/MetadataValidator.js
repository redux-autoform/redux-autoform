import Validators from './validator/Validators'

class MetadataValidator {
    static validators = [];

    /**
     *
     * @param validator
     */
    static add(validator) {
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

        let validationResult = {};
        propertyMetadata.forEach(m => {
            let propertyValidation;
            for(let i = 0; i < this.validators.length; i++) {
                let validate = this.validators[i];
                propertyValidation = validate(m, model[m.name], model, this);
                if(propertyValidation !== null && propertyValidation !== undefined) break;
            }
            validationResult[m.name] = propertyValidation;
        });

        return validationResult;
    }
}

//Adding validators..
MetadataValidator.add(Validators.validateRequired);
MetadataValidator.add(Validators.validateArray);
MetadataValidator.add(Validators.validateEntity);
MetadataValidator.add(Validators.validateDefault);
MetadataValidator.add(Validators.validateDateTime);
MetadataValidator.add(Validators.validateInt);
MetadataValidator.add(Validators.validateFloat);

export default MetadataValidator;