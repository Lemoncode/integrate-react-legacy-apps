(function (angular) {
  'use strict';

  function AccordionPane() {
    var self = this;
    var selected = false;

    self.$onInit = function () {
      self.parent.addPanel(self);
    };

    self.select = function () {
      self.parent.select(self);
    };

    self.show = function () {
      if (selected) {
        self.hide();
      } else {
        selected = true;
        self.active = 'in';
      }
    };

    self.hide = function () {
      selected = false;
      self.active = '';
    };
  }

  angular
    .module('app')
    .component('accordionPanel', {
      bindings: {
        feed: '<'
      },
      require: {
        parent: '^accordion'
      },
      templateUrl: './dist/components/accordion/accordion-panel/accordion-panel.html',
      controller: AccordionPane
    });
})(window.angular);
