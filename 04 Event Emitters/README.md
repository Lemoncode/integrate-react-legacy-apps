# 04 Event Emitters

In this sample we're going to use the [Publish/Subscribe pattern](https://en.wikipedia.org/wiki/Publish%E2%80%93subscribe_pattern) using [jQuery.Callbacks](https://api.jquery.com/jQuery.Callbacks/) method. This implementation is useful if we need a module or component that needs to listen external changes through events to do some actions. We gain loose coupling, methods that have one unique responsability and good scalability.

This sample takes as starting point sample _03 Stateful Components_.

## Creating subjects

- First we'll create under `plugins` folder a new file called `jquery-pub-sub.js` and remove `jquery-react.js` as we aren't going to need it. Your folder structure should look like this:

  ```
  .
  ├── assets/
  │   ├── css
  │   │   └── styles.css
  │   └── js
  │       ├── app
  │       │   ├── App.js
  │       │   ├── components
  │       │   │   └── TableComponent.js
  │       │   ├── modules
  │       │   │   └── contactsModule.js
  │       │   ├── plugins
  │       │   │   └── jquery-pub-sub.js
  │       │   └── services
  │       │       └── contactsService.js
  │       └── index.js
  │
  └─ index.html
  ```

- Then let's define our Pub/Sub implementation, we'll create an object containing all subjects and wrap `jQuery.Callbacks()` when subject don't exist:

  ```javascript
  (function initializejQueryPubSub($) {
    var subjects = {};
    $.observer = (function () {
      return function (id) {
        var callbacks, method;
        var subject = id && subjects[id];

        if (!subject) {
          callbacks = $.Callbacks();
          subject = {
            publish: callbacks.fire,
            subscribe: callbacks.add,
            unsubscribe: callbacks.remove
          };

          if (id) {
            subjects[id] = subject;
          }
        }
        return subject;
      };
    })();
  })(jQuery);
  ```

- Then we can add `jquery-pub-sub.js` to our `index.html` file:

  ```html
  ...
  <script src="./node_modules/react-dom/dist/react-dom.js"></script>

  <script src="./assets/js/app/plugins/jquery-pub-sub.js"></script>

  <script src="./assets/js/app/App.js"></script>
  ...
  ```

## Publishing contact

Let's change the `contactsModule.js` implementation to use Pub/Sub pattern:

- First, we'll add React and ReactDOM to our module dependencies:

  ```javascript
  (function initializeContactsModule($, React, ReactDOM, App) {
    'use strict';

    var TableComponent = App.components.TableComponent;

    ...

    App.contactsModule = contactsModule;
  })(jQuery, React, ReactDOM, window.App);
  ```

- Next we'll remove `$mountedTableComponent` variable and change `createReactComponents` method definition. We'll also remove `showContacts` method:

  ```javascript
  ...
  var contactsService = App.contactsService;
  var contacts;

  var contactsModule = (function () {

    var createReactComponents = function () {
      ReactDOM.render(
        React.createElement(TableComponent, null),
        $('#tableComponent').get(0)
      );
    };
  ...
  ```

- We'll also remove `showContacts` method. We'll create a _subject_ for new contacts notifications called `contacts` that will be used to pass new contacts so let's change `onSubmit` method definition:

  ```javascript
  ...
  var onSubmit = function (event) {
    event.preventDefault();

    // Retrieve data from form
    var contact= $(this)
      .serializeArray()
      .reduce(function (data, prop) {
        data[prop.name] = prop.value;
        return data;
      }, {});

    // Insert contact
    contact = getContactObject(contact);
    addContact(contact);

    // Reset form controls
    this.reset();

    // Fire notification with new contact
    $.observe('addContacts').publish(contact);
  };
  ...
  ```

- Next we'll change `fetchContacts` definition to also use `$.observe`. This time we will publish all new contacts at once:

  ```javascript
  ...
  // Simulates server call
  var fetchContacts = function () {
    $.when(contactsService.fetchContacts())
      .then(function (fetchedContacts) {
        contacts = fetchedContacts;
        $.observe('addContacts').publish(contacts);
      });
  };
  ...
  ```

## Subscribing our `TableComponent` to subject

Subscribing our `TableComponent` to a subject is pretty straightforward:

- First we'll need to add `jQuery` to its dependencies:

  ```javascript
  (function initializeTableComponent($, React, App) {
    'use strict';

  ...

    App.components.TableComponent = TableComponent;
  })(jQuery, React, window.App);
  ```

- Next we'll create a method to handle new contacts through subscription to `contacts` subject and set it in it's state:

  ```javascript
  ...
  var TableComponent = React.createClass({
    onAddContact: function (contact) {
      this.setState({
        contacts: this.state.contacts.concat(contact)
      });
    },
    getInitialState: function () {
  ...
  ```

- Then we need to define two React lifecycles methods, with `componentDidMount` we'll subscribe to `contacts` subject and `componentWillUnmount` will be used to unsubscribe the component from the subject:

  ```javascript
  ...
  },
  componentDidMount: function () {
    $.observe('addContacts').subscribe(this.onAddContact);
  },
  componentWillUnmount: function () {
    $.observe('addContacts').unsubscribe(this.onAddContact);
  },
  render: function () {
  ...
  ```

## How it works?

1. When page loads `contactsModule.run` method is called requesting contacts data from `contactsService`, setting the form `onSubmit` handler and initially mounting `TableComponent` which creates its own state with an empty array of contacts and renders the table header.

2. When `fetchContacts` is completed we fire the subject `addContacts`  with the new contacts and `TableComponent` gets notified, calling `onAddContact` method that changes its state via `setState` with new contacts. This triggers React component lifecycles and results in rendering `<tbody>` with the contacts information.

3. When we fill the form and click on `Add contact` `onSubmit` is triggered retrieving the form data and storing the new contact in `contacts` array, then `addContacs` subject is fired with the new contact and `TableComponent` receives the notification with the new contact so it pushes into its state with the rest of contacts. React diffs the new state and it renders last `<tr>` into the DOM.

