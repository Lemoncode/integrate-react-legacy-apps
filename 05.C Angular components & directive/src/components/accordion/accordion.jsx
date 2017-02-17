(function (React, angular) {
  'use strict';


  var Accordion = function (AccordionPanel) {
    return React.createClass({
      displayName: 'Accordion',
      getInitialState: function () {
        return {
          selected: null
        };
      },
      render: function () {
        var feeds = this.props.feeds || ['a', 'b', 'c', 'd'];
        var selected = this.state.selected;
        var self = this;
        return (
          <div className="panel-group" role="tablist">
            <h1>{this.props.foo}</h1>
            {feeds.map(function (feed, index) {
              return (
                <AccordionPanel
                  active={selected === feed.id}
                  onSelect={self.select}
                  key={index}
                  feed-id={index}
                  feed={feed}
                />
              );
            })}
          </div>
        );
      },
      select: function (selected) {
        if (selected === this.state.selected) {
          selected = null;
        }
        this.setState({ selected });
      }
    });
  }

  angular
    .module('app')
    .factory('Accordion', ['AccordionPanel', Accordion]);
})(window.React, window.angular);
/*
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
      bindings: {
        feeds: '<'
      },
      templateUrl: './dist/components/accordion/accordion.html',
      controller: AccordionController
    });
})(window.angular);
*/
