(function ($, App) {
  'use strict';

  var TableComponent = App.components.TableComponent;
  var contactsService = App.contactsService;
  var contacts, $mountedTableComponent;

  var ContactsModule = (function () {

    var createReactComponents = function () {
      $mountedTableComponent = $('#tableComponent').react(TableComponent, null);
    };

    var showContacts = function (contacts, callback) {
      $mountedTableComponent.setState({ contacts: contacts });
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

  App.Contacts = ContactsModule;
})(jQuery, window.App);


