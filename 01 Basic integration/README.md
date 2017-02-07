# 01 Basic interaction

In this sample we will introduce our first React component. This component will hold the contacts array in its state and use it to render the table.

## Let's get started

First of all we'll add `react` and `react-dom` into our app libraries. We manage this with `npm` so we just need to do `npm install` and get this packages.

```shell
npm install --save react react-dom
```

Next we'll link this dependencies into our `index.html`:

```html
...
</div>

  <script src="./node_modules/jquery/dist/jquery.js"></script>
  <script src="./node_modules/react/dist/react.js"></script>
  <script src="./node_modules/react-dom/dist/react-dom.js"></script>

  <script src="./assets/js/app/App.js"></script>
...
```

We'll also remove the `table` element and replace it with a div with id *tableComponent* that will contain our React component.

Then we'll remove`domUtils.js` helper as we only needed it to render the table. We will replace this with our React table component:

```html
...
<main class="main">
  <h4>My contacts</h4>
  <div id="tableComponent"></div>
</main>
...
```

After that we will create a namespace called `components` inside our `App.js` to hold our React components:

```javascript
(function initializeApp(window) {
  'use strict';

  var App = {};
  App.components = {};

  window.App = App;
})(window);
```

Let's write our React `TableComponent`, first we'll create a `components` folder and a `TableComponent.js` file inside it. Our folders tree should look like this:

```
.
├── assets
│   ├── css
│   │   └── styles.css
│   └── js
│       ├── app
│       │   ├── App.js
│       │   ├── components
│       │   │   └── TableComponent.js
│       │   ├── modules
│       │   │   └── contactsModule.js
│       │   └── services
│       │       └── contactsService.js
│       └── index.js
└── index.html
```

## Defining our table component

Let's write our React `TableComponent`. This will need two dependencies, React to be created and App to be exposed so we'll define our component and wrap it in an _IIFE _(Immediately Invoked Function Expression) and pass this dependencies:

```javascript
// TableComponent.js
(function initializeTableComponent(React, App) {
  'use strict';

  var TableComponent = React.createClass({
    getInitialState: function () {
      return {
        contacts: []
      };
    },
    render: function () { }
  });

  App.components.TableComponent = TableComponent;
})(React, window.App);
```

To create the table we're going to add some private methods:

- Let's create a `createCell` method with two parameters, **type** that will be a table cell `<td>` or `<th>`, and **text** that will show the content of the cell. This method will return a `ReactElement`:

  ```javascript
  ...
  var createCell = function (type, text) {
    return React.createElement(type, null, text);
  };

  var TableComponent = React.createClass({
  ...
  ```

- Then add a `createRow` method that will return the `<tr>` row calling `createCell` method:

  ```javascript
  ...
  var createRow = function (cell, index, contact) {
    return React.createElement('tr', { key: index },
      createCell(cell, contact.name),
      createCell(cell, contact.phone),
      createCell(cell, contact.email)
    );
  };

  var TableComponent = React.createClass({
  ...
  ```

- Let's create the `createHead` method that returns a `<thead>` React element. This will call `createRow` method passing it the template with `null` props as it's there will be only one `<tr>`:

  ```javascript
  ...
  var createThead = function () {
    var contactTemplate = {
      name: 'Name',
      phone: 'Phone number',
      email: 'Email'
    };
    return React.createElement('thead', null, createRow('th', null, contactTemplate));
  };

  var TableComponent = React.createClass({
  ...
  ```

- Time to create the `<tbody>`,  let's write a `createTbody` method that will returns the `<tbody>` This method will need an array of contacts:

  ```javascript
  ...
  var createBody = function (contacts) {
    var rows = contacts.map(function (contact, index) {
      return createRow('td', index, contact);
    });
    return React.createElement('tbody', null, rows);
  };

  var TableComponent = React.createClass({
  ...
  ```

- We'll finish the table creation writting the `render` method that will create a `<table>` with `<thead>` and `<tbody`:

  ```javascript
  ...
  },
  render: function () {
    return React.createElement('table',
      { className: 'table table-stripped table-bordered table-hover' },
      createHead(),
      createBody(this.state.contacts)
    );
  }
  ...
  ```

- Finally let's include our `TableComponent` in our `index.html`:

  ```html
  ...
      <script src="./assets/js/app/App.js"></script>
      <script src="./assets/js/app/components/TableComponent.js"></script>
      <script src="./assets/js/app/services/contactsService.js"></script>
      <script src="./assets/js/app/modules/contactsModule.js"></script>
      <script src="./assets/js/index.js"></script>
    </body>
  </html>
  ```

## Setting up communication

Let's jump into our `contactsModule.js` and make some changes:

- First we'll  incude our `TableComponent` and import React and ReactDOM as dependencies. Then we'll remove the reference to `domUtils` and add the `TableComponent`:

  ```javascript
  (function initializeContactsModule($, React, ReactDOM, App) {
    'use strict';

    var TableComponent = App.components.TableComponent;
    var contactsService = App.contactsService;

  ...
  })(jQuery, React, ReactDOM, window.App);
  ```
- Then remove the `showContacts` method and replace its call by `ReactDOM.render` to mount our `TableComponent` component:

  ```javascript
  var fetchContacts = function () {
    $.when(contactsService.fetchContacts())
      .then(function (fetchedContacts) {

        // Pass contacts to TableComponent
        ReactDOM.render(
          React.createElement(TableComponent, { contacts: fetchedContacts }),
          $('#tableComponent').get(0)
        );
      });
  };

  var run = function () {
  ```

After all this changes, we should get our `TableComponent` integrated in our jQuery app.


## How it works?

1. When page loads `contactsModule.run` method is called requesting contacts data from `contactsService`, setting the form `onSubmit` handler and initially mounting `TableComponent` which creates its own state with an empty array of contacts.

2. When `fetchContacts` is completed `TableComponent` is mounted with the new contacts. This results in rendering the table with contacts.
