# 02 Props and Render


In this sample we're going to add a form to add contacts and change our `Contacts` module to handle the form and refresh `ContactsTableComponent` with the new contacts.

> You can start by opening a command prompt, locating yourself on the root folder of the project and executing `npm run build:watch` to tell Gulp to start watching for the changes done.

## Adding a contact form
Let's begin by adding the form in our `index.hml` file right inside the `<header>`:

```html
...
<header class="header">
  <h2>Book Address</h2>
  <h4>Add contact</h4>
  <form id="formContact" class="form-inline">
    <fieldset class="row">
      <div class="col-sm-12">
        <div class="form-group">
          <label for="txtName" class="control-label">Full name</label>
          <input id="txtName" name="txtName" type="text" class="form-control" required>
        </div>
        <div class="form-group">
          <label for="txtPhone" class="control-label">Phone number</label>
          <input id="txtPhone" name="txtPhone" type="tel" class="form-control" required>
        </div>
        <div class="form-group">
          <label for="txtEmail" class="control-label">Email</label>
          <input id="txtEmail" name="txtEmail" type="email" class="form-control" required>
        </div>
        <div class="form-group">
          <button class="btn btn-primary">Create contact</button>
        </div>
      </div>
    </fieldset>
  </form>
</header>
...
```

## Libraries communication

To use React inside jQuery we could create a custom method extended from `jQuery.prototype` called **react** that receives a component definition, some properties and an optional callback and return the mounted component. This is useful if we need to remount a component that receive new props. Let's create this `react` method in a new filed called `jquery-react.jsx` under a new folder `plugins`:

```jsx
(function initializejQueryReactPlugin($, React, ReactDOM) {
  'use strict';

  $.fn.extend({
    react: function (Component, props, callback) {
      var mountedComponent = ReactDOM.render(
        <Component, {...props} />,
        this.get(0)
      );

      if (typeof callback === 'function') {
        return callback(mountedComponent);
      }

      return mountedComponent;
    }
  });
})(jQuery, React, ReactDOM);
```

> Note that we added React as a dependency but we have not really used it. When we write `.jsx` files all `<tags>` get transformed into `React.createElement` statements so we need to add React.

Then add <code>jquery-react.<strong>js</strong></code> in our `index.html`file (remember `.jsx` will be _transpiled_ to `.js`):

```html
...
<script src="./node_modules/react-dom/dist/react-dom.js"></script>
<script src="./dist/js/app/plugins/jquery-react.js"></script>
<script src="./dist/js/app/App.js"></script>
...
```

## Refactoring `contactsModule`

We need to do some changes to `contactsModule` to add event handling and storing the new contacts added so they can be passed to the `ContactsTableComponent` :

- Let's begin renaming it to `contactsModule.js` as we will not be using JSX syntax here. Also remove `React` and `ReactDOM` from its dependencies:

  ```javascript
  (function initializeContactsModule($, App) {
    'use strict';

    ...

    App.contactsModule = contactsModule;
  })(jQuery, window.App);
  ```

- Now let's declare two variables, **contacts** to store all contacts and **$mountedContactsTableComponent** to keep cached our mounted component.

  ```javascript
  (function initializeContactsModule($, App) {
    'use strict';

    var ContactsTableComponent = App.components.ContactsTableComponent;
    var contactsService = App.contactsService;
    var contacts, $mountedContactsTableComponent;

    var contactsModule = (function () {
  ```

- Then we need to create a mehthod to add an `onSubmit` our new form, let's call it `createEventHandlers`:

  ```javascript
  ...
  var createEventHandlers = function () {
    $('#formContact').submit(onSubmit);
  };

  // Simulates server call
  var fetchContacts = function () {
  ...
  ```

- Next let's create the `onSubmit` handler. This method will be intended to retrieve the form values, adapt it to a _contact_ model, add the contact model to our contacts array and finally tell our `ContactsTableComponent` to render:

  ```javascript
  var onSubmit = function (event) {
    event.preventDefault();
    var form = event.currentTarget;

    // Retrieve data from form
    var contact = $(form)
      .serializeArray()
      .reduce(function (data, prop) {
        data[prop.name] = prop.value;
        return data;
      }, {});

    // Insert contact
    addContact(getContactObject(contact));

    // Reset form controls
    form.reset();

    // Render table
    showContacts(contacts);
  };
  ```

- Now we'll define a simple `addContact` that receives an `contact` objects and push it to `contacts` array using **immutable** methods like `Array.prototype.concat`. We'll also define a `getContactObject` to get the properties of the retrieved contact and map them to a `contact` model:

```javascript
...
var getContactObject = function (contact) {
  return {
    name: contact.txtName || null,
    phone: parseInt(contact.txtPhone) || null,
    email: contact.txtEmail || null
  };
};

var addContact = function (contact) {
  contacts = contacts.concat([contact]);
};

var onSubmit = function (event) {
...
```

- Next step is to define the `showContacts` method that will update our `ContactsTableComponent`:

```javascript
....
var showContacts = function (contacts, callback) {
  $mountedContactsTableComponent.react(ContactsTableComponent, { contacts: contacts || [] }, callback);
};

var getContactObject = function (contact) {
....
```

- Finally we'll create a `createReactComponents` method to initialize our component and store it in `$mountedContactsTableComponent` when `run` is called:

```javascript
...
var createReactComponents = function () {
  $mountedContactsTableComponent = $('#ContactsTableComponent');
  showContacts(null);
};

var showContacts = function (contacts, callback) {
...

var run = function () {
  fetchContacts();
  createEventHandlers();
  createReactComponents();
};
```

## How it works?

1. When page loads `contactsModule.run` method is called requesting contacts data from `contactsService`, setting the form `onSubmit` handler and initially mounting `ContactsTableComponent` with an empty array.

2. `ContactsTableComponent` jQuery selector is stored in  `$mountedContactsTableComponent` variable and initially renders the table header. When `fetchContacts` is completed `ContactsTableComponent` is updated with new contacts (React diffs the current table with the new rendered table and renders only the `<tbody>`).

3. When we fill the form and click on `Add contact` `onSubmit` is triggered retrieving the form data and storing the new contact in `contacts` array, then `contacts` is passed to `showContacts`, updateing the `ContactsTableComponent` and rendering last `<tr>` into the DOM.
