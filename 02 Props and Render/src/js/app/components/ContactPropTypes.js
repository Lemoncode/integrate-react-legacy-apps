(function initializeContactPropTypes(React, App) {
  'use strict';

  var ContactPropTypes = React.PropTypes.shape({
    name: React.PropTypes.string.isRequired,
    phone: React.PropTypes.number.isRequired,
    email: React.PropTypes.string.isRequired
  });

  App.PropTypes.ContactPropTypes = ContactPropTypes;
})(window.React, window.App);
