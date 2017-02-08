(function initializeDOMUtils($, App) {
  'use strict';

  var domUtils = (function () {
    var createRow = function (contact) {
      var row = $('<tr></tr>');
      row.append('<td>' + contact.name + '</td>');
      row.append('<td>' + contact.phone + '</td>');
      row.append('<td>' + contact.email + '</td>');
      return row;
    };

    var renderTable = function (contacts, table) {
      var $table = table instanceof $ ? table : $(table);
      var html = contacts
        .map(createRow)
        .reduce(function (text, $row) {
          return text + $row.get(0).outerHTML;
        }, '');

      $table.find('tbody').html(html);
    };

    return {
      createRow: createRow,
      renderTable: renderTable
    };
  })();

  App.domUtils = domUtils;
})(jQuery, window.App);
