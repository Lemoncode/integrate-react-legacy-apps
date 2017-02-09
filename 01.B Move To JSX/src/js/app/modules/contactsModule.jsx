(function initializeContactsModule($, React, ReactDOM, App) {
  'use strict';

  var ContactsTableComponent = App.components.ContactsTableComponent;
  var contactsService = App.contactsService;

  var contactsModule = function () {

    // Simulates server call
    var fetchContacts = function () {
      $.when(contactsService.fetchContacts()).then(function (fetchedContacts) {

        // Pass contacts to TableComponent
        ReactDOM.render(
          <ContactsTableComponent contacts={fetchedContacts} />,
          $('#tableComponent').get(0)
        );
      });
    };

    var run = function () {
      fetchContacts();
    };

    return {
      run: run
    };
  }();

  App.contactsModule = contactsModule;
})(window.jQuery, window.React, window.ReactDOM, window.App);
