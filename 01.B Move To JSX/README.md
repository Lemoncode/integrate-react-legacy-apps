# 01.5 Moving to JSX

Most of React projects are written using JSX syntax with ECMAScript2015 and transpiled using Webpack, Rollup, Browserify or some other bundler. In this sample we'll be configuring our project to use a task manager to automatize our transpilation process.

## Why JSX?

Using JSX syntax is not mandatory, however it has some advantages like better readabilty instead of using `React.createElement` method. JSX allows us to write components using fewer lines of code, and obtain a better visualization of them thanks to the HTML like syntax.

```jsx
var createRow = function (contact, index) {
  return (
    <tr key={index}>
      <td>{contact.name}</td>
      <td>{contact.phone}</td>
      <td>{contact.email}</td>
    </tr>
  );
};
```

## Set up workspace

## Installing dependencies

We just checked how easy is to write JSX syntax, however, JSX is not supported by browsers so, to use it we need a middle step, that is _transpilation_. We need an interpreter that transforms JSX to JavaScript like [babel](https://babeljs.io). Babel has an built-in CLI which can be used to compile files from the command line. However when we make some changes to our `.jsx` files we need to use `babel` to transform them to `.js`. To automatize this and speed our development workflow we'll install a task manager that will run `babel` and _transpile_ our `.jsx` files when we make some changes. Let's install [Gulp 4](http://gulpjs.com), open a command line prompt, locate yourself in the root folder of the project and execute:

```shell
npm install --save-dev gulpjs/gulp#4.0 gulp-babel babel-preset-react del
```

### Project structure

Now, we need to make a new folder that will contain the contents of our development code. Create a folder called `src` and move all of our assets there.

Then, we need to make a folder that will contain files that we use for production purposes. We'll call this folder `dist`. Your project folder should looks like this:

```
.
├── dist/
├── index.html
├── node_modules/
├── package.json
└── src/
    ├── css/
    │   └── styles.css
    └── js/
        ├── app/
        │   ├── App.js
        │   ├── components/
        │   │   ├── ContactPropTypes.js
        │   │   ├── ContactRowComponent.js
        │   │   └── ContactsTableComponent.js
        │   ├── modules/
        │   │   └── contactsModule.js
        │   └── services/
        │       └── contactsService.js
        └── index.js
```

### Gulp setup

To configure Gulp let's create a `gulpfile.js` on the root folder of the project with the next content:

```javascript
var path = require('path');
var gulp = require('gulp');
var babel = require('gulp-babel');
var del = require('del');

var BUILD_DIR = path.resolve(__dirname, 'src');
var DIST_DIR = path.resolve(__dirname, 'dist');

gulp.task('transpile', function () {
  return gulp
    .src(path.resolve(BUILD_DIR, '**', '*.jsx'))
    .pipe(babel({
      presets: ['react']
    }))
    .pipe(gulp.dest(DIST_DIR));
});

gulp.task('copy', function () {
  return gulp
    .src([
      path.resolve(BUILD_DIR, '**', '*.css'),
      path.resolve(BUILD_DIR, '**', '*.js')
    ])
    .pipe(gulp.dest(DIST_DIR))
});

gulp.task('clean', function () {
  return del(DIST_DIR);
});

gulp.task('build', gulp.series('clean', gulp.parallel('copy', 'transpile')));

gulp.task('watch', function () {
  gulp.watch(path.resolve(BUILD_DIR, '**', '*.css'), gulp.series('copy'));
  gulp.watch(path.resolve(BUILD_DIR, '**', '*.js'), gulp.series('copy'));
  gulp.watch(path.resolve(BUILD_DIR, '**', '*.jsx'), gulp.series('transpile'));
});

gulp.task('default', gulp.parallel('build', 'watch'));
```

We've basically created six tasks:
- `transpile` will transform all `.jsx` files into `.js` and move them to `dist` folder.
- `copy` will make a copy of our JavaScript and CSS files and place them into the `dist` folder.
- `clean` will erase all contents from our `dist` folder.
- `build` will call `clean`, `copy` and `transpile` to create a fresh build.
- `watch` will look out for changes made in our development files and move them to `dist` folder. If the file is `.jsx` then it _transpile_ it.
- `default` will run `build` first time and `watch` to observe changes.

Finally we'll add to our `package.json` a build task that call Gulp and start the development process:

```javascript
...
"scripts": {
  "build": "gulp build",
  "build:watch": "gulp"
},
"dependencies": {
  "bootstrap": "^3.3.7",
...
```

With these changes we only need to open a command line prompt and type `npm run build` to start our development process.

## JSX Implementation

- Let's begin changing our `ContactRowComponent` to use JSX syntax. Rename it to `ContactRowComponent.jsx` and replace all of `React.createElement` statements with JSX syntax:

  ```jsx
  ...
  var ContactRowComponent = function (props) {
    var contact = props.contact || {};
    return (
      <tr>
        <td>{contact.name}</td>
        <td>{contact.phone}</td>
        <td>{contact.email}</td>
      </tr>
    );
  };

  ContactRowComponent.displayName = 'ContactRowComponent';
  ContactRowComponent.propTypes = {
    contact: ContactPropTypes
  };
  ...
  ```

	This looks more familiar, right?

- Next we'll proceed to change our `ContactsTableComponent` to use JSX syntax. Like we've done with`ContactRowComponent` let's rename it to `ContactsTableComponent.jsx` and replace all of `React.createElement` statements with JSX syntax :

  ```jsx
  var ContactsTableComponent = function (props) {
    var contacts = props.contacts || [];
    return (
      <table className="table table-stripped table-bordered table-hover">
        <thead>
          <tr>
            <th>Name</th>
            <th>Phone number</th>
            <th>Email</th>
          </tr>
        </thead>
        <tbody>
          {contacts.map(function (contact, index) {
            return <ContactRowComponent key={index} contact={contact} />;
          })}
        </tbody>
      </table>
    );
  };
  ```

- Then we'll also rename our `contactsModule.js` to `contactsModule.jsx` and replace the ReactDOM.render arguments with:

  ```jsx
  // Pass contacts to TableComponent
  ReactDOM.render(
    <ContactsTableComponent contacts={fetchedContacts} />,
    $('#tableComponent').get(0)
  );
  ```

- With the new folder structure we need to make some changes in our `index.html` to use our `dist` folder instead of `assets`:

  ```html
    <!DOCTYPE html>
  <html lang="es">
    <head>
      <meta charset="UTF-8">
      <title>Boilerplate</title>
      <link rel="stylesheet" href="./node_modules/bootstrap/dist/css/bootstrap.min.css">
      <link rel="stylesheet" href="./dist/css/styles.css">
    </head>
    <body>
      <div class="container">
        <header class="header">
          <h2>Book Address</h1>
        </header>
        <main class="main">
          <h4>My contacts</h4>
          <div id="tableComponent"></div>
        </main>
      </div>

      <script src="./node_modules/jquery/dist/jquery.js"></script>
      <script src="./node_modules/react/dist/react.js"></script>
      <script src="./node_modules/react-dom/dist/react-dom.js"></script>

      <script src="./dist/js/app/App.js"></script>
      <script src="./dist/js/app/components/ContactPropTypes.js"></script>
      <script src="./dist/js/app/components/ContactRowComponent.js"></script>
      <script src="./dist/js/app/components/ContactsTableComponent.js"></script>
      <script src="./dist/js/app/services/contactsService.js"></script>
      <script src="./dist/js/app/modules/contactsModule.js"></script>
      <script src="./dist/js/index.js"></script>
    </body>
  </html>
  ```

- Finally let's make a build using Gulp, open a command line prompt, locate yourself in the root folder of the project and execute in a command prompt `npm run build` to get a copy of `src` files in `dist` folder without `.jsx` files. After running the build our `dist` folder should look like this:

  ```
  dist
  ├── css
  │   └── styles.css
  └── js
      ├── app
      │   ├── App.js
      │   ├── components
      │   │   ├── ContactPropTypes.js
      │   │   ├── ContactRowComponent.js
      │   │   └── ContactsTableComponent.js
      │   ├── modules
      │   │   └── contactsModule.js
      │   └── services
      │       └── contactsService.js
      └── index.js
  ```

To see the example working open `index.html` in a browser.

> If we were developing this component and making more changes we'll just run on the command line prompt `npm run build:watch` and Gulp will watch for changes and automatically transpile and copy the files to `dist` folder so you'll only have to refresh the browser to see changes.
