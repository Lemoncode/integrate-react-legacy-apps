(function (React, angular) {
  'use strict';

  function AccordionPanel(props) {
    var select = function () {
      return props.onSelect(props.feed.id);
    };
    var className = 'panel-body collapsible';
    if (props.active) {
      className += ' in';
    }
    return (
      <div className="panel panel-default">
        <div className="panel-heading" style={{ cursor: 'pointer' }} onClick={select} role="panel">
          <h3 className="panel-title">{props.feed.heading}</h3>
        </div>
        <div className={className}>
          <p className="feed-content">{props.feed.content}</p>
        </div>
      </div>
    );
  }

  AccordionPanel.displayName = 'AccordionPanel';
  AccordionPanel.propTypes = {
    active: React.PropTypes.bool,
    onSelect: React.PropTypes.func,
    feed: React.PropTypes.shape({
      id: React.PropTypes.number.isRequired,
      heading: React.PropTypes.string,
      content: React.PropTypes.string
    })
  };

  angular
    .module('app')
    .value('AccordionPanel', AccordionPanel);
})(window.React, window.angular);
