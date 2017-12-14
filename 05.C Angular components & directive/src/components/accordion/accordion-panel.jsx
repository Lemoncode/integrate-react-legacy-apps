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
    active: PropTypes.bool,
    onSelect: PropTypes.func,
    feed: PropTypes.shape({
      id: PropTypes.number.isRequired,
      heading: PropTypes.string,
      content: PropTypes.string
    })
  };

  angular
    .module('app')
    .value('AccordionPanel', AccordionPanel);
})(window.React, window.angular);
