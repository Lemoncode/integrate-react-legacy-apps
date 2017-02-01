(function ($, React, ReactDOM, App) {
  'use strict';

  var TableComponent = App.components.TableComponent;
  var contactsService = App.contactsService;
  var mountedTableComponent;

  var contacts;

  var ContactsModule = (function () {

    var getContactObject = function (contact) {
      return {
        name: contact.txtName,
        phone: contact.txtPhone,
        email: contact.txtEmail
      };
    };

    var addContact = function (contact) {
      contacts.push(contact);
    };

    var onSubmit = function (event) {
      event.preventDefault();

      // Fetch data from form
      var contact = $(this)
        .serializeArray()
        .reduce(function (data, prop) {
          data[prop.name] = prop.value;
          return data;
        }, {});

      // Insert contact
      addContact(getContactObject(contact));

      this.reset();

      // Render table
      mountedTableComponent.loadContacts(contacts);
    };

    var createEventHandlers = function () {
      $('#formContact').submit(onSubmit);
    };

    var createReactComponents = function () {
      mountedTableComponent = ReactDOM.render(React.createElement(TableComponent), $('#tableComponent').get(0));
    };

    // Simulates server call
    var fetchContacts = function () {
      return contactsService.fetchContacts();
    };

    var fillReactComponentWithData = function () {
      mountedTableComponent.loadContacts(contacts);
    };

    var loadContacts = function () {
      contacts = fetchContacts();
    };

    var run = function () {
      loadContacts();
      createEventHandlers();
      createReactComponents();
      fillReactComponentWithData();
    };

    return {
      run: run,
    };
  })();

  App.Contacts = ContactsModule;
})(jQuery, React, ReactDOM, window.App);
