(function initializeTableComponent(React, App) {
  'use strict';

  var createCell = function (type, text) {
    return React.createElement(type, null, text);
  };

  var createRow = function (cell, index, contact) {
    return React.createElement('tr', { key: index },
      createCell(cell, contact.name),
      createCell(cell, contact.phone),
      createCell(cell, contact.email)
    );
  };

  var createHead = function () {
    var contactTemplate = {
      name: 'Name',
      phone: 'Phone number',
      email: 'Email'
    };
    return React.createElement('thead', null, createRow('th', null, contactTemplate));
  };

  var creatBody = function (contacts) {
    var rows = contacts.map(function (contact, index) {
      return createRow('td', index, contact);
    });
    return React.createElement('tbody', null, rows);
  };

  var TableComponent = React.createClass({
    render: function () {
      var contacts = this.props.contacts || [];
      return React.createElement('table',
        { className: 'table table-stripped table-bordered table-hover' },
        createHead(),
        creatBody(contacts)
      );
    },
  });

  App.components.TableComponent = TableComponent;
})(React, window.App);
