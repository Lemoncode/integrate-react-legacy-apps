# Angular 1.X integration: controllerAs + reactDirective

## Description

This sample is one of the four _AngularJS integration_ samples that shows how to integrate React components in an existing AngularJS application.
This particular sample uses a component base application that shows an accordion panel using `angular.component` and gets remplaced by a React accordion.

## Boilerplate

We'll take as starting point sample [05.B Angular controllerAs & factory](../05.B\ Angular\ controllerAs\ &\ factory).

## Including web server

We'll make few changes in `gulpfile.js` to include a web server because AngularJS `templateUrl` uses XMLHttpRequests to include templating and `file://` protocol is not included.

- First install `gulp-connect` through `npm`. This will allow us to raise a lite web server up:

  ```shell
  npm install --save-dev gulp-connect
  ```

- Next let's add a Gulp task to configure the server:

  ```diff
    var path = require('path');
    var gulp = require('gulp');
    var babel = require('gulp-babel');
    var del = require('del');
  + var connect = require('gulp-connect');

    var BUILD_DIR = path.resolve(__dirname, 'src');
    var DIST_DIR = path.resolve(__dirname, 'dist');

  + gulp.task('connect', function (done) {
  +  connect.server({
  +    root: __dirname
  +  });
  +  done();
  + });

    gulp.task('transpile', function () {

    ...

    gulp.task('copy', function () {
      return gulp
        .src([
          path.resolve(BUILD_DIR, '**', '*.css'),
  +       path.resolve(BUILD_DIR, '**', '*.html'),
          path.resolve(BUILD_DIR, '**', '*.js')
        ])
        .pipe(gulp.dest(DIST_DIR))
    });

    ...

    gulp.task('watch', function (done) {
      gulp.watch(path.resolve(BUILD_DIR, '**', '*.css'), gulp.series('copy'));
      gulp.watch(path.resolve(BUILD_DIR, '**', '*.js'), gulp.series('copy'));
  +   gulp.watch(path.resolve(BUILD_DIR, '**', '*.html'), gulp.series('copy'));
      gulp.watch(path.resolve(BUILD_DIR, '**', '*.jsx'), gulp.series('transpile'));
      done();
    });

  ...

  - gulp.task('default', gulp.parallel('build', 'watch'));
  + gulp.task('default', gulp.parallel(gulp.series('build', 'connect'), 'watch'));
  ```

- Finally let's include a start script that boot the server in `package.json`:

  ```diff
    "license": "MIT",
      "scripts": {
  -     "build": "gulp build",
  -     "build:watch": "gulp"
  +     "start": "gulp",
  +     "build": "gulp build"
      },
      "dependencies": {
  ```

## Preparing the Angular accordion

We'll remove `controllers` folder along with `ShowEncoded.jsx` file and create an `page-content`, `accordion` and `accordion-panel` with their templates in `components`. Our `src` folder structure should look like this:

```
src
├── app.module.js
├── components
│   ├── accordion
│   │   ├── accordion.html
│   │   ├── accordion.js
│   │   └── accordion-panel
│   │       ├── accordion-panel.html
│   │       └── accordion-panel.js
│   ├── page-content
│   │   ├── page-content.html
│   │   └── page-content.js
│   └── ShowEncoded.jsx
└── css
    └── styles.css
```

The `page-content` component will be used as a container and layout former that will have a list of items to feed the accordion.

```html
<!-- components/page-content/page-content.html -->
<header>
  <h1 class="text-center">Component based App</h1>
</header>
<main class="container">
  <div class="col-sm-9">
    <accordion feeds="$ctrl.feeds" />
  </div>
</main>
```
```javascript
// components/page-content/page-content.js
(function (angular) {
  'use strict';

  function PageContent() {
    var self = this;

    self.feeds = [
      {
        id: 32,
        heading: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Vitae, odio!',
        content: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Obcaecati vel, officia saepe cumque culpa alias quisquam rem repudiandae omnis dolorum doloremque, dicta pariatur unde iusto ex, eos neque laboriosam voluptatum.'
      },
      {
        id: 33,
        heading: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ratione, ad!',
        content: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quisquam eum et ea harum laborum temporibus ab voluptates sunt, maxime dolore quas consequuntur vitae quos expedita nostrum quidem, minus, rem sit.'
      },
      {
        id: 34,
        heading: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Adipisci, atque.',
        content: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Eveniet, tempore aut consequuntur autem, repellat iste doloremque quibusdam sunt quos! At minus dicta debitis doloremque dolorem unde, maxime facilis voluptatum quam!'
      },
      {
        id: 35,
        heading: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ex, asperiores!',
        content: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Fugiat, omnis dolores tempora officia consequuntur ratione sequi aliquid porro aut quisquam quas obcaecati facere assumenda minima odit reiciendis laboriosam natus! Eum!'
      },
    ];
  }

  angular
    .module('app')
    .component('pageContent', {
      controller: PageContent,
      templateUrl: './dist/components/page-content/page-content.html'
    });
})(angular);
```

