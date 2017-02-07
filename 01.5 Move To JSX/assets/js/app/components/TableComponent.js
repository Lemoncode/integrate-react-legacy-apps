(function initializeTableComponent(React, App) {
  'use strict';

  var createRow = function (contact, index) {
    return React.createElement(
      "tr",
      { key: index },
      React.createElement(
        "td",
        null,
        contact.name
      ),
      React.createElement(
        "td",
        null,
        contact.phone
      ),
      React.createElement(
        "td",
        null,
        contact.email
      )
    );
  };

  var TableComponent = function (props) {
    var contacts = props.contacts || [];
    return React.createElement(
      "table",
      { className: "table table-stripped table-bordered table-hover" },
      React.createElement(
        "thead",
        null,
        React.createElement(
          "tr",
          null,
          React.createElement(
            "th",
            null,
            "Name"
          ),
          React.createElement(
            "th",
            null,
            "Phone number"
          ),
          React.createElement(
            "th",
            null,
            "Email"
          )
        )
      ),
      React.createElement(
        "tbody",
        null,
        contacts.map(createRow)
      )
    );
  };

  TableComponent.propTypes = {
    contacts: React.PropTypes.array
  };

  App.components.TableComponent = TableComponent;
})(React, window.App);