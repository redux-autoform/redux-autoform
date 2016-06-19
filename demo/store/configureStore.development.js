import {createStore, applyMiddleware, compose} from 'redux';
import {persistState} from 'redux-devtools';
import thunk from 'redux-thunk';
import {hashHistory} from 'react-router';
import {routerMiddleware} from 'react-router-redux';
import rootReducer from '../reducers';
import DevTools from '../components/DevTools';
import observe from '../lib/reduxStoreObserver';
import { updateForm } from '../actions/formOptions';
import presets from '../presets';
import _ from 'underscore';

const router = routerMiddleware(hashHistory);

const enhancer = compose(
    applyMiddleware(thunk, router),
    DevTools.instrument(),
    persistState(
        window.location.href.match(
            /[?&]debug_session=([^&]+)\b/
        )
    )
);

export default function configureStore(initialState) {
    const store = createStore(rootReducer, initialState, enhancer);

    observe(store,
        state => state.routing.locationBeforeTransitions.query.preset,
        (store, previousValue, currentValue) => {
            let presetName = currentValue || 'default';
            let preset = _.find(presets, p => p.name == presetName);
            store.dispatch(updateForm(preset.schema));
        }
    );

    if (module.hot) {
        module.hot.accept('../reducers', () =>
            store.replaceReducer(require('../reducers'))
        );
    }

    return store;
}
