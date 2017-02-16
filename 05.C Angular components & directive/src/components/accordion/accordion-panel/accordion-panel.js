(function (angular) {
  'use strict';

  function AccordionPane() {
    var self = this;

    self.$onInit = function () {
      self.parent.addPanel(self);
    };

    self.select = function () {
      self.parent.select(self);
    };

    self.show = function () {
      self.selected = 'in';
    };

    self.hide = function () {
      self.selected = '';
    };
  }

  angular
    .module('app')
    .component('accordionPane', {
      bindings: {
        heading: '@'
      },
      require: {
        parent: '^accordion'
      },
      transclude: true,
      templateUrl: './dist/components/accordion/accordion-panel/accordion-panel.html',
      controller: AccordionPane
    });
})(window.angular);
