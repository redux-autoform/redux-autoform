<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->
**Table of Contents**  *generated with [DocToc](https://github.com/thlorenz/doctoc)*

- [Metadata](#metadata)
  - [Schema](#schema)
  - [Entity](#entity)
  - [Layout](#layout)
  - [Group](#group)
  - [Field](#field)
  - [Common](#common)
  - [TextBox](#textbox)
  - [TextArea](#textarea)
  - [CheckBox](#checkbox)
  - [Select](#select)
  - [Lookup](#lookup)
  - [DateTimePicker](#datetimepicker)
- [Lib](#lib)
  - [Component factories](#component-factories)
  - [ComponentFactory (source)](#componentfactory-source)
  - [DefaultEditComponentFactory (source)](#defaulteditcomponentfactory-source)
  - [DefaultDetailsComponentFactory (source)](#defaultdetailscomponentfactory-source)
  - [Localization](#localization)
- [Components](#components)
  - [AutoForm](#autoform)
- [Third party](#third-party)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

> Be patient. This documentation is still under construction. Pull-requests are welcome.

For an introduction to the library, as well as instructions on how to install, build and run it, please refer to the [README.md](https://github.com/gearz-lab/redux-autoform/blob/master/readme.md).

Metadata
===

Metadata is the single most important thing to understand in order to work with `redux-autoform`. Basically, you pass a
`schema` to the `AutoForm` component and it renders itself. You can find examples of valid schema [here](https://github.com/gearz-lab/redux-autoform/tree/master/demo/presets).

These are the most important things you should know about Metadata:

 - The application `schema` is composed of `entities` and `layouts`.
 - `Fields` are defined in `entities` and `layouts`.
 - Each `field` is going to become a component.
 - `Field`'s metadata is passed to the components as `props`.
 - `Field` metadata is merged from the `layout` to the `entity` before being passed to the components. It's possible to override `field` metadata in the `layout`. 
 - Each `Field` metadata can be either a literal or a function. When it's a function, it's evaluated automatically every time the
 form changes.

Schema
---

The root of all metadata. It may represent your entire application schema or just a subset of it. If you choose to pass only
a subset to the `AutoForm`, make sure it contains all the referenced `entities`.
 
Metadata | Description
--- | ---
entities | An array of `entity`.

Entity
---

Represents an `entity`. 

Metadata | Description
--- | ---
name | The `entity` name
fields | An array or `field`.
layouts | An array or `layout`.

Layout
---

Represents a visualization of an `entity`. Examples of layouts would be `edit` and `details`.  Every `entity` field that
 should be displayed in a `layout`  should be declared both in the `entity.fields` and in the `layout.fields` or `layout.someGroup.fields`.
  Fields are  merged based on the `name` metadata.
  
Metadata | Description
--- | ---
name | The `layout` name
orientation | How the fields to should be laid out. Valid values are "vertical" and "horizontal". It defaults to "vertical". When a layout/group is "vertical", the default size for the component is 12. When it's "horizontal", the default size is 12/[number of components]. 
fields | An array of `field`. These `fields` are merged with the fields from the `entity` this layout belongs to. Fields are
merged based on the `name` metadata.
groups | (optional) An array of `group`.

Group
---

Represents a group in the `layout`. Groups exist just so the `layouts` are flexible and customizable.

Metadata | Description
--- | ---
name | The name of the group. Only useful when you want to render a group inside a layout field.
orientation | How the fields to should be laid out. Valid values are "vertical" and "horizontal". It defaults to "vertical". When a layout/group is "vertical", the default size for the component is 12. When it's "horizontal", the default size is 12/[number of components].
fields | An array of `field`. These `fields` are merged with the fields from the `entity` this layout belongs to. Fields are
merged based on the `name` metadata.
groups | (optional) An array of `group`.

Field
---

Represents a `field`. `Fields` can exist in `entities`, `layouts` or `groups`. `Field` metadata are passed to the component as `props`.
 
 Each `field` metadata's value can be in one of the following formats:
 
 Format | Description
 --- | ---
 Literal | Example: 'Andre' or 2.
 Function | When a field metadata value is a function, it's evaluated and the value is passed to the target component as a `prop`.  Functions receive two parameters: `m`, which is the current model, and `h`, which is a collection of helper methods for dealing with number formats, for instance.  Example: function(m, h) { return m.name }
 
Fields can have any sorts of metadata, as long as the component registered in the `ComponentFactory` takes this metadata into account.

These are the metadata that are component agnostic: 

Metadata | Description
--- | ---
name | The `field` name. This is how a field is identified and merged.
type | The `field` type. This is the default way to determine which component should render this `field`.
 The list of possible values for `type` depends on which component is registered in the `ComponentFactory`. That is,
 `foo` is a valid value for `type`, as long as the `ComponentFactory` registered a component for `foo`.
 The list of valid types for the `DefaultEditComponentFactory` can be found [here](https://github.com/gearz-lab/redux-autoform/blob/master/src/defaultComponentFactoryHelper.js).
size | The size of the component, in grid units. Values can range from 1 to 12.
component | Which component to use. If no component is set, the default one will be used.

Other `field` metadata will depend on the component.
 
Common
---

Metadata that is common to most of the components.

Metadata | Description
--- | ---
displayName | The user-friendly name for the field.
component | Which component to use. 
readOnly | Whether or not the component should be in read-only state.
help | Additional help so the end-user knows what the field is about.

TextBox
---

Specific metadata for the `TextBox` component. Common metadata is not listed.

Metadata | Description
--- | ---
placeholder | The text that should be displayed as a hint when there's no value.
addonBefore | The text that should be added-on before the component.
addonAfter | The text that should be added-on after the component.

TextArea
---

Specific metadata for the `TextBox` component. Common metadata is not listed.

Metadata | Description
--- | ---
placeholder | The text that should be displayed as a hint when there's no value.
addonBefore | The text that should be added-on before the component.
addonAfter | The text that should be added-on after the component.
rows | The number of rows.

CheckBox
---

Specific metadata for the `CheckBox` component. Common metadata is not listed.

Select
---

Specific metadata for the `Select` component. Common metadata is not listed.

Metadata | Description
--- | ---
options | The options to display. Options are an array of objects with two properties: **value**: The actual value that is stored in the model. **text**: What is displayed to the user

Lookup
---

Specific metadata for the `Lookup` component. Common metadata is not listed.

Metadata | Description
--- | ---
options | The options to display. Options are an array of objects with two properties: **value**: The actual value that is stored in the model. **text**: What is displayed to the user

DateTimePicker
---

Specific metadata for the `DateTimePicker` component. Common metadata is not listed.

Metadata | Description
--- | ---
format | Any format supported by [Moment.js](http://momentjs.com/docs/#/parsing/string-format/). Defaults to your locale configuration. Make sure you have it properly configured.  

Lib
===

Component factories
---

Component factories are how `redux-autoform` knows which component to render for a particular field or group metadata.

ComponentFactory ([source](https://github.com/gearz-lab/redux-autoform/blob/master/src/ComponentFactory.js))
---

This a *clean* factory. In order to use it, `import` it, register all your components and then pass it to the `componentFactory`
prop of the `AutoForm`.

    import { ComponentFactory } from 'redux-autoform';

DefaultEditComponentFactory ([source](https://github.com/gearz-lab/redux-autoform/blob/master/src/DefaultEditComponentFactory.js))
----

This is a pre-populated factory for editing, the same used in the [demo](http://gearz-lab.github.io/redux-autoform/demo.html).
In order to use it, `import` it and just pass it to the `componentFactory` prop of the `AutoForm`.

    import { DefaultEditComponentFactory } from 'redux-autoform';
    
The `DefaultEditComponentFactory` relies on [these third-party components](#third-party).

DefaultDetailsComponentFactory ([source](https://github.com/gearz-lab/redux-autoform/blob/master/src/DefaultEditComponentFactory.js))
----

This is a pre-populated factory for details. In order to use it, `import` it and just pass it to the `componentFactory` prop of the `AutoForm`.

    import { DefaultDetailsComponentFactory } from 'redux-autoform';
    
> This feature is still under development.

Localization
---

AutoForm doesn't directly depend on localization, but the default component factories do. So, if you're using the default component factories, this is what you should do:

 - Install [numbro](http://numbrojs.com/). This is the library used for number localization.
 - Install [moment](http://momentjs.com/). This is the library used for datetime localization.
 - Then...
 
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

    
Components
===

AutoForm
---

A form component that renders itself based on metadata

Prop | Description
--- | ---
componentFactory | The `ComponentFactory` that should be used
schema | The application schema. See [Metadata](https://github.com/gearz-lab/redux-autoform/blob/master/docs-md/Documentation.md#metadata)
entityName | The name of the `entity` in the `schema`
layoutName | The name of the `layout` in the `entity`
bottomBar | A component for rendering the bottom bar. This component should include a submit input.
errorRenderer | Function that should render an error component in case something goes wrong. The function should receive an `exception` and return a component.
onSubmit | Function called when the form is successfully submitted. 

Third party
===

The `DefaultComponentFactory` relies on third-party components. Here's the list:

 - [redux-form](https://github.com/erikras/redux-form/).
 - [react-bootstrap](http://react-bootstrap.github.io/).
 - [react-select](https://github.com/JedWatson/react-select).
 - [react-widgets](https://github.com/jquense/react-widgets).