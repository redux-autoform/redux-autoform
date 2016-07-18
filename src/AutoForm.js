import React, { Component, PropTypes } from 'react'
import AutoFormInternal from './AutoFormInternal';
import MetadataProvider from './metadata/MetadataProvider';
import metadataValidator from './metadata/validator/metadataValidator';
import modelProcessor from './metadata/model/modelParser';

class AutoForm extends Component {
    static propTypes = {
        uiType: PropTypes.string,
        componentFactory: PropTypes.object.isRequired,
        schema: PropTypes.object.isRequired,
        entityName: PropTypes.string.isRequired,
        layoutName: PropTypes.string.isRequired,
        errorRenderer: PropTypes.func,
        onSubmit: PropTypes.func.isRequired,
        onSubmitSuccess: PropTypes.func,
        onSubmitFail: PropTypes.func,
        form: PropTypes.string.isRequired,
        buttonBar: PropTypes.func.isRequired,
        fieldLayout: PropTypes.string
    };

    render() {
        let { uiType, schema, entityName, layoutName, componentFactory, onSubmit, onSubmitFail, onSubmitSuccess, errorRenderer, form, buttonBar, fieldLayout, initialValues } = this.props;
        
        try {
            let { entity, layout } = MetadataProvider.getEntityAndLayout(schema, entityName, layoutName);
            let fieldMetadata = MetadataProvider.getFields(schema, entity, layout, f => {
                f.componentFactory = componentFactory;
                f.fieldLayout = fieldLayout;
            });
            let fields = MetadataProvider.getReduxFormFields(fieldMetadata);
            let validate = (values) => {
                let modelParsed = modelProcessor.process(values, fieldMetadata);
                return metadataValidator.validate(fieldMetadata, modelParsed) || {};
            };
            
            let autoFormProps = { uiType, form, fields, fieldMetadata, entity, layout, validate, componentFactory, onSubmit, onSubmitSuccess, onSubmitFail, buttonBar, fieldLayout, initialValues };

            return <AutoFormInternal {...autoFormProps}/>
        } catch(ex) {
            return errorRenderer ? errorRenderer(ex) : <div> {ex.message} </div>;
        }
    }
}

export default AutoForm;