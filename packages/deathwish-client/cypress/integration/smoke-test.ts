import short from 'short-uuid';

describe('smoke test', () => {
  it('works', () => {
    // Sign in
    cy.signInAsNewUser();
    cy.visit('/');

    cy.findByTestId('app-pane').should('contain.text', 'DeathWish');
  });
});
