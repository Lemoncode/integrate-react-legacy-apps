(function initializejQueryPubSub($) {
  $.observe = (function () {
    var subjects = {};
    return function (id) {
      var callbacks;
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
})(window.jQuery);