`PageContent` component will be implemented directly inside `<body>` in `index.html`:

```html
...
<body>
  <page-content/>
  <script src="./node_modules/angular/angular.js"></script>
...
```

The `accordion` component will be a simple wrapper that accepts a `feeds` array and render as many panes as items in `feeds`:

```html
<!-- components/accordion/accordion.html -->
<div class="panel-group" role="tablist">
  <accordion-panel ng-repeat="feed in $ctrl.feeds track by $index" feed="feed" />
</div>
```

```javascript
// components/accordion/accordion.js
(function (angular) {
  'use strict';

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
```

The `accordion-panel` will show the heading and content of the feed. It will receive the `feed` object and render the panel.

```html
<!-- components/accordion/accordion-panel.html -->
<div class="panel panel-default">
  <div class="panel-heading" style="cursor: pointer" ng-click="$ctrl.select()" role="panel">
    <h3 class="panel-title">{{$ctrl.feed.heading}}</h3>
  </div>
  <div class="panel-body collapsible" ng-class="$ctrl.active">
    <p class="feed-content">{{$ctrl.feed.content}}</p>
  </div>
</div>
```

```javascript
// components/accordion-panel/accordion-panel.js
(function (angular) {
  'use strict';

  function AccordionPanel() {
    var self = this;
    var selected = false;

    self.$onInit = function () {
      self.parent.addPanel(self);
    };

    self.select = function () {
      self.parent.select(self);
    };

    self.show = function () {
      if (selected) {
        self.hide();
      } else {
        selected = true;
        self.active = 'in';
      }
    };

    self.hide = function () {
      selected = false;
      self.active = '';
    };
  }

  angular
    .module('app')
    .component('accordionPanel', {
      bindings: {
        feed: '<'
      },
      require: {
        parent: '^accordion'
      },
      templateUrl: './dist/components/accordion/accordion-panel/accordion-panel.html',
      controller: AccordionPanel
    });
})(window.angular);
```

Finally let's add some styles in `styles.css` file to animate the accordion:

```diff
  .container, .container-fluid {
    margin-top: 50px;
    overflow: hidden;
  }

+ .panel-body.collapsible {
+   transition: all .30s ease-out;
+   max-height: 0;
+   overflow: hidden;
+   padding-top: 0;
+   padding-bottom: 0;
+ }
+
+ .panel-body.collapsible.in {
+   max-height: 100px;
+   transition: all .30s ease-out;
+   padding-top: 15px;
+   padding-bottom: 15px;
+ }
+
+ .pointer {
+   cursor: pointer;
+ }
+
+ .feed-content{
+   margin: 0;
+ }
```

Let's add their script references in `index.html`:

```html
...
<page-content/>
<script src="./node_modules/angular/angular.js"></script>
<script src="./node_modules/react/dist/react.js"></script>
<script src="./node_modules/react-dom/dist/react-dom.js"></script>
<script src="./node_modules/ngreact/ngReact.js"></script>
<script src="./dist/app.module.js"></script>
<script src="./dist/components/accordion/accordion.js"></script>
<script src="./dist/components/accordion/accordion-panel/accordion-panel.js"></script>
<script src="./dist/components/page-content/page-content.js"></script>
...
```

If we open a command line prompt, locate to the root directory of the project and execute `npm start` we'll see at [localhost:8080](http://localhost:8080) the next result:

![01boilerplate.gif](../99_readme_resources/01boilerplate.gif)

## Replacing the Accordion UI Component

### Replacing the `AccordionPanel`

Let's replace the accordion with a React one. First we'll replace the lowest component, the `AccordionPanel`, rename it to `accordion-panel.jsx` and change its implementation:

```diff
+ (function (React, angular) {
- (function (angular) {
    'use strict';

+   function AccordionPanel(props) {
+     var select = function () {
+       return props.onSelect(props.feed.id);
+     };
+     var className = 'panel - body collapsible';
+     if (props.active) {
+       className += ' in';
+     }
+     return (
+       <div className="panel panel-default">
+         <div className="panel-heading pointer" onClick={select} r  ole="panel">
+           <h3 className="panel-title">{props.feed.heading}</h3>
+         </div>
+         <div className={className}>
+           <p>{props.feed.content}</p>
+         </div>
+       </div>
+     );
+   }
+
+   AccordionPanel.displayName = 'AccordionPanel';
+   AccordionPanel.propTypes = {
+     active: React.PropTypes.bool,
+     onSelect: React.PropTypes.func,
+     feed: React.PropTypes.shape({
+       id: React.PropTypes.number.isRequired,
+       heading: React.PropTypes.string,
+       content: React.PropTypes.string
+     })
+   };
-    function AccordionPanel() {
-      var self = this;
-      var selected = false;
-      self.$onInit = function () {
-        self.parent.addPanel(self);
-      };
-      self.select = function () {
-        self.parent.select(self);
-      };
-      self.show = function () {
-        if (selected) {
-          self.hide();
-        } else {
-          selected = true;
-          self.active = 'in';
-        }
-      };
-      self.hide = function () {
-        selected = false;
-        self.active = '';
-      };
-    }

     angular
       .module('app')
+      .value('AccordionPanel', AccordionPanel);
-      .component('accordionPanel', {
-        bindings: {
-          feed: '<'
-        },
-        require: {
-          parent: '^accordion'
-        },
-        templateUrl: ./dist/components/accordion/accordion-panel/accordion-pane.html',
-        controller: AccordionPanel
-      });
+  })(window.React, window.angular);
-  })(window.angular);
```
This _dumb_ component will basically expect some properties to work:

