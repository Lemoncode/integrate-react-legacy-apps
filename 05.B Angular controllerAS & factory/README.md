# Angular 1.X integration: controllerAs + reactDirective

## Description

This sample is one of the four _AngularJS integration_ samples that shows how to integrate React components in an existing AngularJS application.
This particular sample is an alternative to the previous sample that uses a simple form created handled by a controller using _controllerAs_ syntax and `reactDirective` factory.

## Boilerplate

We'll take as starting point sample [05.B Angular controllerAs & directive](../05.A\ Angular\ controllerAs\ &\ directive).

## Applying `reactDirective`

We've seen we can create React elements wrapped in a `<react-component>` directive. Now we'll use `reactDirective` factory to create as many directives as component definitions we have to use them directly instead of `<react-component>` tag.

Inside our `ShowEncoded.jsx` component we'll replace the export via `value` and create a directive `showEncoded` that accept the `reactDirective` factory as dependency and apply it to our component:

```diff
(function (angular, React) {
  'use strict';

+ // React definition
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

+ // AngularJS directive definition
+ var showEncoded = function (reactDirective) {
+   return reactDirective(ShowEncoded);
+ };

-  angular.module('app').value('ShowEncoded', ShowEncoded);
+  angular.module('app').directive('showEncoded', ['reactDirective', showEncoded]);
})(window.angular, window.React);
```

Finally let's change our implementation in `index.html`:

```diff
<div class="col-md-8">
- <react-component
-   name="ShowEncoded"
-   props="{encoded: ctrl.encodedText}"
-   watch-depth="reference" />
+ <show-encoded encoded="ctrl.encodedText" watch-depth="reference" />
</div>
```

We've implemented our first component using `controlerAs` syntax and `react-component` directive. In the next sample we'll see how to implement the same sample using component oriented and `react-component` directive.
