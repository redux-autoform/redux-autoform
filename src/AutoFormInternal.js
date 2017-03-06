import React, { Component, PropTypes } from 'react'
import { reduxForm } from 'redux-form';
import MetadataEvaluator from './metadata/evaluator/MetadataEvaluator';
import ModelParser from './metadata/model/ModelParser';
// import UIManager from './UIManager';

class AutoFormInternal extends Component {
    static propTypes = {
        uiType: PropTypes.string,
        fields: PropTypes.node.isRequired,
        handleSubmit: PropTypes.func.isRequired,
        resetForm: PropTypes.func,
        submitting: PropTypes.bool.isRequired,
        componentFactory: PropTypes.object,
        entity: PropTypes.object.isRequired,
        layout: PropTypes.object,
        buttonBar: PropTypes.func.isRequired,
        fieldLayout: PropTypes.string,
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

    //TODO JS: make this work
    getFactory() {
        const { uiType, componentFactory } = this.props;

        // if (!uiType) {
        //     return componentFactory;
        // }
        //
        // return UIManager.getFactoryPerType(uiType);
        return componentFactory;
    }

    buildGroupComponent = () => {
        //Fields: this is not the fields passed from AutoForm. This is generated by ReduxForm. 
        //This object has a property for each field. Each property contains all redux props for the given field
        let { fields, fieldMetadata, layout, values } = this.props;

        values = values || {};

        let modelProcessed = ModelParser.process(values, fieldMetadata);
        let fieldMetadataEvaluated = MetadataEvaluator.evaluate(fieldMetadata, modelProcessed, '', fields);
        let componentFactory = this.getFactory();

        return componentFactory.buildGroupComponent({
            component: layout.component,
            layout: layout,
            fields: fieldMetadataEvaluated,
            componentFactory: componentFactory
        });
    };

    render() {
        let { buttonBar, submitting } = this.props;
        let groupComponent = this.buildGroupComponent();
        let componentFactory = this.getFactory();

        let Root = componentFactory.getRoot();

        return (
            <Root {...this.props}>
                { groupComponent }
                { React.createElement(buttonBar, { submitting: submitting }) }
            </Root>
        )
    }
}

export default reduxForm()(AutoFormInternal);