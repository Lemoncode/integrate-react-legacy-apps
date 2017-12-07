(function initializeContactPropTypes(React, App) {
  'use strict';

  var ContactPropTypes = PropTypes.shape({
    name: PropTypes.string.isRequired,
    phone: PropTypes.number.isRequired,
    email: PropTypes.string.isRequired
  });

  App.PropTypes.ContactPropTypes = ContactPropTypes;
})(window.React, window.App);
