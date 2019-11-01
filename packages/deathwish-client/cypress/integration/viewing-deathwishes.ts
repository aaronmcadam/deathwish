describe('viewing deathwishes', () => {
  it('deathwishes are persisted', () => {
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
      })
      .type('10000');
    cy.findByTestId('recipients-input').type(
      'lucky@example.com,another@example.com'
    );
    cy.findByTestId('create-deathwish-form').submit();

    // User sees the deathwish in the list
    cy.findByTestId('deathwish-list-page').should(
      'contain.text',
      'A special holiday'
    );

    // Browser is refreshed
    cy.reload();

    // User should see the deathwish that was created before refreshing
    cy.findByTestId('deathwish-list-page').should(
      'contain.text',
      'A special holiday'
    );
  });
});
