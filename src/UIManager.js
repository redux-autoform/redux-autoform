//TODO Jonatan.Salas: This needs to be tested. 
class UIManager {
    instance = new UIManager();    
    factoryTypes = {};
    
    allowedUIs = [
        'bootstrap',
        'material'
    ];
    
    constructor() {
        const { factoryTypes } = this;

        this.allowedUIs.forEach((value) => {
            factoryTypes[value] = require(`redux-autoform-${value}-ui`);
        });
    }

    getFactory(type) {
        return this.factoryTypes[type];
    }
    
    static getFactoryPerType(type) {
        return this.instance.getFactory(type);    
    }
}