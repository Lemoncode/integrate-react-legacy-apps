(function ($) {
  var subjects = {};
  $.observer = (function () {
    return function (id) {
      var callbacks, method;
      var subject = id && subjects[id];

      if (!subject) {
        callbacks = $.Callbacks();
        subject = {
          publish: callbacks.fire,
          subscribe: callbacks.add,
          unsubscribe: callbacks.remove
        };

        if (id) {
          subjects[id] = subject;
        }
      }
      return subject;
    };
  })();
})(jQuery);
