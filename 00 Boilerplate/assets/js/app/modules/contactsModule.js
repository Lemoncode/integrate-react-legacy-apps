(function initializeContactsModule($, App) {
  'use strict';

  var domUtils = App.domUtils;
  var contactsService = App.contactsService;

  var contactsModule = (function () {
    var table = '#tableContacts';

    var run = function () {
      fetchContacts();
    };

    // Simulates server call
    var fetchContacts = function () {
      $.when(contactsService.fetchContacts())
        .then(function (fetchedContacts) {
          showContacts(fetchedContacts);
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

  App.contactsModule = contactsModule;
})(window.jQuery, window.App);
