import React, { Component, PropTypes } from 'react'
import AutoFormInternal from './AutoFormInternal';
import MetadataProvider from './metadata/MetadataProvider';
import MetadataValidator from './metadata/validator/MetadataValidator';
import ModelParser from './metadata/model/ModelParser';

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
                let modelParsed = ModelParser.process(values, fieldMetadata);
                return MetadataValidator.validate(fieldMetadata, modelParsed) || {};
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

            // we need to delete all undefined reduxFormProps specifically because overwriteOnInitialValuesChange cannot
            // be undefined, otherwise it triggers this errors:
            //  Failed prop type: Required prop `overwriteOnInitialValuesChange` was not specified in `ReduxForm(AutoFormInternal)`.
            for (var property in reduxFormProps) {
                if (reduxFormProps.hasOwnProperty(property)) {
                    if(reduxFormProps[property] === undefined) {
                        delete(reduxFormProps[property]);
                    }
                }
            }

            return <AutoFormInternal {...autoFormProps} {...reduxFormProps}/>
        } catch (ex) {
            return errorRenderer ? errorRenderer(ex) : <div> {ex.message} </div>;
        }
    }
}

export default AutoForm;