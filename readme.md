redux-autoform
===

`Redux-autoform` is a wrapper around [redux-form](https://github.com/erikras/redux-form) for dynamically generating forms based on metadata.

**Beta version disclaimer**

`redux-autoform` is under active development. APIs will change and things may still not work as expected. If you find
  any issue, please [report it](https://github.com/gearz-lab/redux-autoform/issues). I'll do my best to fix it.
  
<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->


- [Demo](#demo)
- [Docs](#docs)
- [Installing](#installing)
- [Using](#using)
- [Localization](#localization)
- [Building and running the demo locally](#building-and-running-the-demo-locally)
- [Change log](#change-log)
- [Contributing](#contributing)
- [License](#license)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

Demo
---

You can check the [online demo here](http://gearz-lab.github.io/redux-autoform/demo.html). Don't forget to check out all the **presets**.


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
    
The `AutoForm` props are listed [here](https://github.com/gearz-lab/redux-autoform/blob/master/docs-md/documentation.md).
    
Additionally, you need a `ComponentFactory`. The `ComponentFactory` is responsible for determining which React
component to use for a given field metadata. `redux-autoform` comes with 3 `ComponentFactory`:

####ComponentFactory ([source](https://github.com/gearz-lab/redux-autoform/blob/master/src/ComponentFactory.js))####

This a *clean* factory. In order to use it, `import` it, register all your components and then pass it to the `componentFactory`
prop of the `AutoForm`.

```js
import { ComponentFactory } from 'redux-autoform';
```js

####DefaultEditComponentFactory ([source](https://github.com/gearz-lab/redux-autoform/blob/master/src/DefaultEditComponentFactory.js))####

This is a pre-populated factory, the same used in the [demo](http://gearz-lab.github.io/redux-autoform/demo.html).
In order to use it, `import` it and just pass it to the `componentFactory` prop of the `AutoForm`.

```js
import { DefaultEditComponentFactory } from 'redux-autoform';
```js
    
Localization
---

AutoForm doesn't directly depend on localization, but the default component factories do. So, if you're using the default component factories, this is what you should do:

- Install [numbro](http://numbrojs.com/). This is the library used for number localization.
- Install [moment](http://momentjs.com/). This is the library used for datetime localization.
 
```js
// import moment and numbro
import moment from 'moment';
import numbro from 'numbro';
 // import the localizers
 import { momentLocalizer, numbroLocalizer } from '../../src/lib/localization/momentDateLocalizer';
// if you are using react-widgets, which is used by default on the standard factories, you need to import it's localizer too:
import reactWidgetsMomentLocalizer from 'react-widgets/lib/localizers/moment';
// set up the localizers
momentLocalizer(moment);
numbroLocalizer(numbro);
reactWidgetsMomentLocalizer(moment);
```

    
The `DefaultEditComponentFactory` relies on components that rely on localization. 

Building and running the demo locally
---

    git clone https://github.com/gearz-lab/redux-autoform.git
    cd redux-autoform
    set NODE_ENV=development
    // OR, if you use Linux or OSX
    $export NODE_ENV=development
    npm install
    
In order to run the demo, run:

    npm run start
    
Now the demo should be available here: [http://localhost:4000/demo.html](http://localhost:4000/redux-autoform/demo.html).
    
In order to run the `karma` tests:

    npm run test
    // OR, to run in Chrome instead of PhantomJS
    npm run test-chrome
     
Change log
---

What has changed is stated [here](https://github.com/gearz-lab/redux-autoform/blob/master/docs-md/changeLog.md).
   
Contributing
---

**Pull-requests are really really welcome**. If you don't know what to contribute with, please check the [issues](https://github.com/gearz-lab/redux-autoform/issues).
 
I'll be more than glad to invite frequent contributors to join the organization.
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

