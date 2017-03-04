**Integrating Reat with legacy  applications**

# The so feared migration

The time has arrived... light After ten years developing on our beloved web technology (ASP.NET Web forms, PHP, ASP.NET MVC, Ruby...) someone from marketing department came with the following complaints about the web application:

* Some customers want to be able to work from the sofa on their mobile devices but they can't, they need to have computer around.
* Some customers cannot complete their orders.
* 30% of our customers have cheap mobile phones and our website is too heavy for them.
* When a customer is in the country-side he cannot work on our site because the connection is too slow for our application.

That translates to our "language" as:

* We have a poor web, not responsive and not adapted to mobile device interaction gestures.
* We have so much logic in spaghetti JavaScript that it's impossible to manage, same reason why our application throws unexpected errors.
* Our application is too dependant on server side taks that could simply be done on the client side.
* Our application is too heavy and requires too much bandwith consumption, mobile battery and resources.

The worst... this is happening with not so old technologies. Remember of Angular 1? Do you have performance issues?

Now it's time to choose. Probably your app is a massive juggernaut and you cannot just close the business for a couple years and completely migrate it.

Isn't there a way to migrate little by little?... **React to the rescue!**

# React

React is a light library to render user interface that has a [very good performance](),
also it allows us to build our pages out of components.

It allows us to replace some parts of a view and **work together with older libraries**. Let's see how:

### Approximations
All the examples below are public and available on the Lemoncode Github repository: [integrate-react-legacy-apps]()

* [Option 1 - Presentational React components with jQuery](#option-1)
* [Option 2 - Stateful React components with jQuery](#option-2)
* [Option 3 - Pub/Sub pattern through jQuery $.Callbacks](#option-3)
* [Option 4 - React inside Angular 1.x with MVC architecture](#option-4)

### <a name="option-1">Option 1 - Presentational React components with jQuery</a>


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
