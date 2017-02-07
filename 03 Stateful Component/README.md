# 03 Stateful Component

In this sample we're going to change the implementation of _02 Props and Render_ to introduce a `TableComponent` that can store contacts in its own state.

## From `props` to `state`
Let's begin changing `TableComponent` implementation to not accept props and set contacts via `setState`:

- First we'll add the lifecycle hook `getInitialState` to initialize `contacts` in the state:

  ```javascript
  ...
  var TableComponent = React.createClass({
    getInitialState: function () {
      return {
        contacts: []
      };
    },
    render: function () {
  ...
  ```

- Then change the render method to accept contacts from `state` instead of `props`:

  ```javascript
  render: function () {
    return React.createElement('table',
      { className: 'table table-stripped table-bordered table-hover' },
      createHead(),
      createBody(this.state.contacts)
    );
  },
  ```

## Setting component state

There are few changes to do in `contactsModule`:

- First we'll change `createReactComponents` method as we don't need to store the `#tableComponent` selector anymore so we'll store instead the mounted component:

  ```javascript
  var createReactComponents = function () {
    $mountedTableComponent = $('#tableComponent').react(TableComponent, null);
  };
  ```

- Then let's change `showContacts` method to use the component `setState` method to update its state that will trigger React lifecycles methods including `render`:

  ```javascript
  var showContacts = function (contacts, callback) {
    $mountedTableComponent.setState({ contacts: contacts });
  };
  ```


## How it works?

1. When page loads `contactsModule.run` method is called requesting contacts data from `contactsService`, setting the form `onSubmit` handler and initially mounting `TableComponent` which creates its own state with an empty array of contacts.

2. `TableComponent` mounted component is stored in  `$mountedTableComponent` variable and initially renders the table header. When `fetchContacts` is completed `TableComponent` changes its state via `setState` with new contacts. This triggers React component lifecycles and results in rendering `<tbody>` with the contacts information.

3. When we fill the form and click on `Add contact` `onSubmit` is triggered retrieving the form data and storing the new contact in `contacts` array, then `contacts` is passed to `showContacts`, changing the `TableComponent` states so it renders last `<tr>` into the DOM.
