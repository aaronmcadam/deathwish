/// <reference path="../support/index.d.ts" />

describe('deleting deathwishes', () => {
  it.only('deletes a deathwish', () => {
    // Sign in
    cy.signInAsNewUser();
    cy.visit('/');

    // User creates a deathwish
    cy.findByTestId('choose-deathwish-holiday').click();
    cy.findByTestId('title-input')
      .clear()
      .type('A special holiday');
    cy.findByTestId('cost-input')
      .find('input')
      .then(input => {
        input.val('');
      });
    cy.findByTestId('recipients-input').type(
      'lucky@example.com,another@example.com'
    );
    cy.findByTestId('create-deathwish-form').submit();

    // User clicks the delete button on the deathwish card
    cy.findByTestId('delete-deathwish-button').click();

    // User confirms they want to delete the deathwish
    cy.findByTestId('confirm-delete-button').click();

    // User sees that the deathwish is deleted
    cy.findByTestId('deathwish-list-page').should(
      'not.contain.text',
      'A special holiday'
    );
  });

  it('allows the user to change their mind', () => {
    // Sign in
    cy.signInAsNewUser();
    cy.visit('/');

    // User creates a deathwish
    cy.findByTestId('choose-deathwish-holiday').click();
    cy.findByTestId('title-input')
      .clear()
      .type('A special holiday');
    cy.findByTestId('cost-input')
      .find('input')
      .then(input => {
        input.val('');
      });
    cy.findByTestId('recipients-input').type(
      'lucky@example.com,another@example.com'
    );
    cy.findByTestId('create-deathwish-form').submit();

    // User clicks the delete button on the deathwish card
    cy.findByTestId('delete-deathwish-button').click();

    // User decides they don't want to delete the deathwish
    cy.findByTestId('cancel-delete-button').click();

    // User sees that the deathwish is not deleted
    cy.findByTestId('deathwish-list-page').should(
      'contain.text',
      'A special holiday'
    );
  });
});
