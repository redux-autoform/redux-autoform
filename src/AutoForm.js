import React from 'react';
import { object, string, func, bool } from 'prop-types';

import AutoFormInternal from './AutoFormInternal';
import MetadataProvider from './metadata/MetadataProvider';
import MetadataValidator from './metadata/validator/MetadataValidator';
import ModelParser from './metadata/model/ModelParser';

export default class AutoForm extends React.Component {
    static propTypes = {
        componentFactory: object,
        schema: object.isRequired,
        entityName: string,
        layoutName: string,
        errorRenderer: func,
        buttonBar: func.isRequired,
        fieldLayout: string,

        // Redux-Form props
        form: string.isRequired,
        onSubmit: func.isRequired,
        onSubmitSuccess: func,
        onSubmitFail: func,
        alwaysAsyncValidate: bool,
        destroyOnUnmount: bool,
        formKey: string,
        initialValues: object,
        overwriteOnInitialValuesChange: bool,
        readonly: bool,
        returnRejectedSubmitPromise: bool,
        touchOnBlur: bool,
        touchOnChange: bool
    };

    render() {
        let {uiType, schema, entityName, layoutName, componentFactory, errorRenderer, buttonBar, fieldLayout} = this.props;
        let {
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
            touchOnChange,
            dirty,
            pristine,
            submitting,
            valid,
            values
        } = this.props;

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
                touchOnChange,
                dirty,
                pristine,
                submitting,
                valid,
                values
            };

            // we need to delete all undefined reduxFormProps specifically because overwriteOnInitialValuesChange cannot
            // be undefined, otherwise it triggers this errors:
            //  Failed prop type: Required prop `overwriteOnInitialValuesChange` was not specified in `ReduxForm(AutoFormInternal)`.
            for (let property in reduxFormProps) {
                if (reduxFormProps.hasOwnProperty(property)) {
                    if (reduxFormProps[property] === undefined) {
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