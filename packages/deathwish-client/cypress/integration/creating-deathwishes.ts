/// <reference path="../support/index.d.ts" />

describe('creating deathwishes', () => {
  describe('with invalid data', () => {
    it('shows error messages', () => {
      // Sign in
      cy.signInAsNewUser();
      cy.visit('/');

      // User chooses a template
      cy.findByTestId('choose-deathwish-video').click();

      // User incorrectly completes the form
      cy.findByTestId('title-input').clear();
      cy.findByTestId('description-input').clear();
      cy.findByTestId('cost-input')
        .find('input')
        .then(input => {
          input.val('');
        });
      cy.findByTestId('create-deathwish-form').submit();

      // User sees error messages
      cy.findByTestId('create-deathwish-form')
        .should('contain.text', 'Please tell us the name of the deathwish')
        .and('contain.text', "Please describe what you'd like to happen")
        .and(
          'contain.text',
          'Please tell us who will benefit from your deathwish'
        );
    });

    it('creates the deathwish when the user fixes the errors', () => {
      // Sign in
      cy.signInAsNewUser();
      cy.visit('/');

      // User chooses a template
      cy.findByTestId('choose-deathwish-video').click();

      // User incorrectly completes the form
      cy.findByTestId('title-input').clear();
      cy.findByTestId('description-input').clear();
      cy.findByTestId('cost-input')
        .find('input')
        .then(input => {
          input.val('');
        });
      cy.findByTestId('create-deathwish-form').submit();

      // User fixes the error messages
      cy.findByTestId('title-input')
        .clear()
        .type('A video montage');
      cy.findByTestId('description-input')
        .clear()
        .type('A documentary of my life');
      cy.findByTestId('cost-input')
        .find('input')
        .then(input => {
          input.val('');
        })
        .type('10000');
      cy.findByTestId('recipients-input').type(
        'lucky@example.com,another@example.com'
      );
      cy.findByTestId('create-deathwish-form').submit();

      // User sees a goal completion message
      cy.findByTestId('deathwish-list-page').should(
        'contain.text',
        'You successfully created a new deathwish!'
      );
    });
  });

  describe('with valid data', () => {
    it('allows users to create deathwishes from a template', () => {
      // Sign in
      cy.signInAsNewUser();
      cy.visit('/');

      // User chooses a template
      cy.findByTestId('choose-deathwish-money').click();

      // User completes the form
      cy.findByTestId('cost-input')
        .find('input')
        .then(input => {
          input.val('');
        })
        .type('10000');
      cy.findByTestId('recipients-input').type(
        'lucky@example.com,another@example.com'
      );
      cy.findByTestId('create-deathwish-form').submit();

      // User sees a goal completion message
      cy.findByTestId('deathwish-list-page').should(
        'contain.text',
        'You successfully created a new deathwish!'
      );
    });

    it('allows users to customise the deathwish details', () => {
      // Sign in
      cy.signInAsNewUser();
      cy.visit('/');

      // User chooses a template
      cy.findByTestId('choose-deathwish-holiday').click();

      // User completes the form
      cy.findByTestId('title-input')
        .clear()
        .type('A special holiday');
      cy.findByTestId('description-input')
        .clear()
        .type('A trip across the world to Tokyo');
      cy.findByTestId('cost-input')
        .find('input')
        .then(input => {
          input.val('');
        })
        .type('10000');
      cy.findByTestId('recipients-input').type(
        'lucky@example.com,another@example.com'
      );

      cy.findByTestId('create-deathwish-form').submit();

      // User sees the customised deathwish
      cy.findByTestId('deathwish-list-page').should(
        'contain.text',
        'A trip across the world to Tokyo'
      );
    });
  });
});
