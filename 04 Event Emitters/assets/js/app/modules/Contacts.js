(function ($, React, ReactDOM, App) {
  'use strict';

  var TableComponent = App.components.TableComponent;
  var contactsService = App.contactsService;
  var contacts;

  var ContactsModule = (function () {

    var createReactComponents = function () {
      ReactDOM.render(
        React.createElement(TableComponent, null),
        $('#tableComponent').get(0)
      );
    };

    var getContactObject = function (contact) {
      return {
        name: contact.txtName || null,
        phone: contact.txtPhone || null,
        email: contact.txtEmail || null
      };
    };

    var addContact = function (contact) {
      contacts = contacts.concat(contact);
    };

    var onSubmit = function (event) {
      event.preventDefault();

      // Retrieve data from form
      var rawContact = $(this)
        .serializeArray()
        .reduce(function (data, prop) {
          data[prop.name] = prop.value;
          return data;
        }, {});

      // Insert contact
      var contact = getContactObject(rawContact);
      addContact(contact);

      // Reset form controls
      this.reset();

      // Fire event with new contact
      $.observe('contacts').publish(contact);
    };

    var createEventHandlers = function () {
      $('#formContact').submit(onSubmit);
    };

    // Simulates server call
    var fetchContacts = function () {
      $.when(contactsService.fetchContacts())
        .then(function (fetchedContacts) {
          contacts = fetchedContacts;
          $.observe('contacts').publish(contacts);
        });
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


