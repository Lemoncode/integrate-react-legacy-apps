(function initializeContactsTableContainer($, React, App) {
  'use strict';

  var ContactPropTypes = App.PropTypes.ContactPropTypes;
  var ContactsTableComponent = App.components.ContactsTableComponent;

  var ContactsTableContainer = React.createClass({
    displayName: 'ContactsTableContainer',
    onAddContact: function (contact) {
      this.setState({
        contacts: this.state.contacts.concat(contact)
      });
    },
    componentDidMount: function () {
      $.observe('addContacts').subscribe(this.onAddContact);
    },
    componentWillUnmount: function () {
      $.observe('addContacts').unsubscribe(this.onAddContact);
    },
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
})(window.jQuery, window.React, window.App);
