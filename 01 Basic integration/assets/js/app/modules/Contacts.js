(function ($, React, ReactDOM, App) {
  'use strict';

  var TableComponent = App.components.TableComponent;
  var contactsService = App.contactsService;

  var ContactsModule = (function () {

    // Simulates server call
    var fetchContacts = function () {
      $.when(contactsService.fetchContacts())
        .then(function (fetchedContacts) {

          // Pass contacts to TableComponent
          ReactDOM.render(
            React.createElement(TableComponent, { contacts: fetchedContacts }),
            $('#tableComponent').get(0)
          );
        });
    };

    var run = function () {
      fetchContacts();
    };

    return {
      run: run,
    };
  })();

  App.Contacts = ContactsModule;
})(jQuery, React, ReactDOM, window.App);


