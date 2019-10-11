import short from 'short-uuid';

describe('smoke test', () => {
  it('works', () => {
    cy.visit('/');
    cy.findByTestId('email-input').type(
      `tester-${short.generate()}@example.com`
    );
    cy.findByTestId('sign-in-form').submit();

    cy.findByTestId('app-pane').should('contain.text', 'DeathWish');
  });
});
