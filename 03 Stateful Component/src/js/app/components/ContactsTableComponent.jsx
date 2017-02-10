(function initializeContactsTableComponent(React, App) {
  'use strict';

  var ContactPropTypes = App.PropTypes.ContactPropTypes;
  var ContactRowComponent = App.components.ContactRowComponent;

  var ContactsTableComponent = function (props) {
    var contacts = props.contacts || [];
    return (
      <table className="table table-stripped table-bordered table-hover">
        <thead>
          <tr>
            <th>Name</th>
            <th>Phone number</th>
            <th>Email</th>
          </tr>
        </thead>
        <tbody>
          {contacts.map(function (contact, index) {
            return <ContactRowComponent key={index} contact={contact} />;
          })}
        </tbody>
      </table>
    );
  };

  ContactsTableComponent.displayName = 'ContactsTableComponent';
  ContactsTableComponent.propTypes = {
    contacts: React.PropTypes.arrayOf(ContactPropTypes)
  };

  App.components.ContactsTableComponent = ContactsTableComponent;
})(window.React, window.App);
