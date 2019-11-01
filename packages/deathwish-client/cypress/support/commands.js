// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add("login", (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add("drag", { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add("dismiss", { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This is will overwrite an existing command --
// Cypress.Commands.overwrite("visit", (originalFn, url, options) => { ... })
import '@testing-library/cypress/add-commands';
import short from 'short-uuid';

Cypress.Commands.add('createUser', overrides => {
  const id = short.generate();
  const user = {
    id,
    email: `tester-${id}@example.com`,
    ...overrides,
    __typename: 'User'
  };

  return user;
});

Cypress.Commands.add('signIn', user => {
  const serialized = JSON.stringify(user);

  window.localStorage.setItem('__deathwish-user__', serialized);

  return user;
});

Cypress.Commands.add('signInAsNewUser', () => {
  cy.createUser().then(user => {
    cy.signIn(user);
  });
});
