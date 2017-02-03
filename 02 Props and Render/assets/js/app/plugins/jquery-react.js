(function ($, React, ReactDOM) {
  $.fn.extend({
    react: function (component, props, callback) {
      var mountedComponent = ReactDOM.render(
        React.createElement(component, props),
        this.get(0)
      );

      if (typeof callback === 'function') {
        return callback(mountedComponent);
      }

      return mountedComponent;
    }
  });
})(jQuery, React, ReactDOM);
