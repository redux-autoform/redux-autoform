import React from 'react';
import App from './containers/App';
import Demo from './pages/Demo.js';

import {Route, IndexRoute} from 'react-router';

export default (
    <Route path='/' component={App}>
        <Route path="/redux-autoform/demo.html" component={Demo}/>
    </Route>
);
