import React from 'react';
import {render} from 'react-dom';
import configureStore from './store/configureStore';
import {Provider} from 'react-redux';

const store = configureStore();


render(
    <Provider store={store}>
        <div>Redux should be working</div>
    </Provider>,
    document.getElementById('#app_container')
);