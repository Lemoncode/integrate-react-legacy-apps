(function initializeContactRowComponent(React, App) {
  'use strict';

  var ContactPropTypes = App.PropTypes.ContactPropTypes;

  var ContactRowComponent = function (props) {
    var contact = props.contact || {};
    return (
      <tr>
        <td>{contact.name}</td>
        <td>{contact.phone}</td>
        <td>{contact.email}</td>
      </tr>
    );
  };

  ContactRowComponent.displayName = 'ContactRowComponent';
  ContactRowComponent.propTypes = {
    contact: ContactPropTypes
  };

  App.components.ContactRowComponent = ContactRowComponent;
})(window.React, window.App);
