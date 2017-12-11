(function (React, angular) {
  'use strict';

  var Accordion = function (AccordionPanel) {

    return class Accordion extends React.Component {

      constructor(props) {
        super(props);
        this.state = { selected: null };
        this.select = this.select.bind(this);
      }

      select(selected) {
        if (selected === this.state.selected) {
          selected = null;
        }
        this.setState({ selected });
      }

      render() {
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
      }
    }
  }

  angular
    .module('app')
    .factory('Accordion', ['AccordionPanel', Accordion]);
})(window.React, window.angular);

