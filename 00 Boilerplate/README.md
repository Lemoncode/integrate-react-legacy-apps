# 00 Boilerplate

## Description

This sample shows a simple and basic implementation of an address book app created using jQuery and ECMAScript5. This little app rendes a simple table of contacts fetched from an API (mocked).
App is structured as follows:

```
.
├── assets/
│   ├── css/
│   │   └── styles.css
│   └── js/
│       ├── App.js		// Global namespace, container of our app
│       ├── Contacts.js	// Main módule with
│       ├── domUtils.js	// Helper functions for DOM manipulation
│       └── index.js	// Main file to bootstrap our app.
└─ index.html
```

## How it works?

 1. When DOM is loaded our `index.js` file loads the `run` method of our `Contacts` module.
 2. This method calls `fetchContacts` that calls our `contactsService` to get an array of contacts.
 3. When the call is completed then `showContacts` is called to use `domUtils` to create and render the table.

In next examples we will see how to integrate React and change some jQuery components into React components.
