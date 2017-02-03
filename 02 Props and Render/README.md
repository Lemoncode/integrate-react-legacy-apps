# 02 Props and Render


In this sample we're going to add a form to add contacts and change our `Contacts` module to handle the form and refresh `TableComponent` with the new contacts.

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

We need to do some changes to `Contacts` module to add event handling and storing the new contacts added so they can be passed to the `TableComponent` :

- First let's declare two variables, **contacts** to store all contacts and **$mountedTableComponent** to keep cached our mounted component.

  ```javascript
  (function ($, App) {
    'use strict';

    var TableComponent = App.components.TableComponent;
    var contactsService = App.contactsService;
    var contacts, $mountedTableComponent;

    var ContactsModule = (function () {
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

- Next let's create the `onSubmit` handler. This method will be intended to retrieve the form values, adapt it to a _contact_ model, add the contact model to our contacts array and finally tell our `TableComponent` to render:

```javascript
var onSubmit = function (event) {
  event.preventDefault();

  // Retrieve data from form
  var contact = $(this)
    .serializeArray()
    .reduce(function (data, prop) {
      data[prop.name] = prop.value;
      return data;
    }, {});

  // Insert contact
  addContact(getContactObject(contact));

  // Reset form controls
  this.reset();

  // Render table
  showContacts(contacts);
};
```