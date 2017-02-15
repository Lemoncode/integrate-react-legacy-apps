(function (angular) {
  'use strict';

  function Main() {
    var self = this;
    self.text = '';
    self.encodedText = '';
    self.encode = function (event) {
      event.preventDefault();
      self.encodedText = btoa(self.text);
      self.text = '';
    };
  }
  angular.module('app').controller('Main', [Main]);
})(window.angular);
