(function initializejQueryReactPlugin($, React, ReactDOM) {
  'use strict';

  $.fn.extend({
    react: function (Component, props, callback) {
      var mountedComponent = ReactDOM.render(
        <Component {...props}/>,
        this.get(0)
      );

      if (typeof callback === 'function') {
        return callback(mountedComponent);
      }

      return mountedComponent;
    }
  });
})(jQuery, React, ReactDOM);
