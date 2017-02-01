(function ($, App, domUtils) {
  'use strict';

  var table = '#tableContacts';
  var Contacts = (function () {
    var contacts = [
      {
        name: 'Santi',
        phone: 655322454,
        email: 'santi.camargo@lemoncode.net'
      },
      {
        name: 'Gus',
        phone: 652464604,
        email: 'sanfemar@msn.com'
      },
    ];

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
      domUtils.renderTable(contacts, table);
    };
    var createEventHandlers = function () {
      $('#formContact').submit(onSubmit);
    };
    var run = function () {
      createEventHandlers();
      loadContacts();
    };

    var getContacts = function () {
      return contacts;
    };

    var loadContacts = function () {
      domUtils.renderTable(contacts, table);
    };

    return {
      run: run,
    };
  })();

  App.Contacts = Contacts;
})(jQuery, window.App, window.App.domUtils);
