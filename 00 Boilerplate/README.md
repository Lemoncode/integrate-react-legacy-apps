# 00 Boilerplate

## Description

This sample shows a simple and basic implementation of an address book app created using jQuery and ECMAScript5. This little app uses a form to ask for some data and then load in a table.
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

When DOM is loaded our `index.js` file loads the `run` method of our `Contacts` module. This method is responsible of setting event handlers for our application. When user fills data and submit the form an `onSubmit` event is triggered leading to:

- Collect contact data from form.
- Adapt contact data to desired object with _name_, _phone_ and _email_ properties.
- Insert this new contact into our contact list.
- Render the table to show the new contact.

In next examples we will see how to integrate React and change some jQuery components into React components.
