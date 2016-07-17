let currentValue;

/**
 * Observes changes in the Redux store and calls onChange when the state changes
 * @param store The Redux store
 * @param selector A function that should return what you are observing. Example: (state) => state.routing.locationBeforeTransitions;
 * @param onChange A function called when the observable state changed. Params are store, previousValue and currentValue
 */
export default function observe(store, selector, onChange) {
    if (!store) throw Error('\'store\' should be truthy');
    if (!selector) throw Error('\'selector\' should be truthy');
    
    store.subscribe(() => {
        let previousValue = currentValue;
       
        try {
            currentValue = selector(store.getState());
        } catch(ex) {
            // the selector could not get the value. Maybe because of a null reference. Let's assume undefined
            currentValue = undefined;
        }
        
        if (previousValue !== currentValue) {
            onChange(store, previousValue, currentValue);
        }
    });
}