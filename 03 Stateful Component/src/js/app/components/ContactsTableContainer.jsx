(function initializeContactsTableContainer(React, App) {
  'use strict';

  var ContactPropTypes = App.PropTypes.ContactPropTypes;
  var ContactsTableComponent = App.components.ContactsTableComponent;

  var ContactsTableContainer = React.createClass({
    displayName: 'ContactsTableContainer',
    getInitialState: function () {
      return {
        contacts: []
      };
    },
    render: function () {
      return <ContactsTableComponent contacts={this.state.contacts} />;
    }
  });

  App.components.ContactsTableContainer = ContactsTableContainer;
})(window.React, window.App);
