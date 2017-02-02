(function (App) {
  var contactsService = (function () {
    var fetchContacts = function () {
      return [{
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
    };

    return {
      fetchContacts: fetchContacts
    };
  })();

  App.contactsService = contactsService;
})(window.App)
