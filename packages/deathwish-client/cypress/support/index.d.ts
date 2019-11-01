/// <reference types="cypress" />

// typically custom commands are added in this support folder
// so it makes sense to put their TypeScript definitions here
// from the JavaScript specs loads this file using
// the triple slash "reference" comment like this:
//
// /// <reference path="../support/index.d.ts" />

interface User {
  id: string;
  email: string;
  __typename?: 'User';
}

declare namespace Cypress {
  interface Chainable {
    /**
     * Signs in as a new user
     * @example cy.signInAsNewUser
     */
    signInAsNewUser(): Chainable;

    /**
     * Creates and a returns a user with possible overrides
     * @example cy.createUser
     */
    createUser(overrides?: User): Chainable;

    /**
     * Signs the user in by setting it in local storage,
     * bypassing the form for speed.
     * @example cy.createUser
     */
    signIn(user: User): Chainable;
  }
}
