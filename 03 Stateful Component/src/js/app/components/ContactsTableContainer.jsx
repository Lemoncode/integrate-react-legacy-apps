(function initializeContactsTableContainer(React, App) {
  'use strict';

  var ContactPropTypes = App.PropTypes.ContactPropTypes;
  var ContactsTableComponent = App.components.ContactsTableComponent;
  
  class ContactsTableContainer extends React.Component {
    
    constructor() {
      super();
      this.state = { contacts: [] };
    }

    render() {
      return <ContactsTableComponent contacts={this.state.contacts} />;
    }
  }

  App.components.ContactsTableContainer = ContactsTableContainer;
})(window.React, window.App);
