(function (angular, React) {
  'use strict';

  var ShowEncoded = function (props) {
    return (
      <div>
        <h4>
          <strong>Encoded text</strong>
        </h4>
        <pre>{props.encoded || 'Nothing written'}</pre>
      </div>
    );
  };

  ShowEncoded.propTypes = {
    encoded: React.PropTypes.string.isRequired
  };

  angular.module('app').value('ShowEncoded', ShowEncoded);
})(window.angular, window.React);
