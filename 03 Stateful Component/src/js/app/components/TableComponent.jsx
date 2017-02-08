(function initializeTableComponent(React, App) {
  'use strict';

  var createRow = function (contact, index) {
    return (
      <tr key={index}>
        <td>{contact.name}</td>
        <td>{contact.phone}</td>
        <td>{contact.email}</td>
      </tr>
    );
  };

  var TableComponent = React.createClass({
    getInitialState: function () {
      return {
        contacts: []
      };
    },
    render: function () {
      return (
        <table className="table table-stripped table-bordered table-hover">
          <thead>
            <tr>
              <th>Name</th>
              <th>Phone number</th>
              <th>Email</th>
            </tr>
          </thead>
          <tbody>
            {this.state.contacts.map(createRow)}
          </tbody>
        </table>
      );
    }
  });

  TableComponent.propTypes = {
    contacts: React.PropTypes.arrayOf(
      React.PropTypes.shape({
        name: React.PropTypes.string.isRequired,
        phone: React.PropTypes.string.isRequired,
        email: React.PropTypes.string.isRequired
      })
    )
  };

  App.components.TableComponent = TableComponent;
})(React, window.App);
