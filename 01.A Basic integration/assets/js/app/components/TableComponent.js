(function initializeTableComponent(React, App) {
  'use strict';

  var TableComponent = function (props) {
    return React.createElement('table',
      { className: 'table table-stripped table-bordered table-hover' },
      createHead(),
      createBody(props.contacts || [])
    );
  }

  TableComponent.propTypes = {
    contacts: React.PropTypes.arrayOf(
      React.PropTypes.shape({
        name: React.PropTypes.string.isRequired,
        phone: React.PropTypes.string.isRequired,
        email: React.PropTypes.string.isRequired
      })
    )
  };

  var createHead = function () {
    var contactTemplate = {
      name: 'Name',
      phone: 'Phone number',
      email: 'Email'
    };
    return React.createElement('thead', null, createRow('th', null, contactTemplate));
  };

  var createBody = function (contacts) {
    var rows = contacts.map(function (contact, index) {
      return createRow('td', index, contact);
    });
    return React.createElement('tbody', null, rows);
  };

  var createRow = function (cell, index, contact) {
    return React.createElement('tr', { key: index },
      createCell(cell, contact.name),
      createCell(cell, contact.phone),
      createCell(cell, contact.email)
    );
  };

  var createCell = function (type, text) {
    return React.createElement(type, null, text);
  };

  App.components.TableComponent = TableComponent;
})(React, window.App);
