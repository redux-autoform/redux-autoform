export default class PropStore {
    constructor() {
        this.props = {}; 
    }
    
    saveProps(props) {
        console.info("Saving props");
        this.props = props;
    }
    
    getProps() {
        console.info("Getting props");
        return this.props;
    }
}