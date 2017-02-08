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
    onAddContact: function (contact) {
      this.setState({
        contacts: this.state.contacts.concat(contact)
      });
    },
    getInitialState: function () {
      return {
        contacts: []
      };
    },
    componentDidMount: function () {
      $.observe('addContacts').subscribe(this.onAddContact);
    },
    componentWillUnmount: function () {
      $.observe('addContacts').unsubscribe(this.onAddContact);
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
    contacts: React.PropTypes.array
  };

  App.components.TableComponent = TableComponent;
})(React, window.App);

