describe('smoke test', () => {
  it('works', () => {
    cy.visit('/');

    cy.findByTestId('app-pane').should('contain.text', 'DeathWish');
  });
});
