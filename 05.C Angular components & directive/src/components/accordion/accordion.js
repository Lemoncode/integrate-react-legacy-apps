(function (angular) {
  function AccordionController() {
    var self = this;
    var panels = [];

    self.addPanel = function (panel) {
      panels.push(panel);
      if (panels.length) {
        panels[0].show();
      }
    };

    self.select = function (selectedPanel) {
      panels.forEach(function (panel) {
        if (panel === selectedPanel) {
          panel.show();
        } else {
          panel.hide();
        }
      });
    };
  }

  angular
    .module('app')
    .component('accordion', {
      transclude: true,
      templateUrl: './dist/components/accordion/accordion.html',
      controller: AccordionController
    });
})(window.angular);
