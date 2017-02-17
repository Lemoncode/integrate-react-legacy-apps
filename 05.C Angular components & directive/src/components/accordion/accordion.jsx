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

