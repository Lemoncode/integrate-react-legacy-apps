(function ($, App, window) {
  'use strict';

  var contactsService = (function () {
    var REQUEST_DELAY = 600;
    var contacts = [{
      name: 'Jose C. Thomson',
      phone: 915797511,
      email: 'jcthomson@hotmail.com'
    },
    {
      name: 'Shelia L. Clark',
      phone: 956631391,
      email: 'sheilac78@gmail.com'
    },
    {
      name: 'Aaron B. Hudkins',
      phone: 660892268,
      email: 'flooreb@aol.com'
    }];

    var fetchContacts = function () {
      var deferred = $.Deferred();
      window.setTimeout(function () {
        deferred.resolve(contacts);
      }, REQUEST_DELAY);
      return deferred;
    };

    return {
      fetchContacts: fetchContacts
    };
  })();

  App.contactsService = contactsService;
})(window.jQuery, window.App, window)
