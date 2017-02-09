# 03 Stateful Component

In this sample we're going to change the implementation of _02 Props and Render_ to introduce a wrapper component that can store contacts in its own state.

Why wrap our `ContactsTableComponent` with other component instead of change it to a stateful component?

The purpose of the new wrapper component is to be used as a bridge between your pure components and the application state. Little by little your application logic will be handled by React components with pieces of all of your application state. The purpose of the `ContactsTableComponent` is simply render a simple table given an array of contacts. If you need to manipulate the contacts or do more tasks (e.g. filtering contacts, pagination, etc) then it's better to use a container component to handle the logic and pass to the presentational component the data to be rendered.



## Using a container component

We'll create a container component that will be used by our `contactsModule`. This component will use `ContactsTableComponent` to render the contacts. Let's call it `ContactsTableContainer`, it will be located under `components` folder.

```jsx
(function initializeContactsTableContainer(React, App) {
  'use strict';

  var ContactPropTypes = App.PropTypes.ContactPropTypes;
  var ContactsTableComponent = App.components.ContactsTableComponent;

  var ContactsTableContainer = React.createClass({
    displayName: 'ContactsTableContainer',
    getInitialState: function () {
      return {
        contacts: []
      };
    },
    render: function () {
      return <ContactsTableComponent contacts={this.state.contacts} />;
    }
  });

  App.components.ContactsTableContainer = ContactsTableContainer;
})(window.React, window.App);
```

## Setting component state

There are few changes to do in `contactsModule`:

- First we'll change `createReactComponents` method as we don't need to store the `#tableComponent` selector anymore so we'll store instead the mounted component:

  ```javascript
  var createReactComponents = function () {
    $mountedContactsTableContainer = $('#tableComponent').react(ContactsTableContainer, null);
  };
  ```

- Then let's change `showContacts` method to use the component `setState` method to update its state that will trigger React lifecycles methods including `render`:

  ```javascript
  var showContacts = function (contacts, callback) {
    $mountedContactsTableContainer.setState({ contacts: contacts });
  };
  ```

## How it works?

1. When page loads `contactsModule.run` method is called requesting contacts data from `contactsService`, setting the form `onSubmit` handler and initially mounting `ContactsTableContainer` which creates its own state with an empty array of contacts and renders our `ContactsTableComponent`.

2. `ContactsTableContainer` mounted component is stored in  `$mountedContactsTableContainer` variable and initially renders the table header. When `fetchContacts` is completed `ContactsTableContainer` changes its state via `setState` with new contacts. This triggers React component lifecycles and results in rendering the `ContactsTableComponent` that will produce a `<tbody>` with the contacts information.

3. When we fill the form and click on `Add contact` `onSubmit` is triggered retrieving the form data and storing the new contact in `contacts` array, then `contacts` is passed to `showContacts`, changing the `ContactsTableContainer` state so it renders last `<tr>` into the DOM.
