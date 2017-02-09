# 03 Stateful Component

In this sample we're going to change the implementation of _02 Props and Render_ to introduce a `ContactsTableComponent` that can store contacts in its own state.

## From `props` to `state`
Let's begin changing `ContactsTableComponent` implementation to not accept props and set contacts via `setState`:

- First we'll change our stateless component to a React class:

  ```javascript
  var ContactsTableComponent = React.createClass({
    render: function (props) {
      var contacts = props.contacts || [];
      return (
        <table className="table table-stripped table-bordered table-hover">
          <thead>
            <tr>
              <th>Name</th>
              <th>Phone number</th>
              <th>Email</th>
            </tr>
          </thead>
          <tbody>
            {contacts.map(function(contact, index) {
              return <ContactRowComponent key={index} contact={contact} />;
            })}
          </tbody>
        </table>
      );
    }
  });
  ```

- Then we are going to add the React lifecycle hook `getInitialState` to initialize `contacts` in the state:

  ```javascript
  ...
  var ContactsTableComponent = React.createClass({
    displayName: 'ContactsTableComponent',
    getInitialState: function () {
      return {
        contacts: []
      };
    },
    render: function () {
  ...
  ```

- Finally change the render method to accept contacts from `state` instead of `props` in its render method:

  ```javascript
  render: function () {
    return (
      <table className="table table-stripped table-bordered table-hover">
        <thead>
          <tr>
            <th>Name</th>
            <th>Phone number</th>
            <th>Email</th>
          </tr>
        </thead>
        <tbody>
          {this.state.contacts.map(function (contact, index) {
            return <ContactRowComponent key={index} contact={contact} />;
          })}
        </tbody>
      </table>
    );
  }
  ```

## Setting component state

There are few changes to do in `contactsModule`:

- First we'll change `createReactComponents` method as we don't need to store the `#tableComponent` selector anymore so we'll store instead the mounted component:

  ```javascript
  var createReactComponents = function () {
    $mountedContactsTableComponent = $('#tableComponent').react(ContactsTableComponent, null);
  };
  ```

- Then let's change `showContacts` method to use the component `setState` method to update its state that will trigger React lifecycles methods including `render`:

  ```javascript
  var showContacts = function (contacts, callback) {
    $mountedContactsTableComponent.setState({ contacts: contacts });
  };
  ```

## How it works?

1. When page loads `contactsModule.run` method is called requesting contacts data from `contactsService`, setting the form `onSubmit` handler and initially mounting `ContactsTableComponent` which creates its own state with an empty array of contacts.

2. `ContactsTableComponent` mounted component is stored in  `$mountedContactsTableComponent` variable and initially renders the table header. When `fetchContacts` is completed `ContactsTableComponent` changes its state via `setState` with new contacts. This triggers React component lifecycles and results in rendering `<tbody>` with the contacts information.

3. When we fill the form and click on `Add contact` `onSubmit` is triggered retrieving the form data and storing the new contact in `contacts` array, then `contacts` is passed to `showContacts`, changing the `ContactsTableComponent` states so it renders last `<tr>` into the DOM.
