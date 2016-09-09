import React, {Component, PropTypes} from 'react';
import BaseGroup from './BaseGroup';
import { Row } from 'react-bootstrap';

class Group extends BaseGroup {
    static propTypes = {
        component: PropTypes.string,
        fields: PropTypes.array.isRequired,
        layout: PropTypes.object.isRequired,
        componentFactory: PropTypes.object.isRequired
    };

    getHeader = () => {
        let {layout} = this.props;

        return layout.title
            ? (
            <header className="metaform-group-header">
                <span className="metaform-group-title">
                    {layout.title}
                </span>
            </header>
        ) : null;
    };

    render() {
        let {layout} = this.props;
        let content = this.getContent();
        let header = (!layout.headLess)? this.getHeader() : null;
        const style = (layout.headLess)? { marginTop: "15px" } : null;

        return (
            <section style={style}>
                <Row>
                    <div className="metaform-group">
                        { header }
                        <div className="metaform-group-content">
                            { content }
                        </div>
                    </div>
                </Row>
            </section>
        );

    }
}

export default Group;