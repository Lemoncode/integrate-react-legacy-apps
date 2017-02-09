(function initializeContactRowComponent(React, App) {
  'use strict';

  var ContactPropTypes = App.PropTypes.ContactPropTypes;

  var ContactRowComponent = function (props) {
    var contact = props.contact || {};
    return React.createElement('tr', null,
      React.createElement('td', null, contact.name),
      React.createElement('td', null, contact.phone),
      React.createElement('td', null, contact.email)
    )
  };

  ContactRowComponent.displayName = 'ContactRowComponent';
  ContactRowComponent.propTypes = {
    contact: ContactPropTypes
  };

  App.components.ContactRowComponent = ContactRowComponent;
})(window.React, window.App);
