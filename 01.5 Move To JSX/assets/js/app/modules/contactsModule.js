(function initializeContactsModule($, React, ReactDOM, App) {
  'use strict';

  var TableComponent = App.components.TableComponent;
  var contactsService = App.contactsService;

  var contactsModule = function () {

    // Simulates server call
    var fetchContacts = function () {
      $.when(contactsService.fetchContacts()).then(function (fetchedContacts) {

        // Pass contacts to TableComponent
        ReactDOM.render(React.createElement(TableComponent, { contacts: fetchedContacts }), $('#tableComponent').get(0));
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
})(jQuery, React, ReactDOM, window.App);