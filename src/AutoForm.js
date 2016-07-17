import React, { Component, PropTypes } from 'react'
import AutoFormInternal from './AutoFormInternal';
import metadataProvider from './lib/metadataProvider';
import metadataValidator from './lib/metadataValidator';
import modelProcessor from './lib/modelParser';

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
        //TODO JS: capture uiType property
        let { schema, entityName, layoutName, componentFactory, onSubmit, onSubmitFail, onSubmitSuccess, errorRenderer, form, buttonBar, fieldLayout, initialValues } = this.props;
        
        try {
            let { entity, layout } = metadataProvider.getEntityAndLayout(schema, entityName, layoutName);
            let fieldMetadata = metadataProvider.getFields(schema, entity, layout, f => {
                f.componentFactory = componentFactory;
                f.fieldLayout = fieldLayout;
            });
            let fields = metadataProvider.getReduxFormFields(fieldMetadata);
            let validate = (values) => {
                let modelParsed = modelProcessor.process(values, fieldMetadata);
                return metadataValidator.validate(fieldMetadata, modelParsed) || {};
            };
            
            let autoFormProps = { form, fields, fieldMetadata, entity, layout, validate, componentFactory, onSubmit, onSubmitSuccess, onSubmitFail, buttonBar, fieldLayout, initialValues };

            return <AutoFormInternal {...autoFormProps}/>
        } catch(ex) {
            return errorRenderer ? errorRenderer(ex) : <div> {ex.message} </div>;
        }
    }
}

export default AutoForm;