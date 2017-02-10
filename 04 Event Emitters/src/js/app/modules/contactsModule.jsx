(function initializeContactsModule($, React, ReactDOM, App) {
  'use strict';

  var ContactsTableContainer = App.components.ContactsTableContainer;
  var contactsService = App.contactsService;
  var contacts;

  var contactsModule = (function () {

    var createReactComponents = function () {
      ReactDOM.render(
        <ContactsTableContainer />,
        $('#tableComponent').get(0)
      );
    };

    var getContactObject = function (contact) {
      return {
        name: contact.txtName || null,
        phone: parseInt(contact.txtPhone) || null,
        email: contact.txtEmail || null
      };
    };

    var addContact = function (contact) {
      contacts = contacts.concat(contact);
    };

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
      contact = getContactObject(contact);
      addContact(contact);

      // Reset form controls
      form.reset();

      // Fire notification with new contact
      $.observe('addContacts').publish(contact);
    };

    var createEventHandlers = function () {
      $('#formContact').submit(onSubmit);
    };

    // Simulates server call
    var fetchContacts = function () {
      $.when(contactsService.fetchContacts())
        .then(function (fetchedContacts) {
          contacts = fetchedContacts;
          $.observe('addContacts').publish(contacts);
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

  App.contactsModule = contactsModule;
})(window.jQuery, window.React, window.ReactDOM, window.App);


