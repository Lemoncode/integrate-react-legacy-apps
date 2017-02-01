(function ComponentInitializator($, React, App) {

  var createCell = function createCell(type, text) {
    return React.createElement(type, null, text);
  };

  var createRowThead = function createRowThead() {
    return React.createElement('tr', null,
      createCell('th', 'Name'),
      createCell('th', 'Phone number'),
      createCell('th', 'Email')
    );
  };

  var createRowTBody = function createRowTBody(contact, index) {
    return React.createElement('tr', { key: index },
      createCell('td', contact.name),
      createCell('td', contact.phone),
      createCell('td', contact.email)
    );
  };

  var createThead = function createThead() {
    return React.createElement('thead', null, createRowThead());
  };

  var createTbody = function createTbody(contacts) {
    var rows = contacts.map(function (contact, index) {
      return createRowTBody(contact, index);
    });
    return React.createElement('tbody', null, rows);
  };

  var TableComponent = React.createClass({
    getInitialState: function getInitialState() {
      return {
        contacts: []
      };
    },
    loadContacts: function loadContacts(contacts) {
      this.setState({
        contacts: contacts
      });
    },
    render: function render() {
      var thead = createThead();
      var tbody = createTbody(this.state.contacts);
      return React.createElement('table', {
        className: 'table table-stripped table-bordered table-hover'
      }, thead, tbody);
    }
  });

  App.components.TableComponent = TableComponent;
})(jQuery, React, window.App);
