(function initializeContactsTableContainer($, React, App) {
  'use strict';

  var ContactPropTypes = App.PropTypes.ContactPropTypes;
  var ContactsTableComponent = App.components.ContactsTableComponent;

  class ContactsTableContainer extends React.Component {

    constructor() {
      super();
      this.state = { contacts: [] };
      this.onAddContact = this.onAddContact.bind(this);
    }

    onAddContact(contact) {
      this.setState({
        contacts: this.state.contacts.concat(contact)
      });
    }

    componentDidMount() {
      $.observe('addContacts').subscribe(this.onAddContact);
    }

    componentWillUnmount() {
      $.observe('addContacts').unsubscribe(this.onAddContact);
    }

    render() {
      return <ContactsTableComponent contacts={this.state.contacts} />;
    }
  }

  App.components.ContactsTableContainer = ContactsTableContainer;
})(window.jQuery, window.React, window.App);
