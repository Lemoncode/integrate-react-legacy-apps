(function (angular, React) {
  'use strict';

  // React component definition
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

  // AngularJS directive definition
  var showEncoded = function (reactDirective) {
    return reactDirective(ShowEncoded);
  };

  angular.module('app').directive('showEncoded', ['reactDirective', showEncoded]);
})(window.angular, window.React);
