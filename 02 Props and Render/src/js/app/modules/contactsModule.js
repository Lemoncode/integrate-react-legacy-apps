(function initializeContactsModule($, App) {
  'use strict';

  var ContactsTableComponent = App.components.ContactsTableComponent;
  var contactsService = App.contactsService;
  var contacts, $mountedContactsTableComponent;

  var contactsModule = (function () {


    var createReactComponents = function () {
      $mountedContactsTableComponent = $('#tableComponent');
      showContacts(null);
    };

    var showContacts = function (contacts, callback) {
      $mountedContactsTableComponent.react(ContactsTableComponent, { contacts: contacts || [] }, callback);
    };

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

    var createEventHandlers = function () {
      $('#formContact').submit(onSubmit);
    };

    // Simulates server call
    var fetchContacts = function () {
      $.when(contactsService.fetchContacts())
        .then(function (fetchedContacts) {
          contacts = fetchedContacts;
          showContacts(contacts);
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
})(window.jQuery, window.App);


