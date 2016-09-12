![Logo](https://github.com/redux-autoform/redux-autoform/blob/master/art/autoform-logo.png?raw=true)

[![Build Status](https://travis-ci.org/redux-autoform/redux-autoform.svg?branch=master)](https://travis-ci.org/redux-autoform/redux-autoform) [![npm version](https://badge.fury.io/js/redux-autoform.svg)](https://badge.fury.io/js/redux-autoform) [![codecov](https://codecov.io/gh/redux-autoform/redux-autoform/branch/master/graph/badge.svg)](https://codecov.io/gh/redux-autoform/redux-autoform) [![Coverage Status](https://coveralls.io/repos/github/redux-autoform/redux-autoform/badge.svg?branch=master)](https://coveralls.io/github/redux-autoform/redux-autoform?branch=master)

[![NPM](https://nodei.co/npm/redux-autoform.png?downloads=true&downloadRank=true&stars=true)](https://nodei.co/npm/redux-autoform/) [![NPM](https://nodei.co/npm-dl/redux-autoform.png?months=9&height=3)](https://nodei.co/npm/redux-autoform/)

**Beta version disclaimer**

`redux-autoform` is under active development. APIs will change and things may still not work as expected. If you find
  any issue, please [report it](https://github.com/gearz-lab/redux-autoform/issues). We'll do my best to fix it.
  
<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->


- [Introduction](#introduction)
- [Supported UI frameworks](#supported-ui-frameworks)
- [Demos](#demos)
- [Docs](#docs)
- [Installing](#installing)
- [Using](#using)
- [Localization](#localization)
- [Styles](#styles)
- [Building and running the demo locally](#building-and-running-the-demo-locally)
- [Running the tests](#running-the-tests)
- [Contributing](#contributing)
- [License](#license)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

Introduction
------------

Redux-Autoform is an UI agnostic library for dynamically generating [redux-form](https://github.com/erikras/redux-form) out of metadata.

Supported UI frameworks
------------------------

- [Bootstrap](https://github.com/redux-autoform/redux-autoform-bootstrap-ui) (beta state)
- [Material-UI](https://github.com/redux-autoform/redux-autoform-material-ui) (alpha state)

Demos
-----

- [Bootstrap demo](https://redux-autoform.github.io/redux-autoform-bootstrap-ui/demo.html).
- [Material-UI demo] (https://redux-autoform.github.io/redux-autoform-bootstrap-ui/).


Docs
---

[Docs are available here](https://github.com/gearz-lab/redux-autoform/blob/master/docs-md/documentation.md).

Installing
---

    npm install redux-autoform

Using
---

####AutoForm ([source](https://github.com/gearz-lab/redux-autoform/blob/master/src/AutoForm.js))####

The main React component.

```js
import { AutoForm } from 'redux-autoform';
```
    
The `AutoForm` props are listed [here](https://github.com/redux-autoform/redux-autoform/blob/master/docs-md/documentation.md#autoform).

The 2 most important props `AutoForm` should receive is the `schema` and the `componentFactory`.

The schema represents the application domain. All entities, layouts and their metadata is contained in the schema. More information [here](https://github.com/redux-autoform/redux-autoform/blob/master/docs-md/documentation.md#schema).

The `ComponentFactory` is responsible for determining which React component to use for a given field metadata. `redux-autoform` doesn't have any built-in factory, for that you can use either
[Bootstrap](https://github.com/redux-autoform/redux-autoform-bootstrap-ui) (beta state) or [Material-UI](https://github.com/redux-autoform/redux-autoform-material-ui) (under development).

Assuming Bootstrap, you can get the factories like this:
 
```js
import { EditComponentFactory, DetailsComponentFactory } from 'redux-autoform-bootstrap-ui';
```

Either one of these factories now should be passed as prop Autoform as described in the [docs](https://github.com/gearz-lab/redux-autoform/blob/master/docs-md/documentation.md).
    
Localization
---

AutoForm doesn't directly depend on localization, but both the Bootstrap and Material-UI factories do. So, if you're using these, this is what you should do:

- Install [numbro](http://numbrojs.com/). This is the library used for number localization.
- Install [moment](http://momentjs.com/). This is the library used for datetime localization.
 
```js
// import moment and numbro
import moment from 'moment';
import numbro from 'numbro';
 // import the localizers
 import { momentLocalizer, numbroLocalizer } from 'redux-autoform';
// if you are using react-widgets, which is used by default on the standard factories, you need to import it's localizer too:
import reactWidgetsMomentLocalizer from 'react-widgets/lib/localizers/moment';
// set up the localizers
momentLocalizer(moment);
numbroLocalizer(numbro);

reactWidgetsMomentLocalizer(moment); // THIS IS ONLY IMPORTANT WHEN USING BOOTSTRAP
```

Styles
------

The styling will depend on the UI you're using:

- [Adding styles for the Bootstrap UI](https://github.com/redux-autoform/redux-autoform-bootstrap-ui#styling)
- Adding styles for the Material UI (under development)

Building and running the demo locally
-------------------------------------

Redux-Autoform provides a really minimalist demo. In order to run the demo, run:

    npm run start
    
Now the demo should be available here: [http://localhost:4000/](http://localhost:4000/).
    
Running the tests
------------------

    npm run test // will run the Karma tests PhantomJS
    // OR
    npm run test-chrome // will run the Karma tests on Chrome

Contributing
---

**Pull-requests are really really welcome**. If you don't know what to contribute with, please check the [issues](https://github.com/gearz-lab/redux-autoform/issues).
 
We'll be more than glad to invite frequent contributors to join the organization.
If you need help understanding the project, please post an issue and I'll do my best to reply and make sure you understand everything
you need.

In order to make a pull request:

 1. Fork it.
 2. Create your feature-branch git checkout -b your-new-feature-branch
 3. Commit your change git commit -am 'Add new feature'
 4. Push to the branch git push origin your-new-feature-branch
 5. Create new Pull Request with master branch

License
---
`redux-autoform` is [MIT](https://github.com/gearz-lab/redux-autoform/blob/master/LICENSE) licensed.

