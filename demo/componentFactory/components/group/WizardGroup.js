import React, { Component, PropTypes } from 'react';
import BaseGroup from './BaseGroup';
import { Button, Row, Col, ButtonToolbar } from 'react-bootstrap';

const mergeJson = (arr) => arr.reduce((prev, actual) => ({...prev, ...actual}));

class WizardGroup extends BaseGroup {
    static propTypes = {
        component: PropTypes.string,
        fields: PropTypes.array.isRequired,
        layout: PropTypes.object.isRequired,
        componentFactory: PropTypes.object.isRequired
    };

    // Expose functions to the user in order to make the transitions, and the field values of the form
    wizardContext = {
        fields: {},
        goToStep: (stepName) => {
            let steps = this.getSteps();
            let foundStep = steps.find((step) => step.name === stepName);

            if(foundStep) {
                this.trackStepFlow(foundStep.position);
                this.setState({position: foundStep.position})
            }
            else
                console.error(`Step ${stepName} does not exists`);

        },
        goToPosition: (position) => {
            let { totalSteps } = this.state;

            if(position >= 0 && position <= totalSteps) {
                this.trackStepFlow(position);
                this.setState({position});
            }
            else
                console.error(`Position ${position} does not exists`);
        },
        next: () => {
            this.nextStep();
        }
    };

    state = {
        position: 0,
        totalSteps: this.props.layout.groups.length - 1,
        stepFlow: []
    };

    // Saves an object containing the step position that started the flow and the position after that flow
    trackStepFlow = (position) => {
        let { stepFlow } = this.state;

        stepFlow.push({
            originalPosition: this.state.position,
            position
        });

        this.setState({stepFlow});

        console.log(JSON.stringify(stepFlow));
    };

    // Get the last flow and set the step position to the step that initiated the flow to the current step position.
    backToFlow = () => {
        let { stepFlow } = this.state;
        let flowOnBack = stepFlow.pop();

        this.setState({
            stepFlow,
            position: flowOnBack.originalPosition
        })
    };

    // Checks if the current step is the last step in stepFlow, if that's the case it returns true.
    isFlowInMyPosition = () => {
        let { stepFlow, position } = this.state;
        let { length } = stepFlow;

        if(length > 0)
            return stepFlow[length - 1].position == position;

        return false;

    };

    nextStep = () => {
        let { position } = this.state;

        this.setState({position : position + 1})
    };

    backStep = () => {
        let { position } = this.state;

        this.setState({position : position - 1})
    };



    updateWizardContext = () => {
        let { fields } = this.props;

        // Reads each fields value of autoform and creates an object fieldName => fieldValue.
        this.wizardContext.fields = mergeJson(fields.map(field => ({[field.name]: field.reduxFormProps.value})));

    };

    getButtonSection = (steps) => {
        let { position, totalSteps } = this.state;
        let { submitting } = this.props;

        let { transition } = steps[position];

        let nextButton = null;
        let backButton = null;
        let submitButton = null;

        if (position != 0) {
            backButton = (
                <Button bsStyle="primary" bsSize="large" onClick={this.isFlowInMyPosition()? this.backToFlow : this.backStep}>
                    Back
                </Button>
            );
        }

        if (position != totalSteps) {
            nextButton = (
                <Button bsStyle="primary" bsSize="large" onClick={transition? () => transition(this.wizardContext) : this.nextStep}>
                    Next
                </Button>
            );
        }

        if (position == totalSteps) {
            submitButton = (
                <Button className="pull-right" bsStyle="success" bsSize="large" type="submit"  disabled={submitting || false}>
                    Submit
                </Button>
            )
        }

        return (
            <Row>
                <Col xs={6} md={4}/>
                <Col xs={6} md={4}/>
                <Col xs={6} md={4}>
                    <ButtonToolbar className="button-toolbar pull-right">
                        {backButton}
                        {nextButton}
                        {submitButton}
                    </ButtonToolbar>
                </Col>
            </Row>
        )
    };

    getSteps = () => {
        let { layout } = this.props;
        let content = this.getContent();

        // Maps each content to his transition function
        // Each step has associated a name and a position.
        return layout.groups.map((group, index) => ({
            content: content[index],
            transition: group.transition,
            name: group.name,
            position: index
        }));
    };

    render() {
        let { position } = this.state;
        let steps = this.getSteps();
        let buttonSection = this.getButtonSection(steps);

        this.updateWizardContext();

        return (
            <section>
                <Row>
                    <div className="metaform-group">
                        {steps[position].content}
                    </div>
                </Row>
                {buttonSection}
            </section>
        );
    }
}


export default WizardGroup;