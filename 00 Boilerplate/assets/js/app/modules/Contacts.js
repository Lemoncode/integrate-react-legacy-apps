(function ($, App) {
  'use strict';

  var domUtils = App.domUtils;
  var contactsService = App.contactsService;

  var Contacts = (function () {
    var table = '#tableContacts';
    var contacts;

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

      // Reset form fields
      this.reset();

      // Render table
      showContacts(contacts);
    };

    var createEventHandlers = function () {
      $('#formContact').submit(onSubmit);
    };

    var run = function () {
      fetchContacts();
      createEventHandlers();
    };

    // Simulates server call
    var fetchContacts = function () {
      $.when(contactsService.fetchContacts())
        .then(function (fetchedContacts) {
          contacts = fetchedContacts;
          showContacts(contacts);
        });
    };

    // Render table
    var showContacts = function (contacts) {
      domUtils.renderTable(contacts, table);
    };

    return {
      run: run,
    };
  })();

  App.Contacts = Contacts;
})(jQuery, window.App);
