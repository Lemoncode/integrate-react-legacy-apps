**Integrating Reat with legacy  applications**

# The so feared migration

The time has arrived... After ten years developing on our beloved web technology (ASP.NET Web forms, PHP, ASP.NET MVC, Ruby...) someone from marketing department came with the following complaints about the web application:

* Some customers want to be able to work from the sofa on their mobile devices but they can't, they need to have computer around.
* Some customers cannot complete their orders.
* 30% of our customers have cheap mobile phones and our website is too heavy for them.
* When a customer is in the country-side he cannot work on our site because the connection is too slow for our application.

That translates to our "language" as:

* We have a poor web, not responsive and not adapted to mobile device interaction gestures.
* We have so much logic in spaghetti JavaScript that it's impossible to manage, same reason why our application throws unexpected errors.
* Our application is too dependant on server side tasks that could simply be done on the client side.
* Our application is too heavy and requires too much bandwidth consumption, mobile battery and resources.

The worst... this is happening with not so old technologies. Remember of Angular 1? Do you have performance issues?

Now it's time to choose. Probably your app is a massive juggernaut and you cannot just close the business for a couple years and completely migrate it.

Isn't there a way to migrate little by little?... **React to the rescue!**

# React

React is a light library for user interface rendering that has a [very good performance](),
also it allows building pages out of components. It will make it possible to replace some parts of a view and **work together with older libraries**. Let's see how:

### Approximations

One can use the following approximations for progressively migrate a legacy application with React.

* [Option 1 - Presentational React components with jQuery](#option-1)
* [Option 2 - Stateful React components with jQuery](#option-2)
* [Option 3 - Pub/Sub pattern through jQuery $.Callbacks](#option-3)
* [Option 4 - React inside Angular 1.x with MVC architecture](#option-4)


| All the examples below are public and available on this same repository [integrate-react-legacy-apps]()     |
| --------------------------------------------------------------------------------------------------------------------- |




### <a name="option-1">Option 1 - Presentational React components with jQuery</a>

Even though React and jQuery are two very different libraries used for solving different problems in different ways (jQuery is based on direct DOM manipulation while React aims to avoiding DOM manipulation as much as possible) they are both capable to coexist.

 A basic example would be having a module that requests server data right on initialization and pushes this data into a table rendered to the user.

![Image option 1.1](https://static1.squarespace.com/static/56cdb491a3360cdd18de5e16/t/58b6fda1bebafb0976fe11ea/1488387495490/?format=750w)

We can create a small function extending jQuery prototype and allowing, for a given selector, to load a React component over that same element.

```
$.fn.extend({
  react: function (Component, props, callback) {
    var mountedComponent = ReactDOM.render(
      <Component {...props} />,
      this.get(0)
    );

    if (typeof callback === 'function') {
      return callback(mountedComponent);
    }

    return mountedComponent;
  }
});
```

From now, calling the ```react``` function over a jQuery selected element, will [load](append?replace?) the passed in React component in the DOM node of the element.

For the current example we will mount the ```ContactsTableComponent``` React component with the following code:

```
var ContactsTableComponent = App.components.ContactsTableComponent;
var contacts, $mountedTableComponent;

// Initialize components
var createReactComponents = function () {
  $mountedContactsTableComponent = $('#tableComponent');
  showContacts(null); // First render with no data
};

// Fill table, then mount/update React component
var showContacts = function (contacts, callback) {
  $mountedContactsTableComponent.react(ContactsTableComponent, { contacts: contacts || [] }, callback);
};
```

This implementation uses the jQuery selectors as an entry for embedding React components. The model data is stored in the page and loaded to the React component through **properties**.

And the React component definition:

```
var ContactPropTypes = App.PropTypes.ContactPropTypes;
var ContactRowComponent = App.components.ContactRowComponent;

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

ContactsTableComponent.displayName = 'ContactsTableComponent';
ContactsTableComponent.propTypes = {
  contacts: React.PropTypes.arrayOf(ContactPropTypes)
};
```

This way, when responding to an AJAX request for the component data, it can get updated by calling the ```showContacts``` function with the response data:

```
var fetchContacts = function () {
  $.when(contactsService.fetchContacts())
    .then(function (fetchedContacts) {
    showContacts(fetchedContacts);
  });
};
```

![Image Option 1.2](https://static1.squarespace.com/static/56cdb491a3360cdd18de5e16/t/58b700859f74569e0581b942/1488388248574/?format=750w)


| This example source code is available at [02 Props and Render](https://github.com/Lemoncode/integrate-react-legacy-apps/tree/master/02%20Props%20and%20Render)     |
| :---------------------------------------------------------------------------------------------------------------------: |


### <a name="option-2">Option 2 - Stateful React components with jQuery</a>

### <a name="option-3">Option 3 - Pub/Sub pattern through jQuery $.Callbacks</a>

### <a name="option-4">Option 4 - React inside Angular 1.x with MVC architecture</a>





# Integrate React legacy apps
The goal of this project is provide a set of samples covering concepts to migrate from a legacy app to React.

## 00 Boilerplate

Initial setup for an ES5 web application using jQuery, namespacing and module pattern. This sample shows a simple table with mocked data.

## 01.A Basic Integration

This sample replaces the table from previous sample using `React.createElement` without transpilation.

## 01.B Move To JSX

This sample shows how to move the React component from previous sample to JSX syntax and configure Gulp to set up automatic transpilation.

## 02 Props and Render

This sample covers basic communication between jQuery and React using `React.render` to update the component properties. A form is created to add more records to the table.

## 03 Stateful Component

This sample changes the component from previous sample to use the state istead of properties. The goal of this samples is to show we can use methods from component directly.

## 04 Event Emitter

This sample shows how to use Publish/Subscribe pattern with `jQuery.Callbacks()` method to create a communcation layer between jQuery and React as event emitters.

## 05.A Angular controllerAS & directive

This sample shows a basic Angular form and uses a React component to display a piece of the Angular model. It uses [ngReact](https://github.com/ngReact/ngReact) to use a directive that wrapps the React component.

## 05.B Angular controllerAS & factory

This sampl is based on the previous sample to show how to use ngReact library to expose the React component using the ngReact *reactDirective* factory.

## 05.C Angular components & directive

This sample uses how to replace an accordion of a web component based Angular application with a React accordion. it also uses ngReact for libraries communication.