- `active` property, if `true` `AccordionPanel` will apply class `in` to show the content.
- `onSelect` property, a callback to notify `Accordion` that one was selected by the feed `id` (_dumb_ components should only handle render logic instead of state logic).
- `feed` property, the feed that will be shown with the heading and content.

We register the component inside the `app` module so as not to make it global or store it in another namespace.

### Replacing the `Accordion`

Now it's time to replace the `Accordion` component by an _container_ component that stores some logic and gets the feeds by an angular component. Start by renaming it to `accordion.jsx` and then change its implementation:

```diff
+ (function (React, angular) {
- (function (angular) {
    'use strict';

+   var app = angular.module('app');

+   var Accordion = function (AccordionPanel) {
+     return React.createClass({
+       displayName: 'Accordion',
+       getInitialState: function () {
+         return {
+           selected: null
+         };
+       },
+       render: function () {
+         var feeds = this.props.feeds || ['a', 'b', 'c', 'd'];
+         var selected = this.state.selected;
+         var self = this;
+         return (
+           <div className="panel-group" role="tablist">
+             <h1>{this.props.foo}</h1>
+             {feeds.map(function (feed, index) {
+               return (
+                 <AccordionPanel
+                   active={selected === feed.id}
+                   onSelect={self.select}
+                   key={index}
+                   feed-id={index}
+                   feed={feed}
+                 />
+               );
+             })}
+           </div>
+         );
+       },
+       select: function (selected) {
+         if (selected === this.state.selected) {
+           selected = null;
+         }
+         this.setState({ selected });
+       }
+     });
+   }
-   function AccordionController() {
-     var self = this;
-     var panels = [];
-
-     self.addPanel = function (panel) {
-       panels.push(panel);
-       if (panels.length) {
-         panels[0].show();
-       }
-     };
-
-     self.select = function (selectedPanel) {
-       panels.forEach(function (panel) {
-         if (panel === selectedPanel) {
-           panel.show();
-         } else {
-           panel.hide();
-         }
-       });
-     };
-   }
-
    angular
      .module('app')
+     .factory('Accordion', ['AccordionPanel', Accordion]);
-     .component('accordion', {
-       bindings: {
-         feeds: '<'
-       },
-       templateUrl: './dist/components/accordion/accordion.html',
-       controller: AccordionController
-     });
- })(window.angular);
+ })(window.React, window.angular);
```
As the AngularJS `Accordion` component it will receive a list of `feeds` and pass each feed to a child. This `Accordion` component will handle the activation of each `AccordionPanel` and store the selected one given the feed `id`.

> Note: Since we stored `AccordionPanel` inside AngularJS's environment to use it we need to create a `angular.factory` that returns the React component and receives the definition of `AccordionPanel` to use. Also, the `AccordionPanel` definition must be PascalCase to be used dynamically and not to be interpreted as a DOM element such as `'div'`, `'span'`, etc, when generating `React.createElement` through transpilation.

Finally we'll make a change in `page-content.html` to call the new React `Accordion` component:

```diff
  <header>
    <h1 class="text-center">Component based App</h1>
  </header>
  <main class="container">
    <div class="col-sm-9">
-     <accordion feeds="$ctrl.feeds" />
+     <react-component name="Accordion" props="{feeds: $ctrl.feeds}"   />
    </div>
  </main>
```

> Note: Since we're using a factory as a component instead of a AngularJS directive it's not possible use `reactDirective` factory to implement `Accordion` _tag like_.

Now accordion component has been migrated to React components (we still have them inside AngularJS though) there are some files we are not using. Let's remove `accordion-panel.html` and `accordion.html` and place `accordion-panel.jsx` inside `accordion` folder:

```
src
├── app.module.js
├── components
│   ├── accordion
│   │   ├── accordion.jsx
│   │   └── accordion-panel.jsx
│   └── page-content
│       ├── page-content.html
│       └── page-content.js
├── css
│   └── styles.css
└── service.js
```

Next let's change its references inside `index.html`:

```diff
      ...
      <script src="./dist/components/accordion/accordion.js"></script>
-     <script src="./dist/components/accordion/accordion-panel/accordion-panel.js"></script>
+     <script src="./dist/components/accordion/accordion-panel.js"></script>
      <script src="./dist/components/page-content/page-content.js"></script>
    </body>
  </html>
```

Finally open a command prompt, locate yourself on the root folder of the project and execute `npm start`. You can see the result in [localhost:8080](http://localhost:8080).
