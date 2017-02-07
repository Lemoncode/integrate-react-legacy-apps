#01.5 Moving to JSX

Most of React projects are written using ECMAScript2015 syntax and JSX and transpiled using Webpack, Rollup, Browserify or some other bundler. In this sample we'll be configuring our project to use a task manager to automatize our transpilation process.

## Why JSX?

Using JSX syntax is not mandatory, however it has some advantages like better readabilty instead of using `React.createElement` method. For instance, we've grouped in our `TableComponent` the creation of each table subcomponent in little reusable functions (`createCell`, `createRow`, `createHead`, `createBody`) but some of these functions are not reused, we use `createCell` and `createRow` a lot when we need to render new `<tr>`, `createCell` method can also be removed though. Let's see how should look our `TableComponent` excluding not reusable methods:

```javascript
(function initializeTableComponent(React, App) {
  'use strict';

  var createRow = function (contact, index) {
    return React.createElement("tr", { key: index },
      React.createElement("td", null, contact.name),
      React.createElement("td", null, contact.phone),
      React.createElement("td", null, contact.email)
    );
  };

  var TableComponent = function (props) {
    var contacts = props.contacts || [];
    return React.createElement(
      "table",
      { className: "table table-stripped table-bordered table-hover" },
      React.createElement("thead", null,
        React.createElement("tr", null,
          React.createElement("th", null, "Name"),
          React.createElement("th", null, "Phone number"),
          React.createElement("th", null, "Email")
        )
      ),
      React.createElement("tbody", null, contacts.map(createRow))
    );
  };

  TableComponent.propTypes = {
    contacts: React.PropTypes.array
  };

  App.components.TableComponent = TableComponent;
})(React, window.App);
```

When we build larger components with more properties...
