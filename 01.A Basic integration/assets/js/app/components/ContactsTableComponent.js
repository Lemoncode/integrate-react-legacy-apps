(function initializeContactsTableComponent(React, App) {
  'use strict';

  var ContactRowComponent = App.components.ContactRowComponent;
  var ContactPropTypes = App.PropTypes.ContactPropTypes;

  var ContactsTableComponent = function (props) {
    var contacts = props.contacts || [];
    return React.createElement(
      'table',
      { className: 'table table-stripped table-bordered table-hover' },
      React.createElement('thead', null,
        React.createElement('tr', null,
          React.createElement('th', null, 'Name'),
          React.createElement('th', null, 'Phone number'),
          React.createElement('th', null, 'Email')
        )
      ),
      React.createElement('tbody', null,
        contacts.map(function (contact, index) {
          return React.createElement(ContactRowComponent, {
            contact: contact,
            key: index
          });
        })
      )
    );
  }

  ContactsTableComponent.displayName = 'ContactsTableComponent';
  ContactsTableComponent.propTypes = {
    contacts: PropTypes.arrayOf(ContactPropTypes)
  };

  App.components.ContactsTableComponent = ContactsTableComponent;
})(window.React, window.App);
