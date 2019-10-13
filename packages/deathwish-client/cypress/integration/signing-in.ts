import short from 'short-uuid';

describe('signing in', () => {
  describe('with invalid data', () => {
    it('shows an error message', () => {
      // Attempt to sign in without filling in the email address
      cy.visit('/');
      cy.findByTestId('sign-in-form').submit();

      // User sees error messages
      cy.findByTestId('sign-in-form').should(
        'contain.text',
        'Please enter your email address'
      );
    });

    it('signs the user in when they fix the error', () => {
      // Attempt to sign in without filling in the email address
      cy.visit('/');
      cy.findByTestId('sign-in-form').submit();

      // User fixes the error
      cy.findByTestId('email-input').type(
        `tester-${short.generate()}@example.com`
      );
      cy.findByTestId('sign-in-form').submit();

      // User is signed in
      cy.findByTestId('app-pane').should('contain.text', 'Sign out');
    });
  });

  describe('with valid data', () => {
    it('signs the user in', () => {
      // Sign in
      cy.visit('/');
      cy.findByTestId('email-input').type(
        `tester-${short.generate()}@example.com`
      );
      cy.findByTestId('sign-in-form').submit();

      // User is signed in
      cy.findByTestId('app-pane').should('contain.text', 'Sign out');
    });
  });
});
