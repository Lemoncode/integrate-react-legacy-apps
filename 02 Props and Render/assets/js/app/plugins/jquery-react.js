(function ($, React, ReactDOM) {
  $.fn.extend({
    react: function (component, props, callback) {
      return ReactDOM.render(
        React.createElement(component, props),
        this.get(0)
      );
    }
  });
})(jQuery, React, ReactDOM);
