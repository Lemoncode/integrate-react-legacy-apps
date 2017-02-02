(function ($, React, ReactDOM, App) {
  'use strict';

  var TableComponent = App.components.TableComponent;
  var contactsService = App.contactsService;
  var contacts, mountedTableComponent;

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
      fillReactComponentWithData(contacts);
    };

    var createEventHandlers = function () {
      $('#formContact').submit(onSubmit);
    };

    var createReactComponents = function () {
      mountedTableComponent = ReactDOM.render(React.createElement(TableComponent), $('#tableComponent').get(0));
    };

    // Simulates server call
    var fetchContacts = function () {
      $.when(contactsService.fetchContacts())
        .then(function (fetchedContacts) {
          contacts = fetchedContacts;
          fillReactComponentWithData(contacts);
        });
    };

    var fillReactComponentWithData = function (contacts) {
      mountedTableComponent.setContacts(contacts);
    };

    var run = function () {
      fetchContacts();
      createEventHandlers();
      createReactComponents();
    };

    return {
      run: run,
    };
  })();

  App.Contacts = ContactsModule;
})(jQuery, React, ReactDOM, window.App);
