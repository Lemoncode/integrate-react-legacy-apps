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

05.B Angular controllerAS & factory

This sampl is based on the previous sample to show how to use ngReact library to expose the React component using the ngReact *reactDirective* factory.

05.C Angular components & directive

This sample uses how to replace an accordion of a web component based Angular application with a React accordion. it also uses ngReact for libraries communication.
