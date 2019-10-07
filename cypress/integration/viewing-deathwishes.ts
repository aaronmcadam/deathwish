describe('viewing deathwishes', () => {
  it('persists deathwishes', () => {
    // 1. User creates a deathwish
    cy.visit('/');
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

    // 2. User sees the deathwish in the list
    cy.findByTestId('deathwishes-pane').should(
      'contain.text',
      'A special holiday'
    );

    // 3. Browser is refreshed
    cy.reload();

    // 4. User should see the deathwish that was created before refreshing
    cy.findByTestId('deathwishes-pane').should(
      'contain.text',
      'A special holiday'
    );
  });
});
