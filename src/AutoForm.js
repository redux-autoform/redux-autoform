import React, { Component, PropTypes } from 'react'
import AutoFormInternal from './AutoFormInternal';
import metadataProvider from './lib/metadataProvider';
import metadataValidator from './lib/metadataValidator';
import modelProcessor from './lib/modelParser';

class AutoForm extends Component {

    render() {

        let {
            schema,
            entityName,
            layoutName,
            componentFactory,
            onSubmit,
            onSubmitFail,
            onSubmitSuccess,
            errorRenderer,
            form,
            buttonBar
        } = this.props;

        try {

            let {entity, layout} = metadataProvider.getEntityAndLayout(schema, entityName, layoutName);
            let fieldMetadata = metadataProvider.getFields(schema, entity, layout, f => {
                f.componentFactory = componentFactory;
            });
            let fields = metadataProvider.getReduxFormFields(fieldMetadata);
            let validate = (values) => {
                let modelParsed = modelProcessor.process(values, fieldMetadata);
                return metadataValidator.validate(fieldMetadata, modelParsed) || {};
            };

            return <AutoFormInternal
                form={form}
                fields={fields}
                fieldMetadata={fieldMetadata}
                entity={entity}
                layout={layout}
                validate={validate}
                componentFactory={componentFactory}
                onSubmit={onSubmit}
                onSubmitSuccess={onSubmitSuccess}
                onSubmitFail={onSubmitFail}
                buttonBar={buttonBar}
            />
        }
        catch(ex) {
            return errorRenderer ? errorRenderer(ex) : <div> {ex.message} </div>;
        }

    }

}

AutoForm.propTypes = {
    componentFactory: PropTypes.object.isRequired,
    schema: PropTypes.object.isRequired,
    entityName: PropTypes.string.isRequired,
    layoutName: PropTypes.string.isRequired,
    errorRenderer: PropTypes.func,
    onSubmit: PropTypes.func.isRequired,
    onSubmitSuccess: PropTypes.func,
    onSubmitFail: PropTypes.func,
    form: PropTypes.string.isRequired,
    buttonBar: PropTypes.object.isRequired
};

export default AutoForm;