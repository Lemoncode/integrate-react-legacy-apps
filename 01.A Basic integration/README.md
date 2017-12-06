# 01 Basic interaction

In this sample we will introduce our first React component. This component will hold the contacts array in its state and use it to render the table.

## Let's get started

First of all we'll add `react`, `react-dom` and `prop-types` into our app libraries. We manage this with `npm` so we just need to do `npm install` and get this packages.

```shell
npm install --save react react-dom prop-types
```

Next we'll link these dependencies into our `index.html`:

```html
...
</div>

  <script src="./node_modules/jquery/dist/jquery.js"></script>
  <script src="./node_modules/react/umd/react.development.js"></script>
  <script src="./node_modules/react-dom/umd/react-dom.development.js"></script>
  <script src="./node_modules/prop-types/prop-types.js"></script>

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

After that we will create a namespace called `components` inside our `App.js` to hold our React components, and `PropTypes`, that will hold our properties validation for our components:

```javascript
(function initializeApp(window) {
  'use strict';

  var App = {};
  App.components = {};
  App.PropTypes = {};

  window.App = App;
})(window);
```

Let's write our React `TableComponent`, first we'll create a `components` folder inside `app` folder. Then create inside it three files: `ContactsTableComponent.js` that will be our table, `ConctactRowComponent.js`, that will be a reusable row, and `ContactPropTypes.js` that will be the contact typechecking definition for our table components. Our folders tree should look like this:

```
.
├── assets
│   ├── css
│   │   └── styles.css
│   └── js
│       ├── app
│       │   ├── App.js
│       │   ├── components
│       │   │   ├── ContactPropTypes.js
│       │   │   ├── ContactRowComponent.js
│       │   │   └── ContactsTableComponent.js
│       │   ├── modules
│       │   │   └── contactsModule.js
│       │   └── services
│       │       └── contactsService.js
│       └── index.js
└── index.html
```

## Defining our components

Let's define the validation for contact. This will need two main dependencies, `React` to use its typecheckers, and `App` to export the component so we'll define our component and wrap it in an _IIFE _(Immediately Invoked Function Expression), pass this dependencies and export the definition in `App.PropTypes` subnamespace. Our contact model will have three required attributes, a name as `string`, phone as `number` and `email` as string:

```javascript
(function initializeContactPropTypes(React, App) {
  'use strict';

  var ContactPropTypes = PropTypes.shape({
    name: PropTypes.string.isRequired,
    phone: PropTypes.number.isRequired,
    email: PropTypes.string.isRequired
  });

  App.PropTypes.ContactPropTypes = ContactPropTypes;
})(window.React, window.App);
```

Next let's write the `ContactRowComponent`. We'll wrap it inside an _IIFE_ with React and App as dependencies and create a stateless component using a function that receives a contact inside `props` parameter and returns a row with the contact information:

```javascript
(function initializeContactRowComponent(React, App) {
  'use strict';

  var ContactPropTypes = App.PropTypes.ContactPropTypes;

  var ContactRowComponent = function (props) {
    var contact = props.contact || {};
    return React.createElement('tr', null,
      React.createElement('td', null, contact.name),
      React.createElement('td', null, contact.phone),
      React.createElement('td', null, contact.email)
    )
  };

  ContactRowComponent.displayName = 'ContactRowComponent';
  ContactRowComponent.propTypes = {
    contact: ContactPropTypes
  };

  App.components.ContactRowComponent = ContactRowComponent;
})(window.React, window.App);
```

Then we'll create the `ContactsTableComponent`. It will need a contacts array from props to render the table:

```javascript
(function initializeContactsTableComponent(React, App) {
  'use strict';

  var ContactRowComponent = App.components.ContactRowComponent;
  var ContactPropTypes = App.PropTypes.ContactPropTypes;

  var ContactsTableComponent = function (props) {
    var contacts = props.contacts || [];
    return React.createElement(
      'table',
      { className: 'table table-stripped table-bordered table-hover' },
      React.createElement('thead', null,
        React.createElement('tr', null,
          React.createElement('th', null, 'Name'),
          React.createElement('th', null, 'Phone number'),
          React.createElement('th', null, 'Email')
        )
      ),
      React.createElement('tbody', null,
        contacts.map(function (contact, index) {
          return React.createElement(ContactRowComponent, {
            contact: contact,
            key: index
          });
        })
      )
    );
  }

  ContactsTableComponent.displayName = 'ContactsTableComponent';
  ContactsTableComponent.propTypes = {
    contacts: PropTypes.arrayOf(ContactPropTypes)
  };

  App.components.ContactsTableComponent = ContactsTableComponent;
})(React, window.App);
```

> As you can see, writing React components using ECMAScript 5 is a little bit verbose and confusing at indentation level because of `React.createElement`. In the next sample we will see how to integrate JSX in our project to enhace the readability of our component and speed the creation process:

Finally let's include our contacts table files in our `index.html`:

  ```html
      ...
      <script src="./assets/js/app/App.js"></script>
      <script src="./assets/js/app/components/ContactPropTypes.js"></script>
      <script src="./assets/js/app/components/ContactRowComponent.js"></script>
      <script src="./assets/js/app/components/ContactsTableComponent.js"></script>
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

    var ContactsTableComponent = App.components.ContactsTableComponent;
    var contactsService = App.contactsService;

    ...

  })(window.jQuery, window.React, window.ReactDOM, window.App);
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

1. When page loads `contactsModule.run` method is called requesting contacts data from `contactsService`.

2. When `fetchContacts` is completed `TableComponent` is mounted receiving fetched contacts transforms from `props` and transforming them into a table with rows containing each contact information.
