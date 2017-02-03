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
(function (window) {
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
│       │   │   └── Contacts.js
│       │   └── services
│       │       └── contactsService.js
│       └── index.js
└── index.html
```

## Defining our table component

Let's write our React `TableComponent`. This will need two dependencies, React to be created and App to be exposed so we'll define our component and wrap it in an _IIFE _(Immediately Invoked Function Expression) and pass this dependencies. Then we'll declare our `TableComponent` inside with three main methods:

- `getInitialState`: This will initialize contacts array.
- `setContacts`:  This method will bridge jQuery and our component.
- `render`:  The main method to render the table

```javascript
// TableComponent.js
(function(React, App) {
  'use strict';

  var TableComponent = React.createClass({
    getInitialState: function () {
      return {
        contacts: []
      };
    },
    setContacts: function (contacts) {
      this.setState({
        contacts: contacts
      });
    },
    render: function () { }
  });

  App.components.TableComponent = TableComponent;
})(React, window.App);
```

To create the table we'll create some private methods to render the table:

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
- Let's create the `createThead` method that returns a `<thead>` React element. This will call `createRow` method passing it the template and `null` props as it's there will be only one `<tr>`:

  ```javscript
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

- Time to create the `<tbody>`, let's create a method called `createTbody` that will create a row with contacts data. This method will need to iterate overa **contact** object to create each cell with contact information, and a **index** as there can be multiple contacts table and React needs to track each child with a `key` prop:

  ```javascript
  var createTbodyRow = function (contact, index) {
    return React.createElement('tr', { key: index },
      createCell('td', contact.name),
      createCell('td', contact.phone),
      createCell('td', contact.email)
    );
  };

  var TableComponent = React.createClass({
  ...
  ```

- Time to create the `<tbody>`,  let's write a `createTbody` method that will returns the `<tbody>` This method will need an array of contacts:

  ```javascript
  ...
  var createTbody = function (contacts) {
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
    var thead = createThead();
    var tbody = createTbody(this.state.contacts);
    return React.createElement('table', {
      className: 'table table-stripped table-bordered table-hover'
    }, thead, tbody);
  }
  ...
  ```

- Finally let's include our `TableComponent` in our `index.html`:

  ```html
  ...
      <script src="./assets/js/app/App.js"></script>
      <script src="./assets/js/app/components/TableComponent.js"></script>
      <script src="./assets/js/app/services/contactsService.js"></script>
      <script src="./assets/js/app/modules/Contacts.js"></script>
      <script src="./assets/js/index.js"></script>
    </body>
  </html>
  ```

## Setting up communication

Let's jump into our `Contacts.js` module and make some changes:

- First we'll  incude our `TableComponent` and import React and ReactDOM as dependencies. Then we'll remove the reference to `domUtils` and add the `TableComponent`:

  ```javascript
  (function($, React, ReactDOM, App) {
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