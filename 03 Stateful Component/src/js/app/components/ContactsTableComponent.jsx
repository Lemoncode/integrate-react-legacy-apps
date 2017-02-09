(function initializeContactsTableComponent(React, App) {
  'use strict';

  var ContactPropTypes = App.PropTypes.ContactPropTypes;
  var ContactRowComponent = App.components.ContactRowComponent;

  var ContactsTableComponent = React.createClass({
    getInitialState: function () {
      return {
        contacts: []
      };
    },
    displayName: 'ContactsTableComponent',
    render: function () {
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
            {this.state.contacts.map(function (contact, index) {
              return <ContactRowComponent key={index} contact={contact} />;
            })}
          </tbody>
        </table>
      );
    }
  });

  ContactsTableComponent.propTypes = {
    contacts: ContactPropTypes
  };

  App.components.ContactsTableComponent = ContactsTableComponent;
})(window.React, window.App);
