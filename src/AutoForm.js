import React, {Component, PropTypes} from 'react'
import AutoFormInternal from './AutoFormInternal';
import MetadataProvider from './metadata/MetadataProvider';
import metadataValidator from './metadata/validator/metadataValidator';
import modelProcessor from './metadata/model/modelParser';

class AutoForm extends Component {
    static propTypes = {
        uiType: PropTypes.string,
        componentFactory: PropTypes.object,
        schema: PropTypes.object.isRequired,
        entityName: PropTypes.string,
        layoutName: PropTypes.string,
        errorRenderer: PropTypes.func,
        buttonBar: PropTypes.func.isRequired,
        fieldLayout: PropTypes.string,

        // Redux-Form props
        form: PropTypes.string.isRequired,
        onSubmit: PropTypes.func.isRequired,
        onSubmitSuccess: PropTypes.func,
        onSubmitFail: PropTypes.func,
        alwaysAsyncValidate: PropTypes.bool,
        destroyOnUnmount: PropTypes.bool,
        formKey: PropTypes.string,
        initialValues: PropTypes.object,
        overwriteOnInitialValuesChange: PropTypes.bool,
        readonly: PropTypes.bool,
        returnRejectedSubmitPromise: PropTypes.bool,
        touchOnBlur: PropTypes.bool,
        touchOnChange: PropTypes.bool
    };

    render() {
        let {uiType, schema, entityName, layoutName, componentFactory, errorRenderer, buttonBar, fieldLayout} = this.props;
        let {form, onSubmit, onSubmitSuccess, onSubmitFail, alwaysAsyncValidate, destroyOnUnmount, formKey, initialValues, overwriteOnInitialValuesChange, readonly, returnRejectedSubmitPromise, touchOnBlur, touchOnChange} = this.props;

        try {
            schema = MetadataProvider.canonizeSchema(schema); // This will allow for flexible schema definition (arrays vs. objects)

            let {entity, layout} = MetadataProvider.getEntityAndLayout(schema, entityName, layoutName);

            let fieldMetadata = MetadataProvider.getFields(schema, entity, layout, f => {
                f.componentFactory = componentFactory;
                f.fieldLayout = fieldLayout;
            });
            let fields = MetadataProvider.getReduxFormFields(fieldMetadata);
            let validate = (values) => {
                let modelParsed = modelProcessor.process(values, fieldMetadata);
                return metadataValidator.validate(fieldMetadata, modelParsed) || {};
            };

            let autoFormProps = {
                uiType,
                fields,
                fieldMetadata,
                entity,
                layout,
                validate,
                componentFactory,
                buttonBar,
                fieldLayout
            };

            let reduxFormProps = {
                form,
                onSubmit,
                onSubmitSuccess,
                onSubmitFail,
                alwaysAsyncValidate,
                destroyOnUnmount,
                formKey,
                initialValues,
                overwriteOnInitialValuesChange,
                readonly,
                returnRejectedSubmitPromise,
                touchOnBlur,
                touchOnChange
            };

            return <AutoFormInternal {...autoFormProps} {...reduxFormProps}/>
        } catch (ex) {
            return errorRenderer ? errorRenderer(ex) : <div> {ex.message} </div>;
        }
    }
}

export default AutoForm;